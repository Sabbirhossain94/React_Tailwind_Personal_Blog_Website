import React from 'react'
import { topics } from "../../../helpers/topics"

function Topics({ blogsByTopic }) {
    return (
        <div className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 p-4 flex flex-col justify-start">
            <div className="text-2xl dark:text-gray-200 font-semibold">Topics</div>
            <ul className="mt-4 space-y-3">
                {topics.map((topic, index) => (
                    <li key={index} onClick={() => blogsByTopic(topic)} className="cursor-pointer hover:text-blue-500 dark:hover:text-teal-500 transition duration-300 text-[#666] dark:text-gray-400">
                        {topic}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Topics