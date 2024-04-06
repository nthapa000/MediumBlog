import { createBlogInput, updateBlogInput } from "nthapa0000_medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify} from 'hono/jwt'

export const blogRouter = new Hono<{
  // passing the generics
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    userId: string;
  }
}>();


blogRouter.use('/*', async (c, next) => {
    // get the header
    // verify the header
    // if the header is correct , we can proceed
    // if not, we return the user a 403 status code
    const header = c.req.header("authorization") || "";
    //if this is undefined then we want to set the type of header as string or typescript will raise an error 

    // auth header 
    // Bearer token(format of the token)
    // ["Bearer","token"]
    // const token = header.split(" ")[1]
  
    // decode is similar to decode a jwt and give orginal jwt 
    // but verification can be done only with the secret_password
    try{
    const user =await verify(header,c.env.JWT_SECRET)
    if(user){
        // we can also do bad solution @ts-ignore
        c.set("userId",user.id)
        // context or c doesn't have userId as a key , hence we again need to modify the Bindings
     await next()
    }else{
      c.status(403)
      return c.json({message:"unauthorized"})
    }
  }catch(e){
    c.status(403);
    return c.json({message:"error"})
  }
  })

blogRouter.post("/", async (c) => {
  
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"Inputs not correct"
    })
  }
//   we can modify the context c which we done in the default middleware
const userId = c.get("userId")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId
      // the extraction will occur in the middleware
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const {success} = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"Inputs not correct"
    })
  }


  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
      // the extraction will occur in the middleware
    },
  });

  return c.json({
    id: blog.id,
  });
});

// Ideally we should add pagination meaning that we should not add all the post , suppose we return only 10 and user ask for more when it scroll
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany({
    select:{
      content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
    }
  });
  //getting all the blogs
  return c.json({
    blogs
  })
});
// we move this endpoint up so that control reaches this endpoint before reaching the id endpoint so that control misunderstand the bulk rrequest as the id request


blogRouter.get("/:id", async (c) => {
//  body make no sense in get request
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    // must be wrapped because this request can fail due to multiple reasons
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
            select: {
                name: true
            }
        }
    }
    });
    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog post",
    });
  }
});

