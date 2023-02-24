import  express  from "express";
import multer  from "multer"
import path  from "path"
import { createBlog ,getAllBlogs, deleteBlog ,getBlogById , addComment ,getAllComments ,updateSingleBlog ,like ,likesCounting}  from "../controllers/blog.controller.js";
import { auth } from "../middleware/auth.js";
import { commentsSchema } from "../middleware/validation.js";
import validate from "../middleware/validation.middleware.js";
import { getAllUsers ,getAllUsersById, deleteSingleUserById} from "../controllers/userController.js";
const blogRouter= express.Router();

var upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
  });



blogRouter.post('/blogs',upload.single("image"),createBlog);

 blogRouter.get('/blogs/get',getAllBlogs)
 blogRouter.get('/signIn/upget',getAllUsers)
 blogRouter.get('/blogss/:id',getBlogById )
 blogRouter.get('/signIn/:id',getAllUsersById)
blogRouter.delete('/blogs/:id',deleteBlog)
blogRouter.delete('/signIn/:id',deleteSingleUserById)
blogRouter.patch('/blogs/update/:id',upload.single("image"), updateSingleBlog);
//blog likes
blogRouter.post('/blogs/:id/likes',auth, like);
blogRouter.get('/blogs/:id/likes', likesCounting);
// blogRouter.patch('/blogs/:id',updateBlog)
blogRouter.post('/blogs/comments/:id', [auth, validate(commentsSchema)], addComment);
blogRouter.get('/comments/:id',getAllComments);


 export default blogRouter;