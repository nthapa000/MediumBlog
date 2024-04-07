import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"


export const Blogs = () =>{
    // store it in state
    // store it directly
    // store it into context variable 
    // create you own custom hook called useBlogs
    const {loading,blogs} = useBlogs();
    // Skeleton before something loads
    if(loading || !blogs){
        return <div>
            loading...
        </div>
    }

    return <div >
     <Appbar />
     <div className="flex justify-center">
     <div >
        {blogs.map(blog => <BlogCard
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"08th Feb 2002"}
        />)}
        
    </div>
    </div>
    </div>
}

