// // import { useState, useEffect } from "react";
// // import { getProfile } from "../services/profile/getProfile";

// // const useProfile = (session) => {

// //     const [loading, setLoading] = useState(false);
// //     const [profile, setProfile] = useState({
// //         username: "",
// //         avatarUrl: ""
// //     })

// //     useEffect(() => {
// //         const fetchProfile = async () => {
// //             await getProfile(session, setProfile, setLoading);
// //         };
// //         fetchProfile();
// //     }, []);

// //     return { loading, profile, setProfile }
// // }

// // export default useProfile;

// export const useProfile = () => useContext(ProfileContext);