import { AiOutlineUser } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";

export const dashboardItems = [
    {
        label: "Dashboard",
        path: "",
        icon: <MdDashboard />
    },
    {
        label: "Profile",
        path: "profile",
        icon: <AiOutlineUser />
    },
    {
        label: "Users",
        path: "users",
        icon: <FaUsers />
    },
    {
        label: "Posts",
        path: "posts",
        icon: <HiOutlineChatBubbleLeft />

    },
    {
        label: "Sign out",
        path: "/",
        icon: <CiLogout />
    }
]