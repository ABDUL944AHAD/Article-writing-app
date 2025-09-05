// pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/StatsCard/StatsCard";
import RecentActivities from "../components/recentActivites/RecentActivites";
import AllArticles from "./AllArticles/AllArticles";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "./Dashboard.css";
import { API_BASE_URL } from "../config/Config"; 

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const Dashboard = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [stats, setStats] = useState({
        totalArticles: 0,
        newArticles: 0,
        activeUsers: 0,
    });
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (role === "admin") {
            axios
                .get(`${API_BASE_URL}/admin/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    console.log("📊 Stats:", res.data);
                    setStats(res.data);
                })
                .catch((err) => console.error("Stats error:", err));
        }
    }, [role, token]);

    useEffect(() => {
        const url =
            role === "admin"
                ? `${API_BASE_URL}/admin/articles`
                : `${API_BASE_URL}/articles/my`;
        axios
            .get(url, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const data = role === "admin" ? res.data : res.data.data;
                console.log("📝 Articles:", data);
                setArticles(data);
            })
            .catch((err) => console.error("Articles error:", err));
    }, [role, token]);

    // ---- Chart Data ----
    const articlesByMonth = Object.values(
        articles.reduce((acc, a) => {
            const month = new Date(a.createdAt).toLocaleString("default", {
                month: "short",
            });
            acc[month] = acc[month] || { month, count: 0 };
            acc[month].count++;
            return acc;
        }, {})
    );

    const articlesByCategory = Object.values(
        articles.reduce((acc, a) => {
            const cat = a.category || "Other";
            acc[cat] = acc[cat] || { name: cat, value: 0 };
            acc[cat].value++;
            return acc;
        }, {})
    );

    const barData = {
        labels: articlesByMonth.map((d) => d.month),
        datasets: [
            {
                label: "Articles",
                data: articlesByMonth.map((d) => d.count),
                backgroundColor: "#2563EB",
                borderRadius: 6,
            },
        ],
    };

    const pieData = {
        labels: articlesByCategory.map((d) => d.name),
        datasets: [
            {
                label: "Articles by Category",
                data: articlesByCategory.map((d) => d.value),
                backgroundColor: ["#2563EB", "#FF3B7F", "#10B981", "#F59E0B", "#6B7280"],
                borderWidth: 1,
            },
        ],
    };

    const activities = articles.map(a => ({
        description: `Article "${a.articleName}" was created in category "${a.category}"`,
        timestamp: a.createdAt,
    }));

    return (
        <>
            <Navbar sticky={true} transparent={true} />
            <Sidebar />
            <div className="dashboard">
                <h1>Dashboard ({role})</h1>

                {role === "admin" && (
                    <div className="stats-row">
                        <StatCard title="Total Articles" value={stats.totalArticles} />
                        <StatCard title="New Articles" value={stats.newArticles} />
                        <StatCard title="Active Users" value={stats.activeUsers} />
                    </div>
                )}

                <div className="charts">
                    <div className="chart-container">
                        <h2>Articles per Month</h2>
                        <div className="chart-wrapper">
                            <Bar
                                data={barData}
                                options={{
                                    responsive: true,
                                    plugins: { legend: { display: false } },
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>
                    </div>

                    <div className="chart-container">
                        <h2>Articles by Category</h2>
                        <div className="chart-wrapper">
                            <Pie
                                data={pieData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "top",
                                            labels: { boxWidth: 12, padding: 15 }
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="dashboard-activities" id="recent-activities">
                    <RecentActivities activities={activities} limit={6} />
                </div>

                <div className="dashboard-articles" id="all-articles">
                    <AllArticles role={role} token={token} />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
