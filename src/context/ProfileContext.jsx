import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getProfile } from "../services/profile/getProfile"

const ProfileContext = createContext();

export const ProfileProvider = ({ children, session, userRole }) => {
    const [profile, setProfile] = useState({ username: "", avatarUrl: "" });
    const [loading, setLoading] = useState(false);
    const [profileLoaded, setProfileLoaded] = useState(false);

    const fetchProfile = useCallback(async () => {
        if (session && !profileLoaded) {
            setProfileLoaded(true);
            await getProfile(session, setProfile, setLoading);
        }
    }, [session, profileLoaded]);

    useEffect(() => {
        if (!session) {
            setProfile({ username: "", avatarUrl: "" });
            setProfileLoaded(false);
        }
    }, [session]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return (
        <ProfileContext.Provider value={{ session, profile, setProfile, loading, userRole }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);