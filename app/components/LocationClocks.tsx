'use client';

import { useEffect, useState } from 'react';

export default function LocationClocks() {
    const [floridaTime, setFloridaTime] = useState('');
    const [hyderabadTime, setHyderabadTime] = useState('');

    useEffect(() => {
        const updateTimes = () => {
            const now = new Date();

            // Florida time (EST/EDT)
            const floridaTimeStr = now.toLocaleString('en-US', {
                timeZone: 'America/New_York',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            // Determine if EST or EDT
            const floridaMonth = new Date().toLocaleString('en-US', { timeZone: 'America/New_York', month: 'numeric' });
            const isDST = parseInt(floridaMonth) >= 3 && parseInt(floridaMonth) <= 11;
            setFloridaTime(`${floridaTimeStr} ${isDST ? 'EDT' : 'EST'}`);

            // Hyderabad time (IST) - always IST, no DST in India
            const hyderabadTimeStr = now.toLocaleString('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            setHyderabadTime(`${hyderabadTimeStr} IST`);
        };

        updateTimes();
        const interval = setInterval(updateTimes, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="project-card project-card-enhanced text-center">
                <h3 className="project-title gen-ai-font-medium text-lg mb-2">🇺🇸 Florida, USA</h3>
                <p className="text-neon-orange text-2xl gen-ai-font-medium mb-1">
                    {floridaTime}
                </p>
                <p className="project-description gen-ai-font-light text-sm mb-1">Headquarters</p>
                <p className="text-neon-cyan text-sm gen-ai-font-light">Sunrise Gen AI LLC</p>
            </div>
            <div className="project-card project-card-enhanced text-center">
                <h3 className="project-title gen-ai-font-medium text-lg mb-2">🇮🇳 Hyderabad, India</h3>
                <p className="text-neon-orange text-2xl gen-ai-font-medium mb-1">
                    {hyderabadTime}
                </p>
                <p className="project-description gen-ai-font-light text-sm mb-1">Offshore Operations</p>
                <p className="text-neon-cyan text-sm gen-ai-font-light">Sunrise Gen AI India Pvt. Ltd.</p>
            </div>
        </div>
    );
}
