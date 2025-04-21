import React, { useState, useEffect } from "react";
import "./BackToTop.css"; // Import CSS

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button className={`back-to-top ${visible ? "show" : ""}`} onClick={scrollToTop}>
            ⬆
        </button>
    );
};

export default BackToTop;
