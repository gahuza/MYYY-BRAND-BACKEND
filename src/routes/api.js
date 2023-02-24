import  express  from "express";
import { httpCreateQuery , findQueri, deletequery} from "../controllers/query.controller.js";

const apiRouter= express.Router();

apiRouter.get('/query/get',findQueri)

apiRouter.post('/query/send',httpCreateQuery)

apiRouter.delete('/query/:id',deletequery)
 export default apiRouter;