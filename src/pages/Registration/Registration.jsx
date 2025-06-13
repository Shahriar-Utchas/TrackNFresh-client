import React, { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Lottie from 'lottie-react';
import registrationAnimation from '../../../public/lottie-animation/registration-animation.json';
import { AuthContext } from '../../Provider/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const Registration = () => {
    const { user, createUser, SetUser, handleGoogleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            navigate(location?.state || '/');
        }
    }, [user, navigate, location]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validatePassword = (password) => {
        if (password.length < 6) return 'Password must be at least 6 characters.';
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
        if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter.';
        return '';
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        if (confirmPassword !== password) return 'Passwords do not match.';
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === 'password') {
            setErrors((prev) => ({
                ...prev,
                password: validatePassword(value),
                confirmPassword: validateConfirmPassword(value, formData.confirmPassword),
            }));
        }

        if (name === 'confirmPassword') {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: validateConfirmPassword(formData.password, value),
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const passwordError = validatePassword(formData.password);
        const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);

        setErrors({
            password: passwordError,
            confirmPassword: confirmPasswordError,
        });

        if (passwordError || confirmPasswordError) {
            return;
        }

        //register 
        createUser(formData.email, formData.password, formData.name, formData.photoURL)
            .then((result) => {
                SetUser(result.user);
                setLoading(false);
                toast.success('Registration successful!');
                SetUser({
                    displayName: formData.name,
                    email: formData.email,
                    photoURL: formData.photoURL || 'https://www.paralysistreatments.com/wp-content/uploads/2018/02/no_profile_img.png',
                });
                navigate(location?.state || '/');
            })
            .catch((error) => {
                setLoading(false);
                const cleanedMessage = error.message.replace(/^Firebase:\s*/, '');
                toast.error(cleanedMessage);
            });
    };

    const handleGoogleRegister = () => {
        setLoading(true);
        handleGoogleLogin()
            .then((result) => {
                SetUser(result.user);
                setLoading(false);
                toast.success('Registration successful!');
                navigate(location?.state || '/');
            })
            .catch((error) => {
                setLoading(false);
                toast.error('Registration failed. Please try again.');
                console.error('Google Registration error:', error);
            });
    };

    return (
        <>
            <Helmet>
                <title>FreshNTrack | Registration</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-base-300 px-4">
                <div className="flex flex-col md:flex-row-reverse bg-base-100 shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl m-5">

                    {/* Lottie animation */}
                    <div className="hidden md:flex w-[40%] items-center justify-center bg-info-content p-10">
                        <Lottie animationData={registrationAnimation} loop style={{ width: 400, height: 400 }} />
                    </div>

                    {/* Registration form */}
                    <div className="w-full md:w-[70%] p-10">
                        <div className="mb-8">
                            <h2 className="text-4xl font-bold text-dark mb-2">Create an Account</h2>
                            <p className="text-gray-500">Please fill in the details to register</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full Name *"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email *"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <input
                                    type="url"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    placeholder="Photo URL (optional)"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password *"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-2/4 -translate-y-2/4 cursor-pointer text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                                </span>
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                                )}
                            </div>

                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password *"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-2/4 -translate-y-2/4 cursor-pointer text-gray-500"
                                >
                                    {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                                </span>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </button>

                            <div className="flex items-center justify-center gap-2 text-sm">
                                <span className="border-b w-1/5"></span>
                                <span>or register with</span>
                                <span className="border-b w-1/5"></span>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleRegister}
                                className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-200 hover:text-black transition cursor-pointer"
                            >
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                                <span className=" font-medium">{loading ? 'Registering...' : 'Register with Google'}</span>
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm">
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-600 hover:underline font-medium">
                                Login here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;
