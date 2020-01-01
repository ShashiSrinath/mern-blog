const _ = require('lodash');
const {redis} = require('../util/redis');

const Post = require('./PostSchema');
const Category = require('../category/CategorySchema');
const Tag = require('../tag/TagSchema');
const View = require('../view/ViewSchema');
const {setCache} = require("../../middleware/cache");


/*  @POST /api/v1/posts/create
 *  ACCESS : Admin, Moderator, User
 *  Create a post */
const createPost = async (req, res) => {
    //Todo: add validation
    const post = req.body;

    //set author
    post.author = req.userId;

    // selecting category
    let category;
    try {
        category = await Category.findOne({name: post.category});
        if (!category) category = await Category.create({name: post.category});
    } catch (e) {
        //todo: check the correct error code
    }


    // selecting tags
    let tags = [];
    if (post.tags) {
        for (let i = 0; i < post.tags.length; i++) {
            let tag = post.tags[i];
            try {
                const selectedTag = await Tag.findOne({name: tag});
                if (selectedTag) tags.push(selectedTag._id);
                else {
                    const createdTag = await Tag.create({name: tag});
                    tags.push(createdTag._id);
                }
            } catch (err) {
                //todo: handle errors
                console.log(err)
            }
        }
    }
    post.category = category._id;
    post.tags = tags;

    try {
        const savedPost = await Post.create(req.body);
        return res.json(savedPost);
    } catch (err) {
        res.status(400).json(err);
    }

};


/*  @GET /api/v1/posts/get-all
 *  ACCESS : Public
 *  get all posts */
const getAll = async (req, res) => {
    let posts = await Post.find()
        .populate('category', 'name')
        .populate('tags')
        .populate('author', 'firstName');

    posts = posts.map(post => {
        post._doc.views = post.views.length;
        return post;
    });

    setCache(`posts-getAll`, posts);
    return res.json(posts);
};

/*  @GET /api/{version}/posts/get-by-id/:id
 *  ACCESS : Public
 *  get the post by id */
const getById = async (req, res) => {

    try {
        const cache = await redis.get(`posts-getById-${req.params.id}`);
        if (cache) res.send(JSON.parse(cache));

        const post = await Post.findById(req.params.id)
            .populate('category', 'name')
            .populate('tags')
            .populate('author', 'firstName');

        //add a view to the post
        const view = await View.create({post: post._id});
        post.views.push(view._id);
        post.save();

        if (!cache) {
            setCache(`posts-getById-${req.params.id}`, post);
            return res.json(post);
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

/*  @GET /api/v1/posts/get-by-slug/:slug
 *  ACCESS : Public
 *  get the post by slug */
const getBySlug = async (req, res) => {
    try {
        const post = await Post.findOne({slug: req.params.slug})
            .populate('category', 'name')
            .populate('tags')
            .populate('author', 'firstName');

        //add a view to the post
        const view = await View.create({post: post._id});
        post.views.push(view._id);
        post.save();

        setCache(`getBySlug-${req.params.slug}`, post);
        return res.json(post);
    } catch (error) {
        res.status(400).json(error);
    }
};

/*  @GET /api/v1/posts/get-recent/:page
 *  ACCESS : Public
 *  get 12 recent posts according to the page number */
const getRecent = async (req, res) => {
    const pageNO = parseInt(req.params.page);

    let posts = await Post.find()
        .sort('-addedDate')
        .select('-content')
        .populate('category', 'name')
        .populate('tags')
        .populate('author', 'firstName')
        .skip(pageNO * 12)
        .limit(12);

    posts = posts.map(post => {
        post._doc.views = post.views.length;
        return post;
    });

    const count = await Post.find().countDocuments();

    setCache(`getRecent-${req.params.page}`, {posts, count});
    res.json({posts, count});
};

/*  @GET /api/v1/posts/get-trending
 *  ACCESS : Public
 *  get 12 trending posts */
const getTrending = async (req, res) => {
    const date = new Date();
    const lastDate = new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000));
    const viewsArray = await View.find({date: {'$gte': lastDate, '$lt': date}});

    const sortedArray = _(viewsArray)
        .countBy('post')
        .map((count, post) => ({count, post}))
        .orderBy('count', 'desc')
        .splice(0, 12)
        .value();

    const postIds = sortedArray.map(ele => ele.post);
    const posts = [];

    for (let i = 0; i < postIds.length; i++) {
        const id = postIds[i];

        const post = await Post.findById(id).select('-content')
            .populate('category', 'name')
            .populate('tags')
            .populate('author', 'firstName');

        post._doc.views = post.views.length;
        posts.push(post);
    }

    setCache(`getTrending`, posts, 1800);
    res.json(posts);
};

/*  @GET /api/v1/posts/get-by-category/:category/:page
 *  ACCESS : Public
*  get 12 recent posts belongs to category according to the page number */
const getByCategory = async (req, res) => {
    const category = await Category.find({name: req.params.category});
    const pageNO = parseInt(req.params.page);
    try {
        let posts = await Post
            .find({category: category})
            .sort('-addedDate')
            .select('-content')
            .populate('category', 'name')
            .populate('tags')
            .populate('author', 'firstName')
            .skip(pageNO * 12)
            .limit(12);


        posts = posts.map(post => {
            post._doc.views = post.views.length;
            return post;
        });


        if (posts.length === 0) return res.status(404).json({'error': 'category not found'});

        const count = await Post.find({category: category}).countDocuments();

        setCache(`posts-getByCategory-${req.params.category}-${req.params.page}`, {posts, count});
        res.json({posts, count});
    } catch (e) {
        console.log(e);
        res.status(404).json({'error': 'category not found'})
    }
};

/*  @GET /api/v1/posts/get-by-tag/:tag/:page
 *  ACCESS : Public
*  get 12 recent posts belongs to tag according to the page number */
const getByTag = async (req, res) => {
    const tagName = req.params.tag;
    const pageNO = parseInt(req.params.page);

    try {
        const tagId = await Tag.find({name: tagName});
        let posts = await Post
            .find({
                tags: {
                    $in: tagId
                }
            })
            .sort('-addedDate')
            .select('-content')
            .populate('tags')
            .populate('category', 'name')
            .populate('author', 'firstName')
            .skip(pageNO * 12)
            .limit(12);

        posts = posts.map(post => {
            post._doc.views = post.views.length;
            return post;
        });

        if (posts.length === 0) return res.status(404).json({'error': 'tag not found'});

        const count = await Post.find({
            tags: {
                $in: tagId
            }
        }).countDocuments();

        setCache(`posts-getByTag-${req.params.tag}-${req.params.page}`, {posts, count});
        res.json({posts, count});
    } catch (e) {
        console.log(e);
        res.status(404).json({'error': 'tag not found', e});
    }
};

/*  @PUT /api/v1/posts/update
 *  ACCESS : Admin , Moderator , User
 *  Update post */
const updatePost = async (req, res) => {
    // todo: add validations
    const post = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(post.id, post);
        return res.json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

};

/*  @DELETE /api/v1/posts/delete/:id
 *  ACCESS : Admin , Moderator , User
 *  Delete post */
const deletePost = async (req, res) => {
    // todo : add validations

    try {
        const deletedPost = await Post.findByIdAndDelete(req.paramas.id);
        return res.json(deletedPost);
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = {
    getAll, createPost, getById, getBySlug, getRecent, getTrending, getByCategory, getByTag, updatePost, deletePost
};