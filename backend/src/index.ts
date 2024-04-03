import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'

const app = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET:string
    }
}>()

app.post('/api/v1/signup',async (c) => {
  // c is basically context has all our request and response and environment variable etc
  // specify our env variable type
  // we can't give environment variable outside 
  // we don't have global access in serverless
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
// .env  accessed from the wrangler.toml
// Cloudflare picks environment variable from wrangler.toml

// this is how we get the body in Hono
// we have to await when it is converted to json
  const body = await c.req.json();
  const user = await prisma.user.create({
    data:{
      email:body.email,
      password:body.email
    },
  })
  const token =await sign({id:user.id},c.env.JWT_SECRET)
  return c.json({jwt: token})
})

app.post('/api/v1/signin', async (c) => {
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

app.post('/api/v1/blog', (c) => {
  return c.text('post blog!')
})
app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})
// dynamic parameter

export default app
