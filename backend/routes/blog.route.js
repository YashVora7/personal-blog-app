const {Router} = require("express")
const {blogGet, blogCreate, blogDelete, blogUpdate, getById} = require("../controllers/blog.controller")
const blogRouter = Router()

blogRouter.get("/",blogGet)
blogRouter.post("/post",blogCreate)
blogRouter.delete("/delete/:id",blogDelete)
blogRouter.patch("/update/:id",blogUpdate)
blogRouter.get('/:id',getById);

module.exports = blogRouter