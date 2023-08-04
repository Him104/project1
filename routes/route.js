const express = require("express");
const router = express.Router();

const authorController = require('../controller/authorController.js');
const blogController = require('../controller/blogController.js');

router.post('/authors', authorController.createAuthor);
router.get('/createBlog', blogController.createBlog);
module.exports = router;
