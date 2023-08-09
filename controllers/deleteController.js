const blogModel = require("../models/blogModel.js");

const deleteBlog = async function (req, res) {
    try { 
        const blogId = req.params.blogId;
        const {authorId,category}= req.query;

        if(category && authorId) { 

          const blog1 = await blogModel.find({category: category, authorId: authorId});
          if (blog1.isDeleted == true) {
            return res
              .status(400)
              .send({ status: false, message: "blog1 has already been deleted" });
          }
          else {
            const deletedBlog1 = await blogModel.updateMany({category: category, authorId: authorId} ,
              {$set: {isDeleted:true}}, {new:true});
              
              return res.status(201).send({status:true,msg:"blog1 deleted successfully"})


          }

          
        }
        if(category) { 

          const blog2 = await blogModel.find({category: category});
          if(blog2){

            const deletedBlog2 = await blogModel.updateMany({category: category} ,
              {$set: {isDeleted:true}}, {new:true})
              
              return res.status(201).send({status:true,msg:"blog2 deleted successfully"})




          }

          
        }
        if(authorId) { 

          const blog3 = await blogModel.find({authorId: authorId});
          console.log(blog3.authorId);

          if (blog3.isDeleted == true) {
            return res
              .status(400)
              .send({ status: false, message: "blog3 has already been deleted" });
          }

          else { 

            const deletedBlog3 = await blogModel.updateMany({authorId: authorId} ,
              {$set: {isDeleted:true}}, {new:true})
              
              return res.status(201).send({status:true,msg:"blog3 deleted successfully", data: blog3});
              




          }

          
        }
    
    
     const blog = await blogModel.findById(blogId);
    if (!blog) {
    
      return res.status(404).send({status:false,message:"blog not found"})
    
    }
    if (blog.isDeleted == true) {
    
      return res.status(400).send({status:false, message: "blog has already been deleted"})
      
    }
    
    const deletedBlog = await blogModel.findByIdAndUpdate(blogId ,
    {$set: {isDeleted:true}}, {new:true})
    
    return res.status(201).send({status:true,msg:"blog deleted successfully"})
    
    
      } catch (error) {
    
        res.status(500).send({status:false,error:error.msg})
      
        
      }
      
  };
  


module.exports.deleteBlog = deleteBlog;