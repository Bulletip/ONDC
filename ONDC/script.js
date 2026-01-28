/**
 * Text Generate Effect
 * Animates text word by word, fading them in sequentially.
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Select the target element
    const targetElement = document.querySelector(".text-generate-effect");
    if (!targetElement) return;

    // 2. Get the text content
    const textContext = targetElement.innerText;

    // 3. Clear the element
    targetElement.innerHTML = "";

    // 4. Split into words
    const words = textContext.split(" ");

    // 5. Create word spans and append them
    words.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.opacity = "0";
        span.style.filter = "blur(10px)";
        span.style.display = "inline-block";
        span.style.marginRight = "0.3em"; // Add explicit spacing
        span.style.transition = `opacity 0.5s ease, filter 0.5s ease`;

        targetElement.appendChild(span);

        setTimeout(() => {
            span.style.opacity = "1";
            span.style.filter = "blur(0px)";
        }, index * 200); // 200ms delay per word
    });
});

/**
 * Interactive Particle Network Animation
 * Creates a constellation effect that reacts to mouse movement.
 */
function initHeroAnimation() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 60; // Number of particles
    const connectionDistance = 150; // Distance to draw lines
    const mouseParams = { x: null, y: null, radius: 200 };

    // Resize handling
    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
        initParticles();
    }

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Slow velocity
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction
            if (mouseParams.x != null) {
                let dx = mouseParams.x - this.x;
                let dy = mouseParams.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseParams.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseParams.radius - distance) / mouseParams.radius;
                    const directionX = forceDirectionX * force * this.size * 0.5;
                    const directionY = forceDirectionY * force * this.size * 0.5;

                    // Gently push away or attract - let's do a gentle attraction for "network" feel
                    this.x += directionX;
                    this.y += directionY;
                }
            }
        }

        draw() {
            // Check for blue theme
            const isBlueTheme = document.body.classList.contains('blue-theme');
            const color = isBlueTheme ? '59, 130, 246' : '255, 255, 255'; // Blue or White

            ctx.fillStyle = `rgba(${color}, 0.4)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Check for blue theme for line color
        const isBlueTheme = document.body.classList.contains('blue-theme');
        const color = isBlueTheme ? '59, 130, 246' : '255, 255, 255';

        // Draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw connections
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    // Opacity based on distance
                    let opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(${color}, ${opacity * 0.15})`; // Network lines
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    // Event Listeners
    window.addEventListener('resize', resize);

    // Mouse movement tracking
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseParams.x = e.clientX - rect.left;
            mouseParams.y = e.clientY - rect.top;
        });
        heroSection.addEventListener('mouseleave', () => {
            mouseParams.x = null;
            mouseParams.y = null;
        });
    }

    // Initialize
    resize();
    animate();
}

// Modal Logic
document.addEventListener("DOMContentLoaded", () => {
    initHeroAnimation(); // Restore hero animation
    const modal = document.getElementById("signup-modal");

    // Select the Sign Up button (assuming it's the one with the gradient class)
    // Note: If you have multiple buttons with this class, you might want to be more specific.
    // For now, targeting the first one in the header is safe.
    const openBtn = document.querySelector(".btn-hover-gradient");

    const closeBtn = document.querySelector(".close-btn");
    const signupForm = document.querySelector(".signup-form");

    if (openBtn && modal) {
        openBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            modal.classList.add("show");
            document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("show");
            document.body.style.overflow = ""; // Restore scrolling
        });
    }

    // Close on click outside
    if (modal) {
        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("show");
                document.body.style.overflow = "";
            }
        });
    }

    // Handle Form Submit (Prevent default for demo)
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = signupForm.querySelector("button");
            const originalText = btn.innerHTML;

            btn.innerHTML = "<span>Processing...</span>";

            setTimeout(() => {
                btn.innerHTML = "<span>Success!</span>";
                btn.style.borderColor = "#00ff00"; // Visual feedback

                setTimeout(() => {
                    modal.classList.remove("show");
                    document.body.style.overflow = "";
                    btn.innerHTML = originalText;
                    btn.style.borderColor = "transparent";
                    signupForm.reset();
                }, 1000);
            }, 1500);
        });
    }
});
