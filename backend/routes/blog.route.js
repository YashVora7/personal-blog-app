const { Router } = require("express");
const {
  blogGet,
  blogCreate,
  blogDelete,
  blogUpdate,
  getById,
} = require("../controllers/blog.controller");
const authMiddleware = require("../middleware/auth.middleware");
const blogRouter = Router();

blogRouter.get("/", authMiddleware, blogGet);
blogRouter.post("/post", authMiddleware, blogCreate);
blogRouter.delete("/delete/:id", authMiddleware, blogDelete);
blogRouter.patch("/update/:id", authMiddleware, blogUpdate);
blogRouter.get("/:id", authMiddleware, getById);

module.exports = blogRouter;
