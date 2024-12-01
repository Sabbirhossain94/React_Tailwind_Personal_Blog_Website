import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../services/profile/getProfile"

const ProfileContext = createContext();

export const ProfileProvider = ({ children, session }) => {
    const [profile, setProfile] = useState({ username: "", avatarUrl: "" });
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            await getProfile(session, setProfile, setLoading);
            setLoading(false);
        };

        fetchProfile();
    }, []);

    return (
        <ProfileContext.Provider value={{ session, profile, setProfile, loading }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);