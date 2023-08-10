
const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorController.js');
const blogController = require('../controllers/blogController.js');
//const getController = require('../controllers/getController.js');
const deleteController = require('../controllers/deleteController.js');
const updateController = require('../controllers/updateController.js');

router.post('/authors', authorController.createAuthor);
router.post('/authorLogin',  authorController.login);
router.post('/createBlog', blogController.createBlog);
//router.get('/blogs/:authorId', getController.getBlog);
router.delete('/deleteblog/:blogId', deleteController.deleteBlog);
router.delete('/deleteblog', deleteController.deleteBlog);
router.put('/updateBlog/:blogId', updateController.updateBlog); 
//router.put('/updateBlog', updateController.updateBlog);
module.exports = router; 