// import express from "express";
// import bodyParser from 'body-parser';
// import morgan from "morgan";

// import apiRouter from './routes/api.js';
//  import blogRouter from './routes/blog.routes.js';
// // import commentRouter from './routes/commentrout.js';
// // import  autRouter  from './routes/userRoute.js';
// import route from './routes/userRoute.js';
// function createServer(){
//      const app = express();
// app.use(bodyParser.json());
// app.use(morgan("combined"));
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use("/api", apiRouter)
//  app.use("/api",  blogRouter)
// //   app.use("/api", commentRouter)
//  app.use('/api', route);

// //our movie will use api/v1/movies/

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin,X-Requested-Width,Content-Type,Accept,auth-token"
//     );
//     if (req.method === "OPTIONS") {
//       res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE");
//       return res.status(200).json({});
//     }
//     next();
//   });
//   app.get('/', (req, res) => {
//     res.status(200).json({
//       message: 'Welcome to the node backend API',
//     });
//   });


// app.get("/api/v1", (req, res) =>{
//     return res.status(200).json({message: "Welcome to the node end points api"});
// })

// }
// export default createServer;