import { BsLinkedin } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { MdWork } from "react-icons/md";

const linkedInUri = process.env.REACT_APP_LINKEDIN_URI
const githubUri = process.env.REACT_APP_GITHUB_URI
const portfolioUri = process.env.REACT_APP_PORTFOLIO_URI

export const contactItems = [
    {
        link: linkedInUri,
        icon: <BsLinkedin className="hover:text-blue-500 dark:hover:text-teal-500 transition duration-300" />

    },
    {
        link: githubUri,
        icon: <AiFillGithub className="hover:text-blue-500 dark:hover:text-teal-500 transition duration-300" />

    },
    {
        link: portfolioUri,
        icon: <MdWork className="hover:text-blue-500 dark:hover:text-teal-500 transition duration-300" />

    },
   
]