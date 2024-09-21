const blogModel = require("../models/blog.model");

const blogGet = async (req, res) => {
  // let data = await blogModel.find()
  // res.send(data)

  try {
    const posts = await blogModel.find({userId : req.userId}).sort({ date: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

const blogCreate = async (req, res) => {
    // let data = await blogModel.create(req.body);
    // res.send(data);

  const { title, description, author } = req.body;
  try {
    const newPost = new blogModel({ title, description, author, userId:req.userId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

const blogDelete = async (req, res) => {
    // let { id } = req.params;
    // let data = await blogModel.findByIdAndDelete(id);
    // res.send(data);

  const { id } = req.params;
  try {
    const deletedPost = await blogModel.findByIdAndDelete({_id:id,userId:req.userId});
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

const blogUpdate = async (req, res) => {
  //   let { id } = req.params;
  //   let data = await blogModel.findByIdAndUpdate(id, req.body);
  //   res.send(data);

  const { id } = req.params;
  const { title, description, author } = req.body;
  try {
    const updatedPost = await blogModel.findByIdAndUpdate(
      {_id:id, userId: req.userId},
      { title, description, author },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

const getById =  async (req, res) => {
  try {
      const post = await blogModel.findById(req.params.id);
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { blogGet, blogCreate, blogDelete, blogUpdate, getById };
