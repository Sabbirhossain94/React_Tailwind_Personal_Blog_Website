import { useState, useEffect } from "react";

const useDarkMode = (initialValue = false) => {
    const [dark, setDark] = useState(initialValue);

    useEffect(() => {
        if (dark) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [dark]);

    const toggleDarkMode = () => setDark((prevDark) => !prevDark);

    return { dark, toggleDarkMode };
};

export default useDarkMode;