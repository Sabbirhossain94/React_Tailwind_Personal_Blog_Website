import { useState, useEffect } from "react";
import supabase from "../services/global/supabaseClient";

const useSession = () => {
    const [session, setSession] = useState(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);
    return { session }
}

export default useSession