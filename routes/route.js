const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController.js");
const blogController = require("../controllers/blogController.js");
//const getController = require('../controllers/getController.js');
const deleteController = require("../controllers/deleteController.js");

router.post("/authors", authorController.createAuthor);
router.post("/createBlog", blogController.createBlog);
//router.get('/blogs/:authorId', getController.getBlog);
router.delete("/deleteblog/:blogId", deleteController.deleteBlog);
router.delete("/deleteblog", deleteController.deleteBlog);

module.exports = router;
