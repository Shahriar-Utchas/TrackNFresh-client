import React from "react";
import { CalendarDays, Eye, AlertTriangle, Hourglass, AlarmClock } from "lucide-react";

const items = [
    {
        title: "Organic Milk",
        category: "Dairy",
        quantity: "1 Liter",
        expires: "2024-06-07",
        expired: true,
        image:
            "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Fresh Strawberries",
        category: "Fruits",
        quantity: "500g",
        expires: "2024-06-08",
        expired: true,
        image:
            "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Whole Wheat Bread",
        category: "Bakery",
        quantity: "1 Loaf",
        expires: "2024-06-09",
        expired: true,
        image:
            "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80",
    },
];

const ExpiringItem = () => {
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
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-base border border-gray-300 rounded-xl shadow-lg overflow-hidden relative"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="h-48 w-full object-cover"
                        />

                        {item.expired && (
                            <div className="absolute top-3 right-3 bg-red-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                <AlertTriangle className="w-4 h-4" /> 3 days left
                            </div>
                        )}

                        <div className="text-left p-5">
                            <div className="flex items-center justify-between mb-1">
                                <h2 className="text-xl font-semibold ">
                                    {item.title}
                                </h2>
                                <span className="text-sm bg-success text-secondary-foreground px-2 py-0.5 rounded-full">
                                    {item.category}
                                </span>
                            </div>
                            <p className="text-sm ">
                                <span className="font-medium ">Quantity:</span> {item.quantity}
                            </p>
                            <p className="text-sm  mb-4 flex items-center">
                                <CalendarDays className="w-4 h-4 mr-2" />
                                <span>
                                    <span className="font-medium ">Expires:</span>{" "}
                                    <span className="text-error font-semibold">{item.expires}</span>
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