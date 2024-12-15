import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../services/profile/getProfile"

const ProfileContext = createContext();

export const ProfileProvider = ({ children, session, userRole }) => {
    const [profile, setProfile] = useState({ username: "", avatarUrl: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            await getProfile(session, setProfile, setLoading);
            setLoading(false);
        };

        fetchProfile();
    }, [userRole]);

    return (
        <ProfileContext.Provider value={{ session, profile, setProfile, loading, userRole }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);