import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify} from 'hono/jwt'
import  signupInput  from '../zod'


export const userRouter = new Hono<{
    // typescript doesn't understand wrangler.toml code
    // passing the generics 
      Bindings: {
        DATABASE_URL: string;
        JWT_SECRET:string;
      }
  }>();


userRouter.post('/signup',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct "
      })
    }
    try{     
    const user = await prisma.user.create({
      data:{
        email:body.email,
        password:body.password,
        name:body.name
      },
    })
    // Authentications , whole point of signup need to do is entry in database and second thing sign up route need to do is return the user a JWT, user can send in local storage and eventually send in every request
    const token =await sign({
      id:user.id
    },c.env.JWT_SECRET)
    return c.json({jwt: token})
  }catch(e){
    c.status(411)
    return c.text('Invalid')
  }
  })
  
  userRouter.post('/signin', async (c) => {
      const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
  
      const body = await c.req.json();
      const user = await prisma.user.findUnique({
          where: {
              email: body.email,
        password: body.password
          }
      });
  
      if (!user) {
          c.status(403);
          return c.json({ error: "user not found" });
      }
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
  })
  