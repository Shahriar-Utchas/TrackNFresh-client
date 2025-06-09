import React from 'react';
import Hero from '../../components/Hero/Hero';
import ExpiringItem from '../../components/ExpiringItem/ExpiringItem';
import ExpiredItem from '../../components/ExpiredItem/ExpiredItem';
import WhyFreshNTrack from '../../components/WhyFreshNTrack/WhyFreshNTrack';
import FoodTips from '../../components/FoodTips/FoodTips';

const Home = () => {
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