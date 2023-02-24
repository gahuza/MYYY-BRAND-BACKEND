import { ref } from 'joi'
import { object, string, ref as _ref } from 'joi'

const blogSchema=object({
    title:string().min(10).required(),
    body:string().min(20).required()
})

const updateBlogSchema=object({
    Blog_id:string().required(),
    title:string().min(10),
    body:string().min(20)
})

const createUserSchema=object({
    username:string().required().min(4),
    email:string().email().required(), 
    password:string().min(6).required(),
    confirm_password:_ref('password'),
})
const loginUserSchema=object({
    email:string().email().required(),
    password:string().min(6).required(),
})
const messageSchema=object({
    name:string().required(),
    email:string().email().required(),
    message:string().min(6).required(),
    subject:string().min(6).required(),
    phone:string().min(6).required(),

})

export default{
    blogSchema,updateBlogSchema,createUserSchema,loginUserSchema, messageSchema
}