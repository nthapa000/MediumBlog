import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10">
        <div>
            Medium
        </div>
        <div>
            <Avatar name="Nishant"></Avatar>
            {/* has name of user , recoil comes into picture where we store user info  */}
        </div>
    </div>
}