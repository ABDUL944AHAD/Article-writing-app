import React from "react";
import { Link } from "react-scroll";
import "./Sidebar.css";

const Sidebar = () => {
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
    };


    return (
        <div className="sidebar">
            <ul className="sidebar-links">
                <li>
                    <Link
                        to="recent-activities"
                        smooth={true}
                        duration={600}
                        offset={-100}
                        activeClass="active-link"
                        spy={true}
                    >
                        Recent Activities
                    </Link>
                </li>
                <li>
                    <Link
                        to="all-articles"
                        smooth={true}
                        duration={600}
                        offset={-100}
                        activeClass="active-link"
                        spy={true}
                    >
                        All Articles
                    </Link>
                </li>
                <li>
                    <Link
                        to="user-management"
                        smooth={true}
                        duration={600}
                        offset={-80}
                        activeClass="active-link"
                        spy={true}
                    >
                        User Management
                    </Link>
                </li>
            </ul>

            {/* Logout Section */}
            <div className="sidebar-logout">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;

