const Post = require('./PostSchema');
const Category = require('../category/CategorySchema');
const Tag = require('../tag/TagSchema');

/*  @POST /api/${version}/posts/create
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


/*  @GET /api/${version}/posts/getAll
 *  ACCESS : Public
 *  get all posts */
const getAll = async (req, res) => {
    const posts = await Post.find();
    return res.json(posts);
};

module.exports = {
    getAll, createPost
};