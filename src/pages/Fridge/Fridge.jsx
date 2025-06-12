import React, { useEffect, useState } from "react";
import { Grid3X3, List, AlarmClock, AlertTriangle, PackageCheck } from "lucide-react";
import CountUp from "react-countup";
import { Link, useLoaderData } from "react-router";

const Fridge = () => {
  const foodsData = useLoaderData();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sortOrder, setSortOrder] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getDaysLeft = (expiry) => {
    const today = new Date();
    const expiryDate = new Date(expiry);
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredItems = foodsData
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => category === "All Categories" || item.category === category)
    .sort((a, b) => {
      if (sortOrder === "asc") return new Date(a.expiryDate) - new Date(b.expiryDate);
      if (sortOrder === "desc") return new Date(b.expiryDate) - new Date(a.expiryDate);
      return 0;
    });

  const expiredCount = filteredItems.filter((item) => getDaysLeft(item.expiryDate) <= 0).length;
  const nearlyExpiredCount = filteredItems.filter((item) => {
    const days = getDaysLeft(item.expiryDate);
    return days > 0 && days <= 5;
  }).length;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sortOrder]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  const categories = Array.from(new Set(foodsData.map((item) => item.category)));

  return (
    <div className="p-6 text-base-content">
      <h1 className="text-3xl font-bold mb-1">My Fridge</h1>
      <p className="mb-4">Keep track of all your food items and their expiry dates</p>

      {/* CountUp Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-base-200 dark:bg-base-300 text-base-content rounded-2xl p-4 shadow-md flex items-center gap-4">
          <div className="bg-base-300 dark:bg-base-100 p-2 rounded-full">
            <PackageCheck className="w-6 h-6 text-base-content" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Total Items</h3>
            <p className="text-2xl font-bold">
              <CountUp end={filteredItems.length} duration={1.5} />
            </p>
          </div>
        </div>
        <div className="bg-red-100 dark:bg-red-600 text-red-800 dark:text-red-100 rounded-2xl p-4 shadow-md flex items-center gap-4">
          <div className="bg-red-200 dark:bg-red-800 p-2 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-200" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Expired Items</h3>
            <p className="text-2xl font-bold">
              <CountUp end={expiredCount} duration={1.5} />
            </p>
          </div>
        </div>

        <div className="bg-yellow-100 dark:bg-orange-400 text-yellow-800 dark:text-yellow-100 rounded-2xl p-4 shadow-md flex items-center gap-4">
          <div className="bg-yellow-200 dark:bg-yellow-800 p-2 rounded-full">
            <AlarmClock className="w-6 h-6 text-yellow-600 dark:text-yellow-200" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Expiring in 5 Days</h3>
            <p className="text-2xl font-bold">
              <CountUp end={nearlyExpiredCount} duration={1.5} />
            </p>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="bg-base-100 p-4 rounded-lg shadow flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search food items..."
          className="input input-bordered w-full sm:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-48"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="select select-bordered w-48"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">Expiry Date</option>
          <option value="asc">Soonest First</option>
          <option value="desc">Latest First</option>
        </select>

        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`btn btn-sm ${view === "grid" ? "bg-base-300" : "btn-outline"}`}
          >
            <Grid3X3 size={18} />
          </button>
          <button
            onClick={() => setView("table")}
            className={`btn btn-sm ${view === "table" ? "bg-base-300" : "btn-outline"}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      {foodsData.length === 0 ? (
        <div className="text-center opacity-60 text-lg py-20">No items found.</div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedItems.map((item) => {
            const daysLeft = getDaysLeft(item.expiryDate);
            return (
              <div key={item._id} className="bg-base-100 rounded-2xl shadow-md overflow-hidden relative">
                <div className="relative">
                  <img
                    src={item.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
                    alt={item.title}
                    className="h-40 w-full object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-red-600 text-xs px-2 py-1 rounded-full flex items-center gap-1 text-white">
                    <AlertTriangle className="w-4 h-4" />
                    {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
                  </span>
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-1">{item.title}</h2>
                  <p className="text-sm"><strong>Quantity:</strong> {item.quantity}</p>
                  <p className="text-sm flex items-center gap-1">
                    <AlarmClock className="w-4 h-4" />
                    <strong>Expires:</strong>{" "}
                    <span className="text-red-600">{formatDate(item.expiryDate)}</span>
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    {item.category}
                  </span>
                  <Link to={`/food/${item._id}`}>
                    <button className="mt-3 w-full btn btn-success btn-sm">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100 rounded-lg shadow">
            <thead className="bg-base-200">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Expiry</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => (
                <tr key={item._id} className="hover:bg-base-300">
                  <td>
                    <img
                      src={item.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="font-medium">{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td className="text-red-600">{formatDate(item.expiryDate)}</td>
                  <td>
                    <Link to={`/food/${item._id}`}>
                      <button className="btn btn-sm">See Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${currentPage === index + 1 ? "btn-neutral" : "btn-outline"}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Fridge;
