import { AiOutlineUser } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";

export const dashboardItems = [
    {
        label: "Dashboard",
        path: "main",
        icon: <MdDashboard />,
        roles: ["admin"]
    },
    {
        label: "Profile",
        path: "profile",
        icon: <AiOutlineUser />,
        roles: ["admin","user"]

    },
    {
        label: "Users",
        path: "users",
        icon: <FaUsers />,
        roles: ["admin"]

    },
    {
        label: "Posts",
        path: "posts",
        icon: <HiOutlineChatBubbleLeft />,
        roles: ["admin"]


    },
    {
        label: "Sign out",
        path: "/",
        icon: <CiLogout />,
        roles: ["admin", "user"]
    }
]