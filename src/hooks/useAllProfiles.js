import { useState, useEffect } from "react";
import { getAllUsers } from "../services/users/getUsers";

const useAllProfiles = () => {
    const [users, setUsers] = useState({
        all: [],
        sinceLastMonth: null
    });
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