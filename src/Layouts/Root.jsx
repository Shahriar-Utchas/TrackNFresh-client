import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router';
import Footer from '../components/Footer/Footer';

const Root = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [location]);
    return (
        <>
            <Navbar></Navbar>
            {loading ? <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div> : <Outlet />}
            <Footer></Footer>
        </>
    );
};

export default Root;