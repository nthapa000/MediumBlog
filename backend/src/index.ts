import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';


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

// dynamic parameter

export default app
