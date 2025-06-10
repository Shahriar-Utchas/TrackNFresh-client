import { Plus } from "lucide-react";
import React from "react";

const AddFood = () => {
    return (
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

                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input
                                type="text"
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
                            <select className="select select-bordered w-full" required>
                                <option disabled selected>
                                    Select a category
                                </option>
                                <option>Fruits</option>
                                <option>Vegetables</option>
                                <option>Dairy</option>
                                <option>Meat</option>
                                <option>Snacks</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Quantity *</span>
                            </label>
                            <input
                                type="text"
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
                            rows={3}
                            placeholder="Add any additional notes about this food item..."
                        ></textarea>
                    </div>

                    <button className="btn btn-success w-full text-white text-base font-semibold">
                        + Add Food Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFood;
