import React from 'react'

function AboutMe() {
    return (
        <div className="border border-zinc-300 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900/50">
            <h2 className="text-2xl dark:text-gray-200 font-semibold">About Me</h2>
            <div className="pt-6">
                <img className="rounded-md border dark:border-none" src='/me.jpg' />
            </div>
            <div className="pt-6">
                <p className="text-[#666] dark:text-gray-400">I am a Web Application Developer with professional experience in building responsive, scalable, and efficient web applications. My passion lies in crafting intuitive user interfaces that enhance user experiences while ensuring high performance and maintainability. I am continually learning new technologies and improving my skills in web development, with a focus on delivering high-quality user experiences. I thrive in collaborative environments and am excited about contributing to innovative projects.</p>
            </div>
        </div>
    )
}

export default AboutMe