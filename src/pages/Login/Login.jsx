import React, { useContext, useEffect, useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import loginAnimation from '../../../public/lottie-animation/login-animation.json';
import Lottie from 'lottie-react';
import { AuthContext } from '../../Provider/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, SetUser, loginWithEmail, handleGoogleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (location?.state && !hasShownToast.current) {
      toast.error('You must log in to access that page.');
      hasShownToast.current = true;
    }
  }, [location]);

  useEffect(() => {
    if (user) {
      navigate(location?.state || '/');
    }
  }, [user, navigate, location]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    loginWithEmail(email, password)
      .then((result) => {
        SetUser(result.user);
        setLoading(false);
        toast.success('Login successful!');
        navigate(location?.state || '/');
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Login failed. Please check your credentials and try again.');
        console.error('Login error:', error);
      });
  }

  // Google login handler
  const GoogleLoginClick = () => {
    setLoading(true);
    handleGoogleLogin()
      .then((result) => {
        SetUser(result.user);
        setLoading(false);
        toast.success('Login successful!');
        navigate(location?.state || '/');
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Login failed. Please try again.');
        console.error('Google login error:', error);
      });
  };

  return (
    <>
      <Helmet>
        <title>TrackNFresh | Login</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-base-300 px-4">
        <div className="flex flex-col md:flex-row bg-base-100 shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl">

          {/* Lottie animation */}
          <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-info-content p-10">
            <Lottie animationData={loginAnimation} loop style={{ width: 400, height: 400 }} />
          </div>

          {/* Login form */}
          <div className="w-full md:w-1/2 p-10">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-dark mb-2">Welcome Back</h2>
              <p className="text-gray-500">Please login to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
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
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="border-b w-1/5"></span>
                <span>or login with</span>
                <span className="border-b w-1/5"></span>
              </div>

              <button
                type="button"
                onClick={GoogleLoginClick}
                className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-200 hover:text-black cursor-pointer transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className=" font-medium">{loading ? 'Logging in...' : 'Login with Google'}</span>
              </button>
            </form>

            <p className="mt-6 text-center text-sm ">
              Don’t have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline font-medium">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
