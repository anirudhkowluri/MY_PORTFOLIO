document.addEventListener('DOMContentLoaded', () => {
    // Check if device has a fine pointer (mouse)
    // If it's a touch device (course pointer) or small screen, don't init cursor
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 992) {
        return;
    }

    // Create cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-dot-outline');

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Mouse movement
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows immediately
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with slight delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .btn, .blog-entry, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });
});
