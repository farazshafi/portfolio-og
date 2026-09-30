import { useEffect } from 'react';

export function useFaviconAnimation() {
    useEffect(() => {
        const favicon = document.getElementById('favicon');
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let frame = 0;

        // Scrolling title setup
        const baseTitle = "Faraz Shafi | Full-Stack Engineer ";
        let titleIndex = 0;

        const animate = () => {
            if (!favicon) return;

            const size = 32;
            ctx.clearRect(0, 0, size, size);

            // Calculate dynamic values
            const pulse = Math.sin(frame * 0.15);
            const rotation = frame * 0.1;
            const hue = (270 + Math.sin(frame * 0.05) * 30) % 360; // oscillate between purple and blue

            ctx.save();
            ctx.translate(size / 2, size / 2);
            ctx.rotate(rotation);

            // Draw outer glow
            const gradient = ctx.createRadialGradient(0, 0, 4, 0, 0, 16);
            gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 1)`);
            gradient.addColorStop(1, `hsla(${hue}, 100%, 60%, 0)`);

            ctx.beginPath();
            ctx.arc(0, 0, 14 + pulse * 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw rotating core square
            ctx.beginPath();
            const rectSize = 12 + pulse * 2;
            ctx.roundRect(-rectSize / 2, -rectSize / 2, rectSize, rectSize, 3);
            ctx.fillStyle = `hsla(${hue}, 100%, 70%, 1)`;
            ctx.fill();

            // Inner dot
            ctx.beginPath();
            ctx.arc(0, 0, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            ctx.restore();

            favicon.href = canvas.toDataURL('image/png');

            // Title scrolling
            if (frame % 2 === 0) { // Faster title scroll
                document.title = baseTitle.substring(titleIndex) + baseTitle.substring(0, titleIndex);
                titleIndex = (titleIndex + 1) % baseTitle.length;
            }

            frame++;
        };

        const intervalId = setInterval(animate, 100);
        return () => {
            clearInterval(intervalId);
            document.title = "Faraz Shafi | Full-Stack Engineer"; // Reset title on unmount
        };
    }, []);
}
