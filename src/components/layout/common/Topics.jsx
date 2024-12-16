import React from 'react'
import { topics } from "../../../helpers/topics"
import { useNavigate } from 'react-router-dom'

function Topics({ setTopics, resetPagination }) {
    const navigate = useNavigate();

    const handleTopic = (topic) => {
        setTopics(topic);
        resetPagination()
        navigate(`/topics/${topic}`)
    }

    return (
        <div className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 p-4 flex flex-col justify-start">
            <div className="text-2xl dark:text-gray-200 font-semibold">Topics</div>
            <ul className="mt-4 gap-4 flex flex-wrap items-center">
                {topics.map((topic, index) => (
                    <li key={index} onClick={() => handleTopic(topic)} className="bg-zinc-200 bg-blue-500/10 hover:bg-blue-500/20 dark:bg-teal-500/10 text-blue-500 dark:text-teal-500 text-sm px-2 py-1 cursor-pointer dark:hover:bg-teal-500/30 transition duration-300">
                        {topic}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Topics