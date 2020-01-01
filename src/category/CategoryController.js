const Category = require('./CategorySchema');
const {setCache} = require("../../middleware/cache");

/*  @GET /api/v1/categories/get-all/:page
 *  ACCESS : public
 *  get categories 10 by 10 according to the page number */
const getAll = async (req, res) => {

    const pageNO = parseInt(req.params.page);

    const categories = await Category.find()
        .skip(pageNO * 12)
        .limit(12);

    const count = await Category.find().countDocuments();

    setCache(`categories-getAll`, {categories, count});
    res.json({categories, count});
};


module.exports = {getAll};