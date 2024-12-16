import { useState, useEffect } from "react";
import { getAllUsers } from "../services/users/getUsers";


const useAllProfiles = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchAllUsers = async () => {
            getAllUsers(setUsers, setLoading)
        }
        fetchAllUsers();

    }, [])

    return { loading, users }
}

export default useAllProfiles