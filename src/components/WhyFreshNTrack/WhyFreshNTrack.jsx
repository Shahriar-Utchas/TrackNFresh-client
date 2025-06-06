import React from 'react';
import { Clock, ArrowDownRight, Users, Leaf } from 'lucide-react';

const benefits = [
    {
        icon: <Clock size={40} className="text-primary animate-spin" />,
        title: 'Smart Reminders',
        description: 'Get timely notifications before your food expires'
    },
    {
        icon: <ArrowDownRight size={40} className="text-secondary animate-pulse" />,
        title: 'Reduce Waste',
        description: 'Cut down food waste by up to 40% with smart tracking'
    },
    {
        icon: <Users size={40} className="text-accent animate-pulse" />,
        title: 'Family Friendly',
        description: 'Perfect for families and shared households'
    },
    {
        icon: <Leaf size={40} className="text-success animate-bounce" />,
        title: 'Eco-Friendly',
        description: 'Contribute to a more sustainable planet'
    }
];

const WhyFreshNTrack = () => {
    return (
        <div className="py-16 px-4 text-center max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">Why Choose FreshTrack?</h1>
            <p className="text-muted-foreground mb-12 text-lg">
                Discover the benefits of smart food management and join thousands of users reducing food waste.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                    <div
                        key={index}
                        className="group bg-background rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-200"
                    >
                        <div className="mb-4 flex justify-center">{benefit.icon}</div>
                        <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {benefit.title}
                        </h2>
                        <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                            {benefit.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyFreshNTrack;

