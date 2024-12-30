import { useState, useEffect } from "react";
import supabase from "../services/global/supabaseClient";
import useAllProfiles from "./useAllProfiles";

const useSession = () => {
    const [session, setSession] = useState(() => {
        const storedSession = localStorage.getItem('supabase.auth.token');
        return storedSession ? JSON.parse(storedSession)?.currentSession : null;
    });
    const [loading, setLoading] = useState(!session);
    const [userRole, setUserRole] = useState(null)
    const { users } = useAllProfiles();

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data?.session || null);
            setLoading(false);
        };

        if (!session) {
            fetchSession();
        } else {
            const userId = session?.user?.id;

            const user = users?.all?.find(user => user.id === userId);

            if (user) {
                setUserRole(user.role);
            }
        }

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setLoading(false);
                const userId = session?.user?.id;
                const user = users?.all?.find(user => user.id === userId);
                if (user) {
                    setUserRole(user.role);
                } else {
                    setUserRole(null);
                }
            }
        );

        return () => listener?.subscription.unsubscribe();
    }, [users]);

    return { loading, session, userRole }
}

export default useSession