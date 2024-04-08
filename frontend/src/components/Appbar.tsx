import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link className="flex flex-col justify-center cursor-pointer" to={'/'}>
        <div >
            Medium
        </div>
        </Link >
        <div>
            <Avatar size={"big"} name="Nishant"></Avatar>
            {/* has name of user , recoil comes into picture where we store user info  */}
        </div>
        
        
    </div>
}