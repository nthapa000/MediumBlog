import { BlogCard } from "../components/BlogCard"

export const Blogs = () =>{
    return <div className="flex justify-center">
     <div className="max-w-xl">
        <BlogCard
            authorName={"Nishant thapa"}
            title={"title of the blog is the life of Nishant Thapa and how he became the biggest realstate trader "}
            content={"Content of the blog is how to be fit in 100 days, life of a monk and how to be stronger by each days"}
            publishedDate={"08th Feb 2002"}
        />
        <BlogCard
            authorName={"Nishant thapa"}
            title={"title of the blog is the life of Nishant Thapa and how he became the biggest realstate trader "}
            content={"Content of the blog is how to be fit in 100 days, life of a monk and how to be stronger by each days"}
            publishedDate={"08th Feb 2002"}
        />
        <BlogCard
            authorName={"Nishant thapa"}
            title={"title of the blog is the life of Nishant Thapa and how he became the biggest realstate trader "}
            content={"Content of the blog is how to be fit in 100 days, life of a monk and how to be stronger by each days"}
            publishedDate={"08th Feb 2002"}
        />
    </div>
    </div>
}

