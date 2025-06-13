import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from '../../components/Hero/Hero';
import ExpiringItem from '../../components/ExpiringItem/ExpiringItem';
import ExpiredItem from '../../components/ExpiredItem/ExpiredItem';
import WhyFreshNTrack from '../../components/WhyFreshNTrack/WhyFreshNTrack';
import FoodTips from '../../components/FoodTips/FoodTips';
import { Helmet } from 'react-helmet';

const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
};

const Home = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        AOS.init({
            duration: 800,
            offset: 100,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <>
            <Helmet>
                <title>FreshNTrack | Home</title>
            </Helmet>
            <motion.div {...fadeInUp}>
                <Hero />
            </motion.div>

            <div data-aos="fade-up">
                <ExpiringItem />
            </div>

            <div data-aos="fade-up">
                <ExpiredItem />
            </div>

            <div data-aos="fade-up">
                <WhyFreshNTrack />
            </div>

            <div data-aos="fade-up">
                <FoodTips />
            </div>
        </>
    );
};

export default Home;