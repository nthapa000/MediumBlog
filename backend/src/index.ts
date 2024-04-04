import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { verify} from 'hono/jwt'

const app = new Hono<{
  // typescript doesn't understand wrangler.toml code
  // passing the generics 
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET:string;
    }
}>()

app.route("/api/v1/user",userRouter)
app.route("/api/v1/blog",blogRouter)

app.use('/api/v1/blog/*', async (c, next) => {
  // get the header
  // verify the header
  // if the header is correct , we can proceed
  // if not, we return the user a 403 status code
  const header = c.req.header("authorization") || "";
  // Bearer token(format of the token)
  // ["Bearer","token"]
  const token = header.split(" ")[1]

  const response =await verify(token,c.env.JWT_SECRET)
  if(response.id){
    next()
  }else{
    c.status(403)
    return c.json({error:"unauthorized"})
  }
})

// dynamic parameter

export default app
