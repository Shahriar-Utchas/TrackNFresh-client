import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import toast from "react-hot-toast";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Pencil, Plus } from "lucide-react";

const UpdateFood = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    category: "",
    quantity: "",
    expiryDate: "",
    description: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  // Initialize form with loaded data
  useEffect(() => {
    if (data) {
      setFormData({
        imageUrl: data.imageUrl || "",
        title: data.title || "",
        category: data.category || "",
        quantity: data.quantity || "",
        expiryDate: data.expiryDate ? data.expiryDate.split("T")[0] : "",
        description: data.description || "",
      });
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const updatedFoodItem = {
      ...formData,
      foodCreatorEmail: user.email,
    };

    try {
      const response = await axiosSecure.put(`/food/update/${data._id}`, updatedFoodItem);

      if (response.data.modifiedCount > 0) {
        toast.success("Food item updated successfully!");
        navigate("/my-items");
      } else {
        toast.error("No changes were made or update failed.");
      }
    } catch (error) {
      console.error("Error updating food item:", error);
      toast.error("Failed to update food item.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 p-8">
      <div className="bg-base-100 p-8 rounded-xl shadow-md w-full max-w-xl">
        <div className="flex justify-center mb-4">
          <div className="bg-success text-white rounded-full w-12 h-12 flex items-center justify-center">
            <Pencil size={24} strokeWidth={3} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-1">Update Food Item</h2>
        <p className="text-center text-gray-500 mb-6">
          Edit the details of your food item below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                placeholder="Enter image URL"
                className="input input-bordered w-full"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Food Title *</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Fresh Apples"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Category *</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Quantity *</span>
              </label>
              <input
                type="text"
                name="quantity"
                placeholder="e.g., 1 kg, 500g, 2 pieces"
                className="input input-bordered w-full"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Expiry Date *</span>
            </label>
            <input
              type="date"
              name="expiryDate"
              className="input input-bordered w-full"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              name="description"
              rows={3}
              placeholder="Add any additional notes about this food item..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-full text-white text-base font-semibold"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Food Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
