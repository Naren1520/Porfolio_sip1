class ElegantCursor {
    constructor() {
        this.createCursor();
        this.initMovement();
        this.initInteractions();
    }

    createCursor() {
        this.dot = document.createElement('div');
        this.outline = document.createElement('div');

        this.dot.className = 'cursor-dot';
        this.outline.className = 'cursor-outline';

        document.body.appendChild(this.dot);
        document.body.appendChild(this.outline);
    }

    initMovement() {
        this.posX = 0;
        this.posY = 0;
        this.outlineX = 0;
        this.outlineY = 0;
        this.delay = 0.15;

        window.addEventListener('mousemove', (e) => {
            this.posX = e.clientX;
            this.posY = e.clientY;
        });

        const animate = () => {
            this.outlineX += (this.posX - this.outlineX) * this.delay;
            this.outlineY += (this.posY - this.outlineY) * this.delay;

            this.dot.style.left = `${this.posX}px`;
            this.dot.style.top = `${this.posY}px`;

            this.outline.style.left = `${this.outlineX}px`;
            this.outline.style.top = `${this.outlineY}px`;

            requestAnimationFrame(animate);
        };

        animate();
    }

    initInteractions() {
        // Click scaling effect
        document.addEventListener('mousedown', () => {
            this.outline.style.transform = 'translate(-50%, -50%) scale(0.75)';
        });
        document.addEventListener('mouseup', () => {
            this.outline.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Hover effects for clickable elements
        const elements = document.querySelectorAll('a, button, input[type="submit"]');
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => new ElegantCursor());
