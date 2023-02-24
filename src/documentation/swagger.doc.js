
import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
const docrouter = Router();
const options = {
  openapi: '3.0.1',
  info: {
    title: 'My Brand',
    version: '1.0.0',
    description:
      'This is the backend api for my portfolio app.',
  },
  basePath: '/api',
security: [
  {
    bearerAuth: [],
  }
],
tags: [
      {name: 'userModel', description: 'userModel'},
      {name: 'Blog', description: 'Blogs'},
      {name: 'Query', description: 'Query'},
    ],
  paths: {
    '/api/signup': {
      post: {
        tags: ['userModel'],
        description: 'User register',
        security: [],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userModel',
              },
              example: {
                firstname: 'Jadosokero',
                lastname: 'Joseph',
                password: 'joseph',
                email: 'admin@gmail.com'
               
                
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'New User was created successfully',
          },
          400: {
            description: 'Bad Request',
          },
          500: {
              description: 'Internal Server Error'
          }
        },
      },
    },
    '/api/signin/user': {
        post: {
        tags: ['Users'],
        description: 'User login',
        security: [],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                email: 'admin@gmail.com',
                password: '123456',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          400: {
            description: 'Invalid credation',
          },
          500: {
              description: 'Internal Server Error'
          }
        },
        }
    },
  

  '/api/signIn/upget': {
    get: {
    tags: ['userModel'],
    description: 'Get All signIn ',
    parameters: [],
    security: [],
    responses: {
      200: {
        description: 'Retrieve successfully',
      },
      500: {
          description: 'Internal Server Error'
      }
    },
  }
},

    '/api/signIn/{id}': {
      get: {
        security: [],
      tags: ['userModel'],
      description: 'Get One Blog user by id',
      parameters: [
        {
           "in": "path",
         "name": "id",
          required: true,
        }
      ],
      responses: {
        200: {
          description: 'successfully',
        },
        500: {
            description: 'Internal Server Error'
        }
      },
      }
  },
    '/api/blogs/get': {
        get: {
        tags: ['Blog'],
        description: 'Get All Blog Articles',
        parameters: [],
        security: [],
        responses: {
          200: {
            description: 'successfully',
          },
          500: {
              description: 'Internal Server Error'
          }
        },
      }
    },

    
    '/api/blogss/{id}': {
      get: {
        security: [],
      tags: ['Blog'],
      description: 'Get One Blog article by id',
      parameters: [
        {
           "in": "path",
         "name": "id",
          required: true,
        }
      ],
      responses: {
        200: {
          description: 'successfully',
        },
        500: {
            description: 'Internal Server Error'
        }
      },
      }
  },
  '/api/blogs':{
    post:{
      tags:['Blog'],
      description:'Create new blog article',
    //   parameters:[
    //   {
    //   "in":"formData",
    //   "name":"title",
    //   "description":"Article title",
    //   required:true
    //    },
    //   {
    //   "in":"formData",
    //   "name":"content",
    //   "description":"Article content",
    //   required:true
    //    },
    //   {
    //   "in":"form",
    //   "name":"photo",
    //   scheme:{
    //   type: 'string',
    //   description: "Article image url",
    //   format: 'binary'
    // },
    //   required:true
    //    },
    //   ],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  },
  '/api/blogs/update/{id}':{
    patch:{
      tags:['Blog'],
      description:'Update blog article',
      parameters: [
        {
           "in": "path",
         "name": "id",
          required: true,
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
            example: {
              title: 'testing blog article title update',
              content: 'testing blog article content update',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        404: {
          description: 'Article doesn\'t exist!',
        },
        500: {
            description: 'Internal Server Error'
        }
      },
    }
  },
  '/api/blogs/{id}':{
    delete:{
      tags:['Blog'],
      description:'Delete blog article',
      parameters: [
        {
           "in": "path",
         "name": "id",
          required: true,
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        404: {
          description: 'Article doesn\'t exist!',
        },
        500: {
            description: 'Internal Server Error'
        }
      },
    }
  },
 
  '/api/blogs/comments/{id}/':{
    post:{
      tags:['Blog'],
      description:'Comment on blog article',
      parameters: [
        {
           "in": "path",
         "name": "id",
          required: true,
        }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
            example: {
              comment:"that content is very helpful thanks"
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'Not Authorized',
        },
        404: {
          description: 'Article doesn\'t exist!',
        },
        500: {
            description: 'Internal Server Error'
        }
      },
    }
  },

  '/api/comments/{id}': {
    get: {
      security: [],
    tags: ['Blog'],
    description: 'Get One Blog article by id',
    parameters: [
      {
         "in": "path",
       "name": "id",
        required: true,
      }
    ],
    responses: {
      200: {
        description: 'successfully',
      },
      500: {
          description: 'Internal Server Error'
      }
    },
    }
},

  '/api/query/send/':{
    post:{
      tags:['Message'],
      security:[],
      description:'Sending message',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Message',
            },
            example: {
              name:"John Doe",
              email:"john@gmail.com",
              message:"testing message"
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        500: {
            description: 'Internal Server Error'
        }
      },
    }
  },
  '/api/query/get':{
    get:{
      tags:['Query'],
      description:'Getting all messages',
      parameters: [],
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'Not Authorized',
        },
        500: {
            description: 'Internal Server Error'
      },
    },
    }
  },
  },
  components: {
    schemas: {
      userModel: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the user',
          },
          firstName: {
            type: 'string',
            description: "User's names",
          },
          lastName: {
            type: 'string',
            description: "User's names",
          },
          password: {
            type: 'string',
            description: "User's password",
          },
          email: {
            type: 'string',
            description: "User's email",
          },
          role: {
            type: 'string',
            description: "User role",
          },
        },
      },


      Blog: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: "Article title",
          },
          body: {
            type: 'string',
            description: "Article content",
          },
          image: {
            type: 'string',
            description: "Article image url",
            format: 'binary'
          }
      },
    },
      Message: {
        type:"object",
        properties:{
          id: {
            type: 'string',
            description: 'The auto-generated id of the message',
          },
          name: {
            type: 'string',
            description: 'sender name',
          },
          email: {
            type: 'string',
            description: 'sender email',
          },
          message: {
            type: 'string',
            description: 'message content',
          },
        }
      }
     },
    securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
},
}
docrouter.use('/', serve, setup(options));
export default docrouter;