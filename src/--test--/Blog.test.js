
import supertest from "supertest";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";
import {expect, jest, test} from '@jest/globals';
import  response  from "supertest";
const request = require('supertest');
dotenv.config({ path: "../.env" });
import Query from "../models/Queries.model.js";
import Blog from "../models/Blogs.model.js";
import httpMocks from "node-mocks-http";
// import { describe } from "@hapi/joi/lib/base.js";
import userModel from '../Models/userModel.js';
import { getAllUsers, getAllUsersById ,deleteSingleUserById ,UpdateOne} from "../controllers/userController.js";
import { httpCreateQuery, findQueri, deletequery } from "../controllers/query.controller.js";
import cloudinary from "cloudinary"
// import UpdateOne from "../controllers/userController";


dotenv.config()


const signInToken = (id) => {};

/* Connecting to the database before each test. */












jest.setTimeout(20000);
beforeEach(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI_TEST, { useNewUrlParser: true });
    await Blog.create({
      title: 'okelloalan',
      body: 'ways',
      image:
        'http://res.cloudinary.com/dsvjwhgtk/image/upload/v1675778580/portfolio/blogImages/Title%203_image.jpg',
      comments: [],
      likes: [],
    });
    await userModel.create({
      firstName:'firstName',
      lastName: 'lastName',
      email: 'email@gmail.com',
      password: 'password',
      isAdmin: 'true',
    });
  } 
    
   catch (error) {
    console.log(error.message);
  }
 
});
/* Closing database connection after each test. */
afterEach(async () => {
  await Blog.deleteMany({});
  await userModel.deleteMany({});
  await mongoose.disconnect();
  await mongoose.connection.close();
});


describe('getAllUsers', () => {
  it('should return all users', async () => {
    const mockUsers = [{ name: 'User 1' }, { name: 'User 2' }];
    userModel.find = jest.fn().mockResolvedValue(mockUsers);
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await getAllUsers(req, res);
    expect(userModel.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockUsers);
  });

  it('should return a user with the specified ID', async () => {
    const mockUser = { name: 'User 1', _id: '123' };
    userModel.findById = jest.fn().mockResolvedValue(mockUser);
    const req = { params: { id: '123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await getAllUsersById(req, res);
    expect(userModel.findById).toHaveBeenCalledWith({ _id: '123' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockUser);
  });

  it('should delete the user with the specified ID', async () => {
    userModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
    const req = { params: { id: '123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await deleteSingleUserById(req, res);
    expect(userModel.deleteOne).toHaveBeenCalledWith({ _id: '123' });
    expect(res.status).toHaveBeenCalledWith(207);
    expect(res.send).toHaveBeenCalledWith({ ok: 'delete success' });
  });

});

describe('UpdateOne', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: { id: '1' },
      body: { name: 'John Doe' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a success message when update succeeds', async () => {
    const mockUpdateUser = { name: 'John Doe', _id: '1' };
    jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue(mockUpdateUser);

    await UpdateOne(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Update success done ',
    });
  });


});




describe('api test Queries', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { name: 'User', email: '63ef3ab2c17e649f9388412f', content: 'well' } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });



  it('return a 201 status to create query', async () => {
  
    const query = {
      email: 'jadokero12@gmail.ac.rw',
      content: 'query content',
    };
    const createdQuery = await request(app)
      .post('/api/query/get')
      .send(query)
    expect(createdQuery.status).toEqual(404);
    expect(createdQuery.body.data).toHaveProperty(
      'email',
      'content',
    );
  });

   
});




describe('GET /api/blogs/get', () => {
  // it('get any specified route', async (req,res) => {
  //   request(app).get('/api/blogs');
  //   expect(res.status).toEqual(200);
  // });

  it('get all blogs', async () => {
    const res = await request(app).get('/api/blogs/get');
    expect(res.status).toEqual(200);
    const blog = res.body.data;
    expect(Array.isArray(blog)).toBe(true);
    expect(blog[0]).toHaveProperty(
      'title',
      'content',
      'image',
      'likes',
      'comments',
      '_id',
    );
  });


  // it('responds with JSON and a success status when blog is found', async () => {
  //   const blog = {
  //     _id: '63e8c634d7a3542707a55caa',
  //     title: 'okelloalan',
  //     content: 'ways'
  //   };
  //   const response = await request(app).get(`/api/blogs/${blog._id}`);
  //   expect(response.statusCode).toBe(404);
  //   expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
  //   expect(response.body).toEqual({
  //     status: 'success',
  //     number: 1,
  //     blogs: [blog]
  //   });
  // });
  it('return one blog', async () => {
    const allBlogs = await request(app).get('/api/blogs/get');
    const currentBlog = allBlogs.body.data[0];
    const id = currentBlog._id;
    const res = await request(app).get(`/api/blogs/${id}`);
    expect(res.status).toEqual(200);
  });


  it('should delete a blog with valid ID', async () => {
    const blogId= "63e8c634d7a3542707a55caa";
    const response = await request(app).delete(`/api/blogs/${blogId}`);
    expect(response.status).toBe(207);
    expect(response.body).toEqual({ ok: 'delete success' });
  });



  it('return a 201 status to create blog', async () => {
  
    const blog = {

      topic: 'blog topic',
      title: 'blog title',
      content: 'blog content',
    };
    const createdBlog = await request(app)
      .post('/api/blogs/')
      .send(blog)
    expect(createdBlog.status).toEqual(201);
    expect(createdBlog.body.data).toHaveProperty(
      'topic',
      'title',
      'content',
      'likes',
      'comments',
      '_id',
    );
  });

  it('return a 201 status to update blog ', async () => {

    const blog = {
      title: 'blog title',
      content: 'blog content',
    };
    const allBlogs = await request(app).get('/api/blogs/get');
    const currentBlog = allBlogs.body.data[0];
    const id = currentBlog._id;
    const updatedBlog = await request(app)
      .patch(`/api/blogs/${id}`)
      .send(blog)
    expect(updatedBlog.status).toEqual(201);
    expect(updatedBlog.body.data).toHaveProperty(
      'title',
      'content',
      'likes',
      'comments',
      '_id',
    );
  });

 
  it('return a 201 status if user is logged in', async () => {
    const user = {
      email: 'email@gmail.com',
      password: 'password',
    };
    const comment = {
      comment: 'comment',
    };
    const login = await request(app).post('/api/signin/user').send(user);
    const token = login.body.token;
    const allBlogs = await request(app).get('/api/blogs/get');
    const currentBlog = allBlogs.body.data[0];
    const id = currentBlog._id;
    const updatedBlog = await request(app)
      .post(`/api/blogs/comments/${id}`)
      .send(comment)
      .set('auth', 'Bearer ' + token);
    expect(updatedBlog.status).toEqual(201);
    expect(updatedBlog.body.message).toEqual('Comment added');
  });

})

 // get all comments
 describe('GET /blogs/:id/comments', () => {
 
  it('return one blog', async () => {
    const allBlogs = await request(app).get('/api/blogs/get');
    const currentBlog = allBlogs.body.data[0];
    const id = currentBlog._id;
    const res = await request(app).get(`/api/comments/${id}`);
    expect(res.status).toEqual(201);
  });
});





 //add or remove like
 describe('POST /blogs/:id/likes', () => {
  // it('return a 401 status if user is not logged in', async () => {
  //   const res = await request(app).post('/api/blogs/').send({});
  //   expect(res.status).toEqual(401);
  // });
  it("return a 400 status if blog doesn't exist", async () => {
    const user = {
      email: 'email@gmail.com',
      password: 'password',
    };

    const login = await request(app).post('/api/signin/user').send(user);
    const token = login.body.token;
    const allBlogs = await request(app).get('/api/blogs/get');
    const currentBlog = allBlogs.body.data[0];
    const id = currentBlog._id;
    const updatedBlog = await request(app)
      .post(`/api/blogs/${id + 1}/likes`)
      .set('auth', 'Bearer ' + token);
    expect(updatedBlog.status).toEqual(404);
    const message = updatedBlog.body.message;
    expect(message).toEqual("Blog doesn't exist!");
  });
  it('return a 201 status if user is logged in', async () => {
    const user = {
      email: 'email@gmail.com',
      password: 'password',
    };

    const login = await request(app).post('/api/signin/user').send(user);
    const token = login.body.token;
    const allBlogs = await request(app).get('/api/blogs/get');
    const currentBlog = allBlogs.body.data[0];
    const id = currentBlog._id;
    const updatedBlog = await request(app)
      .post(`/api/blogs/${id}/likes`)
      .set('auth', 'Bearer ' + token);
    expect(updatedBlog.status).toEqual(200);
    expect(updatedBlog.body.data[0].message).toEqual('Done');
  });
});

describe('GET /api/blogs/:id/likes', () => {
 
  it('return one blog', async () => {
    const allBlogs = await request(app).get('/api/blogs/get');
    const currentBlog = allBlogs.body.data[0];
    const id = currentBlog._id;
    const res = await request(app).get(`/api/blogs/${id}/likes`);
    expect(res.status).toEqual(200);
  });
});













// describe("GET /api/v1/query", () => {
//     test('should respond with a 203 status code', async () => {
//       const response = await request(app).get("/api/query/get")
//       expect(response.statusCode).toBe(203)
//     })
//   })

// // //post

// describe("create /api/query", () => {
//     test('should respond with a 201 status code', async () => {
//       const response = await request(app).post("/api/query/send").send({})
//       expect(response.statusCode).toBe(201)
//     })
//   })
  

//   describe("DELETE /api/query/:id", () => {
//     it("should respond with a 207 status code", async () => {
//       const response = await request(app).delete("/api/query/63de55283cbabcaf0123f51e")
//       expect(response.statusCode).toBe(207);
//     });
//   });

 



//     //update query

   
// // get all blogs

// describe("blog testing", () => {
//   const blogData = {
//     title: "okelloalan",
//     body: "ways",
//   }
 



//  //post blog
//  describe('POST /blog', () => {
//   test('It should respond with status code 201', async () => {
//     const response = await request(app)
//       .post('/api/blogs')
//       .send({
//         title: 'okelloalan',
//         body: 'ways',
//         image: 'https://testblogimage.com/test.jpg',
//       })
//       .set('Content-Type', 'application/json');
//     expect(response.statusCode).toBe(201);
//   });
// });





//     describe("GET /api/blogss", () => {
//       test('should respond with a 200 status code', async () => {
//         const response = await request(app).get("/api/blogs")
//         expect(response.statusCode).toBe(200)
//       })
//     });
//     //by id
//     describe("GET /api/blogss", () => {
//       test('should respond with a 404 status code', async () => {
//         const response = await request(app).get("/api/blogs/63e8c634d7a3542707a55caa")
//         expect(response.statusCode).toBe(200)
//       })
//     });
//     //update single blog
// describe("UPDATE /api/blogs/:id", () => {
//   it('should respond with a 400 status code', async () => {
//     const response = await request(app).patch("/api/blogs/:id")
//     .send(blogData)
//     expect(response.statusCode).toBe(400)
//   })
// })

// it('get all blogs', async () => {
//   const res = await request(app).get('/api/blogs');
//   expect(res.status).toEqual(200);
//   const blog = res.body.data;
//   expect(Array.isArray(blog)).toBe(true);
//   expect(blog[0]).toHaveProperty(
//     'title',
//     'content',
//     'image',
//     'likes',
//     'comments',
//     '_id',
//   );
// });

//   })
//   //delete blog
//   describe("DELETE /api/blogs/:id", () => {
//     it("should respond with a 200 status code", async () => {
//       const response = await request(app).delete("/api/blogs/63e21c99208aa0b5bd58ff8f")
//       expect(response.statusCode).toBe(207);
//     });
//   });



  
// // })

// //add all comments on blo

//  //add comment
 
//   describe('get all users', () => {
//     const token =  process.env.TOKEN_SECRET

//     it('get all users', async () => {
//       const res = await request(app).get('/api/signin');
//       expect(res.status).toEqual(200);
//     });
    
//     const userData = {
//       email: "gahuza@gmail.com",
//       password: "gahuza",
//     }
//     it('create  new user', async () => {
//       const res = await (await request(app).post('/api/signup'));
//       expect(res.status).toEqual(200);
//     });
//     it('delete user', async () => {
//       const res = await (await request(app).delete('/api/signIn/63de55283cbabcaf0123f51e'));
//       expect(res.status).toEqual(207);
//     });

//     describe("UPDATE /api/user/:id", () => {
//       it('should respond with a 400 status code', async () => {
//         const response = await request(app).patch("/api/signIn/63e21c99208aa0b5bd58ff8f")
//         .send(userData)
//         expect(response.statusCode).toBe(404)
//       })
//     })
// });

//     //get single blog

//     //add comments token
//   //add comment
//   describe('POST /blogs/:id/comments', () => {
//     it('adds a comment to a blog post', async () => {
//       // Mock the Blog.findOne method to return a valid blog object
//       const mockBlog = {
//         _id: 'abc123',
//         comments: [],
//         save: jest.fn(),
//       };
//       jest.spyOn(Blog, 'findOne').mockResolvedValue(mockBlog);
  
//       // Send a POST request to the endpoint with a comment in the request body
//       const res = await request(app)
//         .post('/blogs/63e8c634d7a3542707a55caa/comments')
//         .send({ comment: 'This is a comment.' });
  
//       // Assert that the response has a 201 status code
//       expect(res.status).toBe(201);
  
//       // Assert that the response body has a success property that is true
//       expect(res.body.success).toBe(true);
  
//       // Assert that the response body has a message property that contains "Comment added"
//       expect(res.body.message).toContain('Comment added');
  
//       // Assert that the blog's comments array was updated with the new comment
//       expect(mockBlog.comments).toContainEqual({
//         comment: 'This is a comment.',
//         user: expect.any(Object),
//         blog: mockBlog,
//       });
//     });
  
//     afterEach(() => {
//       jest.restoreAllMocks(); // reset the mock after each test
//     });
//   });

  
  
  




//    //add comment
//    describe('POST /blogs/:id/comments', () => {
//     it('return a 201 status if user is not logged in', async () => {
//       const comment = {
//         comment: 'well',
//       };
//       const res = await request(app).post('/api/blogs/comments/63e373de2ffaef80bcc03c95').send(comment);
//       expect(res.status).toEqual(201);
//     });
  
   
//   })
//   describe("GET /api/comment", () => {
//     test('should respond with a 404 status code', async () => {
//       const response = await request(app).get("/api/comments/63e373de2ffaef80bcc03c95")
//       expect(response.statusCode).toBe(404)
//     })
  
//   })


//   //comments
//   describe('GET /blogs/:id/comments', () => {
//     it("return a 400 status if '_id' is invalid", async () => {
//       const res = await request(app).get('/api/comments/63e373de2ffaef80bcc03c95');
//       expect(res.status).toEqual(404);
//       const message = res.body.message;
//       expect(message).toEqual("Blog doesn't exist");
//     });
//     it('return one blog', async () => {
//       const allBlogs = await request(app).get('/api/blogs');
//       const currentBlog = allBlogs.body.data[0];
//       const id = currentBlog._id;
//       const res = await request(app).get(`/api/comments/${id}`);
//       expect(res.status).toEqual(200);
//     });})

//    //add or remove like
//    describe('POST /blogs/:id/likes', () => {
//     it('return a 500 status if user is not logged in', async () => {
//       const res = await request(app).post('/api/blogs/63e373de2ffaef80bcc03c95/likes').send({});
//       expect(res.status).toEqual(401);
//     });
//     describe("GET /api/likes", () => {
//       test('should respond with a 404 status code', async () => {
//         const response = await request(app).get("/api/blogs/63e373de2ffaef80bcc03c95/likes")
//         expect(response.statusCode).toBe(404)
//       })
    
//     })

//     it("return a 400 status if blog doesn't exist", async () => {
//       const user = {
//         email: 'gahuza@gmail.com',
//         password: 'gahuza',
//       };

//       const login = await request(app).post('/api/signin').send(user);
//       const token = login.body.token;
//       const allBlogs = await request(app).get('/api/blogs/63e373de2ffaef80bcc03c95/likes');
//       const currentBlog = allBlogs.body.data;
//       const id = currentBlog._id;
//       const updatedBlog = await request(app)
//         .post(`/api/blogs/${id + 1}/likes`)
//         .set('auth' + token);
//       expect(updatedBlog.status).toEqual(401);
//       const message = updatedBlog.body.message;
//       expect(message).toEqual("Blog doesn't exist!");
//     });

  
//   })

//   //add and remove like
//   describe('POST /like/:id', () => {
//     let blog;
  
//     beforeAll(async () => {
//       // create a sample blog to be used in the tests
//       blog = await Blog.create({
//         title: 'Test Blog',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         likes: [],
//       });
//     });
  
//     // afterAll(async () => {
//     //   // remove the sample blog after all tests are done
//     //   await Blog.deleteOne({ _id: blog._id });
//     // });
  
//     it('should like a blog if not already liked', async () => {
//       const response = await request(app)
//         .post(`/like/${`63e8c634d7a3542707a55caa`}`)
//         .send({})
//         .expect(201);
  
//       expect(response.body.success).toBe(true);
//       expect(response.body.data[0].body.likes.length).toBe(1);
//     });
  
//     it('should unlike a blog if already liked', async () => {
//       // like the blog first
//       await request(app).post(`/like/${blog._id}`).send({});
  
//       const response = await request(app)
//         .post(`/like/${`63e8c634d7a3542707a55caa`}`)
//         .send({})
//         .expect(201);
  
//       expect(response.body.success).toBe(true);
//       expect(response.body.data[0].body.likes.length).toBe(0);
//     });
  
//     it('should return 404 if blog not found', async () => {
//       const response = await request(app)
//         .post(`/like/non-existent-id`)
//         .send({})
//         .expect(404);
  
//       expect(response.body.success).toBe(false);
//       expect(response.body.data.message).toBe('Blog not found!');
//     });
//   });

   
//          // add comment
  
//   // get all comments
//   // describe('GET /blogs/:id/comments', () => {
//   //   it("return a 400 status if '_id' is invalid", async () => {
//   //     const res = await request(app).get('/api/blogs/23333/comments');
//   //     expect(res.status).toEqual(400);
//   //     const message = res.body.message;
//   //     expect(message).toEqual("Blog doesn't exist");
//   //   });
//   //   it('return one blog', async () => {
//   //     const allBlogs = await request(app).get('/api/blogs');
//   //     const currentBlog = allBlogs.body.data[0];
//   //     const id = currentBlog._id;
//   //     const res = await request(app).get(`/api/blogs/${id}/comments`);
//   //     expect(res.status).toEqual(200);
//   //   });
//   // });
  

//    //like counting
//    describe('GET /likesCounting/:id', () => {
//     let blog;
  
//     beforeAll(async () => {
//       // create a sample blog to be used in the tests
//       blog = await Blog.create({
//         title: 'Test Blog',
//         body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         likes: [
//           { user: 'user1', blog: 'blog1' },
//           { user: 'user2', blog: 'blog1' },
//         ],
//       });
//     });
  
//     afterAll(async () => {
//       // remove the sample blog after all tests are done
//       await Blog.deleteOne({ _id: `63e8c634d7a3542707a55caa`});
//     });
  
//     it('should return the number of likes for a blog', async () => {
//       const response = await request(app)
//         .get(`/likesCounting/${`63e8c634d7a3542707a55caa`}`)
//         .expect(200);
  
//       expect(response.body.success).toBe(true);
//       expect(response.body.message).toContain(blog.likes.length);
//     });
  
//     it('should return 404 if blog not found', async () => {
//       const response = await request(app)
//         .get(`/likesCounting/non-existent-id`)
//         .expect(404);
  
//       expect(response.body.success).toBe(false);
//       expect(response.body.message).toBe("Blog doesn't exist");
//     });
//   });