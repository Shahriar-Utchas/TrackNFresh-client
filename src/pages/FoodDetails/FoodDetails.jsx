import React, { useContext, useState, useEffect } from 'react';
import {
    FaArrowLeft,
    FaTags,
    FaBox,
    FaCalendarAlt,
    FaStickyNote,
} from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const FoodDetails = () => {
    const foodData = useLoaderData();
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const [newNote, setNewNote] = useState('');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const isExpired = new Date(foodData.expiryDate) < new Date();
    const daysLeft = Math.ceil(
        (new Date(foodData.expiryDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );

    useEffect(() => {
        if (foodData.notes) {
            if (Array.isArray(foodData.notes)) {
                setNotes(foodData.notes);
            } else {
                setNotes([foodData.notes]);
            }
        }
    }, [foodData.notes]);

    const handleAddNote = async (e) => {
        e.preventDefault();

        const foodCreatorEmail = foodData.foodCreatorEmail;

        const noteToAdd = {
            text: newNote,
            author: user?.displayName || 'Anonymous',
            authorEmail: user?.email || 'Anonymous',
            date: new Date().toLocaleString(),
        };

        try {
            await axiosSecure.put(`/food/update/${foodData._id}`, {
                foodCreatorEmail,
                note: noteToAdd,
            });

            setNotes(prevNotes => [...prevNotes, noteToAdd]);
            setNewNote('');

            Swal.fire({
                icon: 'success',
                title: 'Note added successfully!',
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error('Failed to update notes:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to add note',
                text: error.message,
            });
        }
    };


    return (
        <div className="p-6 max-w-6xl mx-auto text-base-content">
            <Link to={`/fridge`} className="text-blue-600 flex items-center mb-4">
                <FaArrowLeft className="mr-2" /> Back to Fridge
            </Link>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Left Side - Food Info */}
                <div className="bg-base-300 shadow rounded-lg overflow-hidden">
                    <div className="relative">
                        <img
                            src={
                                foodData.imageUrl ||
                                'https://via.placeholder.com/800x400?text=No+Image+Available'
                            }
                            alt={foodData.title}
                            className={`w-full h-56 object-cover ${isExpired ? 'grayscale' : ''
                                }`}
                        />
                        {isExpired && (
                            <span className="absolute top-2 right-2 bg-red-500 text-xs font-bold px-3 py-1 rounded-full">
                                EXPIRED
                            </span>
                        )}
                    </div>
                    <div className="p-5">
                        <h2 className="text-2xl font-bold mb-2">{foodData.title}</h2>
                        <p className="flex items-center text-sm mb-1">
                            <FaTags className="mr-2 text-blue-500" />
                            <strong>Category:</strong>&nbsp;{foodData.category}
                        </p>
                        <p className="flex items-center text-sm mb-1">
                            <FaBox className="mr-2 text-green-500" />
                            <strong>Quantity:</strong>&nbsp;{foodData.quantity}
                        </p>
                        <p className="flex items-center text-sm mb-2">
                            <FaCalendarAlt className="mr-2 text-purple-500" />
                            <strong>Expiry Date:</strong>&nbsp;
                            <span className="text-red-600 font-semibold">
                                {foodData.expiryDate}
                            </span>
                        </p>
                        <p className="text-sm mt-3">
                            {foodData.description || 'No description provided.'}
                        </p>
                    </div>
                </div>

                {/* Right Side - Countdown + Notes */}
                <div className="space-y-6">
                    {/* Expiration Countdown */}
                    <div className="bg-base-300 shadow rounded-lg p-5">
                        <h3 className="text-xl font-semibold mb-3 flex items-center text-orange-500">
                            <FaCalendarAlt className="mr-2" /> Expiration Countdown
                        </h3>
                        {isExpired ? (
                            <div className="text-center text-red-600 font-bold text-2xl">
                                EXPIRED
                            </div>
                        ) : (
                            <div className="text-center text-green-600 font-bold text-xl">
                                {daysLeft} days left
                            </div>
                        )}
                        <p className="text-center text-sm mt-2 text-base-content opacity-60">
                            {isExpired
                                ? 'This item has passed its expiry date.'
                                : 'This item is still fresh.'}
                        </p>
                    </div>

                    {/* Notes Section */}
                    <div className="bg-base-300 shadow rounded-lg p-5">
                        <h3 className="text-xl font-semibold mb-3 flex items-center text-green-600">
                            <FaStickyNote className="mr-2" /> Notes
                        </h3>

                        <div className="max-h-60 overflow-y-auto mb-3">
                            {notes.length > 0 ? (
                                notes.map((note, index) => (
                                    <div
                                        key={index}
                                        className="bg-base-200 rounded-md p-3 mb-2 text-sm text-base-content"
                                    >
                                        <p>{note.text}</p>
                                        <p className="text-xs opacity-60 mt-1">
                                            By {note.author} on {note.date}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-base-content opacity-60">
                                    No notes added yet.
                                </p>
                            )}
                        </div>

                        {/* Form for new note */}
                        <form onSubmit={handleAddNote}>
                            <textarea
                                placeholder={
                                    user
                                        ? 'Write a note about this item...'
                                        : 'Please log in to add notes'
                                }
                                className="w-full border rounded-md p-2 mt-3 text-sm bg-base-100 text-base-content"
                                disabled={!user}
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                required
                            />

                            <button
                                type="submit"
                                disabled={!user}
                                className={`mt-2 w-full py-2 rounded-md font-semibold ${user
                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                Add Note
                            </button>
                        </form>

                        {!user && (
                            <p className="text-center text-sm text-blue-600 mt-2">
                                <Link
                                    to={`/login`}
                                    className="underline text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                                >
                                    Login
                                </Link>{' '}
                                to add notes and track this item.
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FoodDetails;
