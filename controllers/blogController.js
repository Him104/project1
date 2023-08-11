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
        return res.status(400).send({ status: false, msg: "Blog Content is required" });
      }
      const  authorId=data.authorId;
      if(!authorId){
        return res.status(400).send({status:false,msg:"authorId is required"})
        }

      const valid_authorId = await authorModel.findById(authorId)
      if (!valid_authorId) {
        return res.status(400).send({ status: false, msg: "Please Provide a Valid authorId" });
      }

      if (!data.category) {
        return res.status(400).send({ status: false, msg: "Blog Category is required" });
      }
      if (!data.category) {
        return res.status(400).send({ status: false, msg: "Blog Category is required" });
      }
      if (data.isPublished === true) {
        
        data.publishedAt = Date.now();
        
      }
     
      const createBlog = await blogModel.create(data);
      
      res
        .status(201)
        .send({
          status: true,
          message: "Blog created successfully",
          data: createBlog,
        });
     
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  };

const getBlogs = async function(req,res){
    {try {

const query = req.query;

if (Object.keys(query).length==0) {

  const allBlogs = await blogModel.find({isPublished:true,isDeleted:false});

   
  if (allBlogs.length !=0 ) {

    return res.status(200).send({status:true,data:allBlogs})
    
  }

}

if (Object.keys(query).length!=0) {

  query.isDeleted = false; query.isPublished = true;
      const getByQuery = await blogModel.find(query)

           if(getByQuery.length !=0){
            return res.status(200).send({status:true , data:getByQuery})
          }

          if (getByQuery.length ==0){
            return  res.status(404).send({ status: false, msg: "No blogs found by filter"});
          }
  
  
}

      
    } catch (error) {
      res.status(500).send({status:false, error:message.error})
      
    }}
  }
  

module.exports.getBlogs=getBlogs;
module.exports.createBlog = createBlog;
