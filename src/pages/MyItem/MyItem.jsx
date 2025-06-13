import React, { useContext, useEffect, useState } from 'react';
import { CircleAlert, Clock, Eye, Pencil, Sprout, Trash2 } from 'lucide-react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../Provider/AuthContext';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import CountUp from 'react-countup';
import { Helmet } from 'react-helmet';

const MyItem = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);

  const [myItems, setMyItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  const [freshCount, setFreshCount] = useState(0);
  const [expiringCount, setExpiringCount] = useState(0);
  const [criticalCount, setCriticalCount] = useState(0);

  const fetchItems = async () => {
    setLoading(true);
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

      setMyItems(updatedItems);
      setFreshCount(updatedItems.filter(i => i.status.colorClass.includes('green')).length);
      setExpiringCount(updatedItems.filter(i => i.status.colorClass.includes('orange')).length);
      setCriticalCount(updatedItems.filter(i => i.status.colorClass.includes('red')).length);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (user?.email) fetchItems();
  }, [axiosSecure, user?.email]);

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
            await fetchItems();
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

  const handleEditClick = (item) => {
    setSelectedItem({ ...item, expiryDate: item.expiryDate?.split("T")[0] || "" });
    document.getElementById('update_modal').showModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const { _id, ...updateData } = selectedItem;

      const res = await axiosSecure.put(`/food/update/${_id}`, {
        ...updateData,
        foodCreatorEmail: user.email,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire('Success!', 'Food item updated successfully!', 'success');
        document.getElementById('update_modal').close();
        fetchItems();
      } else {
        Swal.fire('Error!', 'Update failed or no changes made.', 'error');
      }
    } catch (error) {
      console.error('Error updating:', error);
      Swal.fire('Error!', 'Something went wrong during update.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const SummaryCard = ({ icon, color, title, count }) => (
    <div className={`bg-${color}-100 border border-${color}-300 p-5 rounded-2xl shadow-sm flex items-center gap-4`}>
      <div className={`w-12 h-12 rounded-full bg-${color}-200 text-${color}-700 flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className={`text-${color}-700 text-sm font-medium`}>{title}</p>
        <p className={`text-3xl font-extrabold text-${color}-700`}><CountUp end={count} duration={3} /></p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
        <p className="text-lg font-semibold text-base-content">Loading your data...</p>
      </div>
    );
  }


  return (
    <>
      <Helmet>
        <title>FreshNTrack | My Item</title>
      </Helmet>
      <div className="p-6 bg-base-100 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-success tracking-tight">
            My Food Vault
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Smart inventory management for {user?.displayName || 'You'}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <SummaryCard icon={<Sprout size={24} />} color="green" title="Fresh Items" count={freshCount} />
          <SummaryCard icon={<Clock size={24} />} color="orange" title="Expiring Soon" count={expiringCount} />
          <SummaryCard icon={<CircleAlert size={24} />} color="red" title="Critical" count={criticalCount} />
        </div>

        {/* Table */}
        <div className="bg-base-100 rounded-2xl shadow overflow-hidden border border-base-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-violet-500 text-white p-5 rounded-t-2xl gap-4 sm:gap-0">
            <h2 className="text-xl font-semibold">Food Inventory ({myItems.length} items)</h2>
            <button className="bg-blue-500 hover:bg-blue-600 text-sm px-4 py-2 rounded-full shadow">
              {user.displayName}’s Collection
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-base-200 text-base-content/80">
                <tr>
                  <th className="p-4">ITEM</th>
                  <th className="p-4">CATEGORY</th>
                  <th className="p-4">QUANTITY</th>
                  <th className="p-4">EXPIRY</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-base-100">
                {myItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      No items added yet.{' '}
                      <Link to="/add-food" className="text-blue-500 hover:underline">Add your first item</Link>
                    </td>
                  </tr>
                ) : (
                  myItems.map((item) => (
                    <tr key={item._id} className="border-t hover:bg-base-300 transition">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={item.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'}
                          className="w-12 h-12 rounded-full object-cover shadow"
                          alt={item.title}
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
                        <Link to={`/food/${item._id}`}>
                          <button className="bg-violet-500 hover:bg-violet-600 p-2 rounded-full text-white cursor-pointer">
                            <Eye size={16} />
                          </button>
                        </Link>
                        <button onClick={() => handleEditClick(item)} className="bg-violet-500 hover:bg-violet-600 p-2 rounded-full text-white cursor-pointer">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600 p-2 rounded-full text-white cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Modal */}
        <dialog id="update_modal" className="modal">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-lg mb-4">Update Food Item</h3>
            {selectedItem && (
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="Image URL"
                  className="input input-bordered w-full"
                  value={selectedItem.imageUrl}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="input input-bordered w-full"
                  value={selectedItem.title}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="category"
                  className="select select-bordered w-full"
                  value={selectedItem.category}
                  onChange={handleInputChange}
                  required
                >
                  <option disabled value="">Select Category</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Meat">Meat</option>
                  <option value="Snacks">Snacks</option>
                </select>
                <input
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  className="input input-bordered w-full"
                  value={selectedItem.quantity}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="date"
                  name="expiryDate"
                  className="input input-bordered w-full"
                  value={selectedItem.expiryDate}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full"
                  placeholder="Description"
                  value={selectedItem.description}
                  onChange={handleInputChange}
                />
                <div className="modal-action">
                  <button type="submit" className="btn btn-success text-white" disabled={isUpdating}>
                    {isUpdating ? 'Updating...' : 'Update'}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => document.getElementById('update_modal').close()}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </dialog>
      </div>
    </>
  );
};

export default MyItem;
