import { Hono } from 'hono'

const app = new Hono()

app.post('/api/v1/signup', (c) => {
  return c.text('Sign up!')
})
app.post('/api/v1/signin', (c) => {
  return c.text('Sign in!')
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
