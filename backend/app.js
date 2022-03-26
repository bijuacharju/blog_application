const express = require("express");
const app = express();
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const Post = require("./api/models/posts");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
    },
});

const getExt = (mimetype) => {
    switch (mimetype) {
        case "image/png":
            return ".png";
        case "image/jpeg":
            return ".jpeg";
        case "image/jpg":
            return ".jpg";
    }
};

var upload = multer({ storage: storage });

const postsData = new Post();

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/uploads', express.static('uploads'));

app.get("/api/posts", (req, res) => {
    res.status(200).send(postsData.get());
});

app.get("/api/posts/:post_id", (req, res) => {
    const postID = req.params.post_id;
    const foundPost = postsData.getIndividualBlog(postID);
    if (foundPost) {
        res.status(200).send(foundPost);
    } else {
        res.status(200).send("Not Found");
    }
});

app.post("/api/posts", upload.single("post-image") ,(req, res)=>{ 
  const newPost = {
      "id": `${Date.now()}`,
      "title": req.body.title,
      "content": req.body.content,
      "post_image": req.file.path.replace("\\", "/"),
      "added_date": `${Date.now()}`
  }
  postsData.add(newPost);
  res.status(201).send(newPost);
})

app.listen(4000, () => console.log("Listening on http://localhost:4000/"));
