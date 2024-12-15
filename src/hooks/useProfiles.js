import { useState, useEffect } from "react";
import { getAllUsers } from "../services/users/getUsers";


const useProfiles = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            getAllUsers(setUsers)
        }
        fetchAllUsers();
       
    }, [])

    return { users }
}

export default useProfiles