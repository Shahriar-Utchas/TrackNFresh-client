import React from 'react';
import { Lightbulb } from 'lucide-react';

const tips = [
    {
        number: 1,
        title: 'Proper Storage',
        description:
            'Store fruits and vegetables in the right conditions. Keep bananas separate from other fruits to prevent over-ripening.',
        bgColor: 'bg-primary/10',
        borderColor: 'bg-primary ',
        textColor: 'text-primary',
    },
    {
        number: 2,
        title: 'FIFO Method',
        description:
            'Use "First In, First Out" method. Always use older items before newer ones to minimize waste and maximize freshness.',
        bgColor: 'bg-green-100 dark:bg-green-900/20',
        borderColor: 'bg-green-500',
        textColor: 'text-success',
    },
    {
        number: 3,
        title: 'Temperature Control',
        description:
            'Keep your refrigerator at 40°F (4°C) or below and freezer at 0°F (-18°C) to maintain optimal food safety standards.',
        bgColor: 'bg-purple-100 dark:bg-purple-900/20',
        borderColor: 'bg-purple-500',
        textColor: 'text-purple-600',
    },
];

const FoodTips = () => {
    return (
        <div className="py-16 px-4 text-center max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-10">
                <div className="flex items-center gap-4">
                    <div className="relative w-fit">
                        <div
                            className="absolute inset-0 rounded-full bg-yellow-400/20 dark:bg-yellow-300/10 animate-ping z-0"
                            style={{ animationDuration: '2.5s' }}
                        ></div>
                        {/* Icon */}
                        <div className="relative p-4 rounded-full bg-yellow-100 dark:bg-yellow-500/20 z-10 shadow-md">
                            <Lightbulb className="text-yellow-500 dark:text-yellow-300" size={36} />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
                        Food Safety Tips
                    </h1>
                </div>
                <div className="w-24 h-1 bg-success rounded-full mt-2 mb-4"></div>
                <p className="text-muted-foreground max-w-2xl text-lg">
                    Learn how to keep your food fresh longer and reduce waste with these expert tips from food safety professionals. 👨‍🍳
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tips.map((tip, index) => (
                    <div
                        key={index}
                        className={`rounded-2xl shadow-lg ${tip.bgColor} p-6 text-left hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${tip.borderColor} text-white font-bold text-xl shadow-md`}>
                                {tip.number}
                            </div>
                            <div>
                                <h3 className={`text-xl font-bold ${tip.textColor}`}>{tip.title}</h3>
                                <div className={`w-16 h-1 mt-1 rounded-full ${tip.textColor}`}></div>
                            </div>
                        </div>
                        <p className="text-foreground/80 dark:text-muted-foreground text-base leading-relaxed">{tip.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoodTips;
