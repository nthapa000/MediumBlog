import { Hono } from "hono";
export const blogRouter = new Hono<{
    // passing the generics 
      Bindings: {
        DATABASE_URL: string;
        JWT_SECRET:string;
      }
  }>();

blogRouter.use('/api/v1/blog/*', async (c, next) => {
    await next()
  })
  
  blogRouter.post('/api/v1/blog', (c) => {
    return c.text('post blog!')
  })
  blogRouter.put('/api/v1/blog', (c) => {
    return c.text('Hello Hono!')
  })
  blogRouter.get('/api/v1/blog/:id', (c) => {
    return c.text('Hello Hono!')
  })
  