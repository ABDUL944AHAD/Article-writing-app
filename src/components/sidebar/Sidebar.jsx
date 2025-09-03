import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css"; // optional if you want custom CSS

const Sidebar = () => {
    const location = useLocation(); // to highlight active link

    const links = [
        { name: "My Articles", path: "/dashboard/my-articles" },
        { name: "Create Article", path: "/dashboard/create-article" },
        // add more links if needed
    ];

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Dashboard</h2>
            <ul className="sidebar-links">
                {links.map((link) => (
                    <li
                        key={link.name}
                        className={location.pathname === link.path ? "active" : ""}
                    >
                        <Link to={link.path}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
