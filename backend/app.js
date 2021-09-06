



const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require("./models/post");
//const { equal } = require("assert");
const { find } = require("./models/post");
const connectDB = require("./connectdb");


// mongoose
//   .connect("mongodb://localhost/bnb2", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log("DB CONNECTED");
//   });
// mongoose.connect(
//   //     mongodb://localhost/bnb2, {
//   //       useNewUrlParser: true,
//   //       useUnifiedTopology: true,
//   //       useCreateIndex: true,
//   //     });


// mongoose
//   // .connect(
//   //   "mongodb+srv://max:QuBqs0T45GDKPlIG@cluster0-ntrwp.mongodb.net/node-angular?retryWrites=true"
//   // )
//   .connect(
//     "mongodb://localhost/bnb2 " , {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//           useCreateIndex: true,
//         })
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   }));

  mongoose
  .connect( "mongodb://localhost/bnb2" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });


const app = express();


  app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));\
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts" , (req,res, next) =>
{
  console.log('post');
  
  const {title,content} = req.body;

  if(!title || !content ){
    return res.status(400).json({error:"include all fields"})
  }

  const post = new Post({
    title,
    content
  });
 

    post.save((err,post)=>{

      if(err){
        return res.status(400).json(err)
      }
      else{
        return res.status(200).json(post)
      }
    })


  
});

// app.get("/api/get/posts",(req,res,next)=>
// {
//   const getpost = Post.find({});
//   return res.status(200).json(getpost)
// })






app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: "Post added successfully"
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents.map()
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});



app.listen(5000, console.log('Server running on port 5000'))

module.exports = app;
