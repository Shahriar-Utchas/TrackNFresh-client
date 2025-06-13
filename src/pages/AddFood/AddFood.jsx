import { Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import toast from "react-hot-toast";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

const AddFood = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        setIsCreating(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        const initial_foodItem = Object.fromEntries(formData.entries());
        const foodItem = {
            ...initial_foodItem,
            foodCreatorEmail: user.email,
            AddedDate: new Date().toISOString().split("T")[0],
        };
        // Send the food item to the server
        axiosSecure.post("/food/add", foodItem,)
            .then((response) => {
                if (response.data.acknowledged) {
                    setIsCreating(false);
                    toast.success("Food item added successfully!");
                    e.target.reset();
                    navigate("/my-items");

                }
                else {
                    setIsCreating(false);
                    toast.error("Failed to add food item. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error adding food item:", error);
                alert("An error occurred while adding the food item.");
            });
    };


    return (
        <>
            <Helmet>
                <title>FreshNTrack | Add Food</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-base-300 p-8">
                <div className="bg-base-100 p-8 rounded-xl shadow-md w-full max-w-xl">
                    <div className="flex justify-center mb-4">
                        <div className="bg-success text-white rounded-full w-12 h-12 flex items-center justify-center">
                            <Plus size={24} strokeWidth={3} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-1">Add New Food Item</h2>
                    <p className="text-center text-gray-500 mb-6">
                        Keep track of your food and reduce waste
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
                                    defaultValue=""
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
                            ></textarea>
                        </div>

                        <button className="btn btn-success w-full text-white text-base font-semibold">
                            {isCreating ? "Creating item..." : "+ Add Food Item"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddFood;
