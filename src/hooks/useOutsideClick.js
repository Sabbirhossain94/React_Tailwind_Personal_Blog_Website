import { useEffect, useState, useRef } from "react";

const useOutsideClick = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowDropDown(false);
            }
        };

        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return { ref, showDropDown, setShowDropDown };
};

export default useOutsideClick;