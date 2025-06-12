import React, { useEffect, useState, useContext } from "react";
import { CalendarDays, TimerOff, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const ExpiredItem = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();

    const [expiredItems, setExpiredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const fetchExpiredItems = () => {
        setLoading(true);
        axiosSecure
            .get("/food/expired")
            .then((res) => {
                setExpiredItems(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching expired items:", err);
                setError("Failed to load expired items.");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchExpiredItems();
    }, []);

    const handleDispose = async (itemId, creatorEmail) => {
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Unauthorized",
                text: "Please login to dispose items.",
            }).then(() => navigate("/login"));
            return;
        }

        if (user.email !== creatorEmail) {
            Swal.fire({
                icon: "error",
                title: "Access Denied",
                text: "You can only dispose items you created.",
            });
            return;
        }

        try {
            const res = await axiosSecure.delete(`/food/delete/${itemId}`);

            if (res.data.deletedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Item Disposed",
                    text: "Item deleted successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });

                setExpiredItems((prev) => prev.filter((item) => item._id !== itemId));
            }
        } catch (err) {
            console.error("Delete failed:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Try again later.",
            });
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = expiredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(expiredItems.length / itemsPerPage);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-600 mt-20">{error}</div>;
    }

    return (
        <div className="bg-gradient-to-b from-base-100 to-base-200 py-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-red-600 mb-2 flex items-center justify-center gap-2">
                    <TimerOff className="w-8 h-8 animate-pulse" /> Past Expiry
                </h1>
                <p className="text-lg text-base-content">
                    Time to say goodbye - dispose of these items safely
                </p>
            </div>

            {expiredItems.length === 0 ? (
                <div className="text-center text-gray-500 py-16 px-4">
                    <h2 className="text-2xl font-semibold">No expired items found</h2>
                    <p className="text-gray-500 mt-2">You're all good! Nothing has expired yet.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto">
                        {currentItems.map((item, index) => {
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
                                            src={
                                                item.imageUrl ||
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                                            }
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
                                            <button
                                                onClick={() => handleDispose(item._id, item.foodCreatorEmail)}
                                                className="w-full bg-red-500 text-error-content py-1 rounded-lg text-sm font-semibold hover:bg-red-500/90 transition duration-300 cursor-pointer"
                                            >
                                                Mark as Disposed
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-10 gap-2 flex-wrap">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 rounded-md text-sm font-semibold border ${
                                        currentPage === index + 1
                                            ? "bg-red-600 text-white border-red-600"
                                            : "bg-white text-red-600 border-red-400 hover:bg-red-100"
                                    } transition`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ExpiredItem;
