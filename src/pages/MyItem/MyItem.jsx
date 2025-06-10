import React from 'react';
import { CircleAlert, Clock, Pencil, Sprout, Trash2 } from 'lucide-react';

const items = [
    {
        id: 1,
        name: 'Fresh Apples',
        category: 'Fruits',
        quantity: '2 kg',
        expiry: '2024-06-15',
        image: 'https://i.ibb.co/SmgGvKX/apples.jpg',
        status: { text: '10 days left', colorClass: 'bg-green-100 text-green-700' },
    },
    {
        id: 2,
        name: 'Whole Milk',
        category: 'Dairy',
        quantity: '1 Liter',
        expiry: '2024-06-07',
        image: 'https://i.ibb.co/kqDF6Ff/milk.jpg',
        status: { text: '2 days left', colorClass: 'bg-orange-100 text-orange-700' },
    },
];

const MyItem = () => {
    return (
        <div className="p-6 bg-base-100 min-h-screen">
            {/* Header */}
            <div className="text-center mb-8 px-2 sm:px-0">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-success tracking-tight">
                    My Food Vault
                </h1>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">Smart inventory management for John Doe</p>
            </div>

            {/* Dashboard Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 px-2 sm:px-0">
                {/* Fresh Items */}
                <div className="bg-success border border-green-300 p-5 rounded-2xl shadow-sm flex items-center gap-4 transition-transform transform hover:scale-[1.02]">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 shrink-0">
                        <Sprout size={24} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium truncate">Fresh Items</p>
                        <p className="text-3xl font-extrabold text-green-700">1</p>
                    </div>
                </div>

                {/* Expiring Soon */}
                <div className="bg-orange-400 border border-orange-300 p-5 rounded-2xl shadow-sm flex items-center gap-4 transition-transform transform hover:scale-[1.02] ">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-700 shrink-0">
                        <Clock size={24} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium truncate">Expiring Soon</p>
                        <p className="text-3xl font-extrabold text-orange-700">3</p>
                    </div>
                </div>

                {/* Critical */}
                <div className="bg-red-500 border border-red-300 p-5 rounded-2xl shadow-sm flex items-center gap-4 transition-transform transform hover:scale-[1.02] ">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-700 shrink-0">
                        <CircleAlert size={24} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium truncate">Critical</p>
                        <p className="text-3xl font-extrabold text-red-800">1</p>
                    </div>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-base-100 rounded-2xl shadow overflow-hidden border border-base-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-violet-500 text-white p-5 rounded-t-2xl gap-4 sm:gap-0">
                    <h2 className="text-xl font-semibold flex items-center gap-2 whitespace-nowrap">
                        Food Inventory ({items.length} items)
                    </h2>
                    <button className="bg-blue-500 hover:bg-blue-600 text-sm px-4 py-2 rounded-full shadow font-medium whitespace-nowrap">
                        Utchas’s Collection
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-base-200 text-base-content/80">
                            <tr>
                                <th className="p-3 sm:p-5 text-left font-semibold whitespace-nowrap">ITEM</th>
                                <th className="p-3 sm:p-5 text-left font-semibold whitespace-nowrap">CATEGORY</th>
                                <th className="p-3 sm:p-5 text-left font-semibold whitespace-nowrap">QUANTITY</th>
                                <th className="p-3 sm:p-5 text-left font-semibold whitespace-nowrap">EXPIRY DATE</th>
                                <th className="p-3 sm:p-5 text-left font-semibold whitespace-nowrap">STATUS</th>
                                <th className="p-3 sm:p-5 text-left font-semibold whitespace-nowrap">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="bg-base-100 text-base-content">
                            {items.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t border-base-300 hover:bg-base-300 transition-colors"
                                >
                                    <td className="p-3 sm:p-5 flex items-center gap-3 sm:gap-4 whitespace-normal">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow flex-shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <p className="font-semibold truncate">{item.name}</p>
                                            <p className="text-xs text-gray-500 truncate">Fresh & Natural</p>
                                        </div>
                                    </td>
                                    <td className="p-3 sm:p-5 whitespace-nowrap">
                                        <span className="text-xs bg-base-300 px-2 py-1 rounded-full">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="p-3 sm:p-5 whitespace-nowrap">{item.quantity}</td>
                                    <td className="p-3 sm:p-5 whitespace-nowrap">{item.expiry}</td>
                                    <td className="p-3 sm:p-5 whitespace-nowrap">
                                        <span
                                            className={`text-xs font-semibold px-3 py-1 rounded-full shadow ${item.status.colorClass}`}
                                        >
                                            {item.status.text}
                                        </span>
                                    </td>
                                    <td className="p-3 sm:p-5 flex gap-2 whitespace-nowrap">
                                        <button className="bg-violet-500 hover:bg-violet-600 p-2 rounded-full text-white shadow flex items-center justify-center">
                                            <Pencil size={16} />
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-600 p-2 rounded-full text-white shadow flex items-center justify-center">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyItem;
