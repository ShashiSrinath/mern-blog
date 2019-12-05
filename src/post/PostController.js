const Post = require('./PostSchema');
const Category = require('../category/CategorySchema');
const Tag = require('../tag/TagSchema');

/*  @POST /api/v1/posts/create
 *  ACCESS : Admin, Moderator, User
 *  Create a post */
const createPost = async (req, res) => {
    //Todo: add validation
    const post = req.body;

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
                //todo: hadnle errors
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
    const posts = await Post.find();
    return res.json(posts);
};

/*  @GET /api/{version}/posts/get-by-id/{id}
 *  ACCESS : Public
 *  get the post by id */
const getById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.json(post);
    } catch (error) {
        res.status(400).json(error);
    }
};

/*  @GET /api/{version}/posts/get-by-slug/{slug}
 *  ACCESS : Public
 *  get the post by slug */
const getBySlug = async (req, res) => {
    try {
        const post = await Post.findOne({slug: req.params.slug});
        return res.json(post);
    } catch (error) {
        res.status(400).json(error);
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


/*  @DELETE /api/v1/posts/delete/{id}
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
    getAll, createPost, getById, getBySlug, updatePost, deletePost
};