import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getProfile } from "../services/profile/getProfile"

const ProfileContext = createContext();

export const ProfileProvider = ({ children, session, userRole }) => {
    const [profile, setProfile] = useState({ username: "", avatarUrl: "" });
    const [loading, setLoading] = useState(false);

    const fetchProfile = useCallback(() => {
        getProfile(session, setProfile, setLoading);
    }, [userRole])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile]);

    return (
        <ProfileContext.Provider value={{ session, profile, setProfile, loading, userRole }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);