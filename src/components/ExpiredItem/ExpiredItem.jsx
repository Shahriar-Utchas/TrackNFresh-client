import React, { useEffect, useState } from "react";
import { CalendarDays, TimerOff, X } from "lucide-react";
import axios from "axios";
import { Link } from "react-router";

const ExpiredItem = () => {
    const [expiredItems, setExpiredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:3000/food/expired")
            .then((response) => {
                setExpiredItems(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching expired items:", err);
                setError("Failed to load expired items.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 mt-20">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-base-100 to-base-200 min-h-screen py-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-red-600 mb-2 flex items-center justify-center gap-2">
                    <TimerOff className="w-8 h-8 animate-pulse" aria-hidden="true" />
                    <span>Past Expiry</span>
                </h1>
                <p className="text-lg text-base-content">
                    Time to say goodbye - dispose of these items safely
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto">
                {expiredItems.map((item, index) => {
                    // Calculate how many days ago expired 
                    const expiredDate = new Date(item.expiryDate || item.expires);
                    const today = new Date();
                    const diffTime = Math.abs(today - expiredDate);
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    const agoText = diffDays === 0 ? "Today" : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

                    return (
                        <div
                            key={item._id || index}
                            className="bg-base-100 rounded-xl border border-error/20 shadow-md overflow-hidden relative hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={item.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
                                    alt={item.title}
                                    className="h-40 w-full object-cover opacity-80"
                                />
                                <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                    <X className="w-4 h-4" /> EXPIRED
                                </div>
                            </div>

                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-base-content">{item.title}</h2>
                                <div className="text-sm bg-red-600 text-secondary-content px-2 py-0.5 rounded-full inline-block mt-1">
                                    {item.category}
                                </div>
                                <p className="text-sm text-base-content/70 mt-2">Quantity: {item.quantity}</p>
                                <p className="text-sm text-base-content/70 mt-1 flex items-center">
                                    <CalendarDays className="w-4 h-4 mr-1" />
                                    <span className="text-red-500 font-medium">
                                        Expired: {expiredDate.toLocaleDateString()} ({agoText})
                                    </span>
                                </p>

                                <div className="mt-4 space-y-2">
                                    <Link to={`/food/${item._id}`} className="w-full text-primary-content py-1 rounded-lg text-sm font-semibold block text-center">
                                        <button className="w-full border border-red-500 text-red-500 py-1 rounded-lg text-sm font-medium hover:bg-error/10 transition duration-300 cursor-pointer">
                                            See Details
                                        </button>
                                    </Link>
                                    <button className="w-full bg-red-500 text-error-content py-1 rounded-lg text-sm font-semibold hover:bg-red-500/90 transition duration-300 cursor-pointer">
                                        Mark as Disposed
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExpiredItem;
