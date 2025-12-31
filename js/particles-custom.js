const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

// Configuration
let numberOfParticles;
const connectionDistanceBase = 120;
let connectionDistance = connectionDistanceBase;
const mouseRadiusBase = 150;

// Set canvas to full screen/container
const heroSection = document.querySelector('#home-section');
canvas.id = 'particles-canvas';
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '0';
canvas.style.pointerEvents = 'none';
heroSection.appendChild(canvas);

// Sizing
function setCanvasSize() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;

    // Adjust logic for mobile
    if (canvas.width < 768) {
        connectionDistance = 80; // Shorter connection distance on mobile
    } else {
        connectionDistance = connectionDistanceBase;
    }
}
setCanvasSize();

// Mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener('mousemove', function (event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

// Touch support
window.addEventListener('touchmove', function (event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.touches[0].clientX - rect.left;
    mouse.y = event.touches[0].clientY - rect.top;
}, { passive: true });

window.addEventListener('touchstart', function (event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.touches[0].clientX - rect.left;
    mouse.y = event.touches[0].clientY - rect.top;
}, { passive: true });

window.addEventListener('touchend', function () {
    mouse.x = undefined;
    mouse.y = undefined;
})


window.addEventListener('resize', function () {
    setCanvasSize();
    mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
    init();
});

window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined;
})


// Create Particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ffbd39';
        ctx.fill();
    }

    // Check particle position, check mouse position, move the particle, draw the particle
    update() {
        // Check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Interactive repelling effect
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 2;
            }
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        // Draw particle
        this.draw();
    }
}

// Create particle array
function init() {
    particlesArray = [];
    // Reduce density on mobile for performance
    let densityDivider = 9000;
    if (canvas.width < 768) {
        densityDivider = 15000; // Fewer particles on mobile
    }

    let numberOfParticles = (canvas.height * canvas.width) / densityDivider;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = '#ffbd39';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Check if particles are close enough to draw line
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (connectionDistance * connectionDistance)) {
                opacityValue = 1 - (distance / (connectionDistance * connectionDistance)); // Updated calculation
                // Draw line
                ctx.strokeStyle = 'rgba(255, 189, 57,' + opacityValue * 0.2 + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
        animate();
    });
} else {
    init();
    animate();
}
