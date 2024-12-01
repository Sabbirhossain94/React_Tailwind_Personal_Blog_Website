import { useState, useEffect } from "react";
import supabase from "../services/global/supabaseClient";

const useSession = () => {
    const [session, setSession] = useState(() => {
        const storedSession = localStorage.getItem('supabase.auth.token');
        return storedSession ? JSON.parse(storedSession)?.currentSession : null;
    });
    const [loading, setLoading] = useState(!session);

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data?.session || null);
            setLoading(false);
        };

        if (!session) {
            fetchSession();
        }

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setLoading(false);
            }
        );

        return () => listener?.subscription.unsubscribe();
    }, []);

    return { loading, session }
}

export default useSession