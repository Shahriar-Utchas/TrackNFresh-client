import React, { useContext, useEffect, useState } from 'react';
import { CircleAlert, Clock, Pencil, Sprout, Trash2 } from 'lucide-react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../Provider/AuthContext';
import { Link } from 'react-router';
import Swal from 'sweetalert2';


const MyItem = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = useContext(AuthContext);
    const [myItems, setMyItems] = useState([]);

    const [freshCount, setFreshCount] = useState(0);
    const [expiringCount, setExpiringCount] = useState(0);
    const [criticalCount, setCriticalCount] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const fetchItems = async () => {
            try {
                const res = await axiosSecure.get(`/food/my-items?email=${user?.email}`);
                const items = res.data;

                const today = new Date();
                const updatedItems = items.map((item) => {
                    const expiry = new Date(item.expiryDate);
                    const timeDiff = expiry.getTime() - today.getTime();
                    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    let status = { text: '', colorClass: '' };
                    if (daysLeft > 5) {
                        status = { text: `${daysLeft} days left`, colorClass: 'bg-green-100 text-green-700' };
                    } else if (daysLeft > 0) {
                        status = { text: `${daysLeft} days left`, colorClass: 'bg-orange-100 text-orange-700' };
                    } else {
                        status = { text: `Expired`, colorClass: 'bg-red-100 text-red-700' };
                    }

                    return { ...item, status };
                });

                setFreshCount(updatedItems.filter(i => i.status.colorClass.includes('green')).length);
                setExpiringCount(updatedItems.filter(i => i.status.colorClass.includes('orange')).length);
                setCriticalCount(updatedItems.filter(i => i.status.colorClass.includes('red')).length);

                setMyItems(updatedItems);
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        };

        if (user?.email) fetchItems();
    }, [axiosSecure, user?.email]);

    const SummaryCard = ({ icon, color, title, count }) => (
        <div className={`bg-${color}-100 border border-${color}-300 p-5 rounded-2xl shadow-sm flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-full bg-${color}-200 text-${color}-700 flex items-center justify-center`}>
                {icon}
            </div>
            <div>
                <p className={`text-${color}-700 text-sm font-medium`}>{title}</p>
                <p className={`text-3xl font-extrabold text-${color}-700`}>{count}</p>
            </div>
        </div>
    );

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/food/delete/${id}`);
                    if (res.data.deletedCount > 0) {
                        const updatedItems = myItems.filter(item => item._id !== id);

                        // Recalculate counts
                        setFreshCount(updatedItems.filter(i => i.status.colorClass.includes('green')).length);
                        setExpiringCount(updatedItems.filter(i => i.status.colorClass.includes('orange')).length);
                        setCriticalCount(updatedItems.filter(i => i.status.colorClass.includes('red')).length);

                        setMyItems(updatedItems);

                        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
                    } else {
                        Swal.fire('Error!', 'Failed to delete the item.', 'error');
                    }
                } catch (error) {
                    console.error('Failed to delete item:', error);
                    Swal.fire('Error!', 'Failed to delete the item.', 'error');
                }
            }
        });
    };


    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-success tracking-tight">
                    My Food Vault
                </h1>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    Smart inventory management for {user?.displayName || 'You'}
                </p>
            </div>

            {/* Dashboard Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <SummaryCard icon={<Sprout size={24} />} color="green" title="Fresh Items" count={freshCount} />
                <SummaryCard icon={<Clock size={24} />} color="orange" title="Expiring Soon" count={expiringCount} />
                <SummaryCard icon={<CircleAlert size={24} />} color="red" title="Critical" count={criticalCount} />
            </div>

            {/* Table */}
            <div className="bg-base-100 rounded-2xl shadow overflow-hidden border border-base-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-violet-500 text-white p-5 rounded-t-2xl gap-4 sm:gap-0">
                    <h2 className="text-xl font-semibold">
                        Food Inventory ({myItems.length} items)
                    </h2>
                    <button className="bg-blue-500 hover:bg-blue-600 text-sm px-4 py-2 rounded-full shadow">
                        {user.displayName}’s Collection
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-base-200 text-base-content/80">
                            <tr>
                                <th className="p-4 text-left font-semibold">ITEM</th>
                                <th className="p-4 text-left font-semibold">CATEGORY</th>
                                <th className="p-4 text-left font-semibold">QUANTITY</th>
                                <th className="p-4 text-left font-semibold">EXPIRY DATE</th>
                                <th className="p-4 text-left font-semibold">STATUS</th>
                                <th className="p-4 text-left font-semibold">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="bg-base-100 text-base-content">
                            {myItems.map((item) => (
                                <tr key={item._id} className="border-t border-base-300 hover:bg-base-300 transition">
                                    <td className="p-4 flex items-center gap-3">
                                        <img
                                            src={item.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'}
                                            alt={item.title}
                                            className="w-12 h-12 rounded-full object-cover shadow"
                                        />
                                        <div>
                                            <p className="font-semibold">{item.title}</p>
                                            <p className="text-xs text-gray-500">{item.description}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">{item.category}</td>
                                    <td className="p-4">{item.quantity}</td>
                                    <td className="p-4">{item.expiryDate}</td>
                                    <td className="p-4">
                                        <span className={`text-xs px-3 py-1 rounded-full shadow ${item.status.colorClass}`}>
                                            {item.status.text}
                                        </span>
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        <Link to={`/food/details/${item._id}`} >
                                            <button className="bg-violet-500 hover:bg-violet-600 p-2 rounded-full text-white shadow cursor-pointer">
                                                <Pencil size={16} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="bg-red-500 hover:bg-red-600 p-2 rounded-full text-white shadow cursor-pointer">
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
