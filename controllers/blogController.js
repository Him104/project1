const blogModel = require("../models/blogModel.js");
const authorModel = require("../models/authorModel.js");

const createBlog = async function (req, res) {
  try {
    const data = req.body;
    if (!data.title) {
      return res
        .status(400)
        .send({ status: false, msg: "Blog title is required field" });
    }
    if (!data.body) {
      return res
        .status(400)
        .send({ status: false, msg: "Blog Content is required" });
    }
    const valid_authorId = await authorModel.findOne({ _id: data.authorId });
    if (!valid_authorId) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide a Valid authorId" });
    }

    if (!data.category) {
      return res
        .status(400)
        .send({ status: false, msg: "Blog Category is required" });
    }
    if (!data.category) {
      return res
        .status(400)
        .send({ status: false, msg: "Blog Category is required" });
    }

    const createBlog = await blogModel.create(data);
    res.status(201).send({
      status: true,
      message: "Blog created successfully",
      data: createBlog,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

module.exports.createBlog = createBlog;
