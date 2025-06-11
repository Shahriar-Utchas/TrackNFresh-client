import React from "react";
import { CalendarDays, Eye, Hourglass, AlertTriangle } from "lucide-react";
import { useLoaderData } from "react-router";

const ExpiringItem = () => {
    const expiringItems = useLoaderData();

    const today = new Date();

    // Calculate days left from today to expiryDate
    const daysLeft = (expiryDate) => {
        const expiry = new Date(expiryDate);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="bg-base py-10 text-center">
            <h1 className="text-4xl font-bold text-error mb-4 flex justify-center items-center gap-2">
                <Hourglass className="w-7 h-8 animate-hourglass" />
                Expiring Soon
            </h1>
            <p className="text-base-content mb-10 text-lg">
                Act fast! These items need your attention within the next 6 days
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
                {expiringItems.map((item, index) => (
                    <div
                        key={item._id || index}
                        className="bg-base border border-gray-300 rounded-xl shadow-lg overflow-hidden relative"
                    >
                        <img
                            src={item.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
                            alt={item.title}
                            className="h-48 w-full object-cover"
                        />

                        <div className="absolute top-3 right-3 bg-yellow-500 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" /> {daysLeft(item.expiryDate)} days left
                        </div>

                        <div className="text-left p-5">
                            <div className="flex items-center justify-between mb-1">
                                <h2 className="text-xl font-semibold">{item.title}</h2>
                                <span className="text-sm bg-success text-secondary-foreground px-2 py-0.5 rounded-full">
                                    {item.category}
                                </span>
                            </div>
                            <p className="text-sm">
                                <span className="font-medium">Quantity:</span> {item.quantity}
                            </p>
                            <p className="text-sm mb-4 flex items-center">
                                <CalendarDays className="w-4 h-4 mr-2" />
                                <span>
                                    <span className="font-medium">Expires:</span>{" "}
                                    <span className="text-error font-semibold">{item.expiryDate}</span>
                                </span>
                            </p>
                            <button className="w-full bg-success text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-success-content transition-colors duration-300 cursor-pointer">
                                <Eye className="w-4 h-4" /> See Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpiringItem;
