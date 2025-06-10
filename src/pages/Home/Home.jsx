import React, { useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import ExpiringItem from '../../components/ExpiringItem/ExpiringItem';
import ExpiredItem from '../../components/ExpiredItem/ExpiredItem';
import WhyFreshNTrack from '../../components/WhyFreshNTrack/WhyFreshNTrack';
import FoodTips from '../../components/FoodTips/FoodTips';

const Home = () => {
    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div>
            <Hero />
            <ExpiringItem />
            <ExpiredItem />
            <WhyFreshNTrack />
            <FoodTips />
        </div>
    );
};

export default Home;