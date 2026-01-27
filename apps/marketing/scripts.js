/**
 * Bazodiac Landing Page Interaction Script
 * Refined for High-End Synthesis Core Gravitational Effects
 */

import contentData from './content.json' with { type: 'json' };
import { IntroSequence } from './intro.js';

const state = {
    lang: 'EN',
    translations: contentData,
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    lerpMouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    window: { w: window.innerWidth, h: window.innerHeight },
    introComplete: false
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 DOMContentLoaded fired');

    // Start intro sequence
    const intro = new IntroSequence();
    console.log('✓ IntroSequence created');
    intro.init();
    console.log('✓ IntroSequence initialized');

    // Initialize main site (will be revealed after intro)
    initIcons();
    initLanguage();
    initCustomCursor();
    initSynthesisEngine();
    initMagneticButtons();
    initTiltCards();
    initNebulaLens();
    initAnimations();
});

function initIcons() {
    lucide.createIcons();
}

/**
 * Custom Crosshair Cursor with Lerping
 */
function initCustomCursor() {
    const cursor = document.querySelector('#custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        state.mouse.x = e.clientX;
        state.mouse.y = e.clientY;
        
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    document.querySelectorAll('.interactive').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

/**
 * Nebula Distortion Lens - Intensified for Gravitational Lensing effect
 */
function initNebulaLens() {
    const lens = document.querySelector('#nebula-lens');
    const core = document.querySelector('.synthesis-core');
    
    document.addEventListener('mousemove', (e) => {
        const dx = e.clientX - state.window.w / 2;
        const dy = e.clientY - state.window.h / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.sqrt(Math.pow(state.window.w / 2, 2) + Math.pow(state.window.h / 2, 2));
        

        gsap.to(lens, {
            x: e.clientX - 300,
            y: e.clientY - 300,
            duration: 0.8,
            ease: "power2.out"
        });


        const influence = Math.max(0, 1 - dist / 600);
        gsap.to(core, {
            scale: 1 + influence * 0.4,
            filter: `grayscale(1) brightness(${1.5 + influence * 3}) blur(${influence * 5}px)`,
            opacity: 0.2 + influence * 0.6,
            boxShadow: `0 0 ${influence * 100}px ${influence * 40}px rgba(99, 102, 241, ${influence * 0.4})`,
            duration: 0.5
        });
        

        gsap.to(lens, {
            opacity: influence * 0.8 + 0.1,
            scale: 1 + influence * 1.5,
            duration: 0.5
        });
    });
}

/**
 * Enhanced Synthesis Engine (Canvas)
 * Implements gravitational pull, spiraling, and high-proximity luminosity.
 */
function initSynthesisEngine() {
    const canvas = document.getElementById('synthesis-engine');
    const ctx = canvas.getContext('2d');
    let width, height, nodes = [];

    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        state.window.w = width;
        state.window.h = height;
        generateNodes();
    };

    const generateNodes = () => {
        nodes = [];
        const count = 100; // Increased for richer synthesis
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                originX: Math.random() * width,
                originY: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.2 + 0.3,
                pulse: Math.random() * Math.PI,
                speedFactor: Math.random() * 0.5 + 0.5
            });
        }
    };

    const draw = () => {
        ctx.clearRect(0, 0, width, height);
        
        state.lerpMouse.x += (state.mouse.x - state.lerpMouse.x) * 0.08;
        state.lerpMouse.y += (state.mouse.y - state.lerpMouse.y) * 0.08;

        nodes.forEach((node, i) => {
            const dxm = state.lerpMouse.x - node.x;
            const dym = state.lerpMouse.y - node.y;
            const distM = Math.sqrt(dxm * dxm + dym * dym);
            

            const influenceRadius = 600;
            
            if (distM < influenceRadius) {
                const force = (1 - distM / influenceRadius);

                node.vx += (dxm / distM) * force * 0.8;
                node.vy += (dym / distM) * force * 0.8;
                

                const tx = -dym / distM;
                const ty = dxm / distM;
                node.vx += tx * force * 1.5;
                node.vy += ty * force * 1.5;
                

                const alpha = force * (0.4 + Math.sin(node.pulse) * 0.2);
                const glowColor = distM < 100 ? `rgba(255, 255, 255, ${alpha})` : `rgba(99, 102, 241, ${alpha})`;
                
                ctx.strokeStyle = glowColor;
                ctx.lineWidth = force * 1.2;
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(state.lerpMouse.x, state.lerpMouse.y);
                ctx.stroke();
            } else {

                node.vx += (node.vx * -0.01);
                node.vy += (node.vy * -0.01);
            }


            node.vx *= 0.94;
            node.vy *= 0.94;

            node.x += node.vx * node.speedFactor;
            node.y += node.vy * node.speedFactor;
            node.pulse += 0.03;


            if (node.x < 0) node.x = width;
            if (node.x > width) node.x = 0;
            if (node.y < 0) node.y = height;
            if (node.y > height) node.y = 0;


            nodes.slice(i + 1, i + 15).forEach(other => {
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const alpha = (1 - dist / 120) * 0.08;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.lineWidth = 0.3;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            });


            const baseAlpha = 0.4 + Math.sin(node.pulse) * 0.2;
            const proximityBoost = distM < 200 ? (1 - distM / 200) : 0;
            ctx.fillStyle = `rgba(255, 255, 255, ${baseAlpha + proximityBoost})`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + proximityBoost * 2, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();
}

/**
 * Magnetic Button Effect
 */
function initMagneticButtons() {
    document.querySelectorAll('.btn-magnetic').forEach(btn => {
        const wrap = btn.parentElement;
        wrap.addEventListener('mousemove', (e) => {
            const rect = wrap.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
            
            if (distance < 100) {
                const x = (e.clientX - centerX) * 0.5;
                const y = (e.clientY - centerY) * 0.5;
                gsap.to(btn, {
                    x, y,
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else {
                gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
            }
        });

        wrap.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        });
    });
}

/**
 * 3D Tilt Card Effect
 */
function initTiltCards() {
    document.querySelectorAll('.agent-card').forEach(card => {
        const glint = card.querySelector('.card-glint');
        const parallaxLayers = card.querySelectorAll('.parallax-layer');
        const bgLayer = card.querySelector('.parallax-bg');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const px = x / rect.width;
            const py = y / rect.height;
            
            const tiltX = (py - 0.5) * 15;
            const tiltY = (px - 0.5) * -15;

            gsap.to(card, {
                rotateX: tiltX,
                rotateY: tiltY,
                duration: 0.5,
                ease: "power2.out",
                perspective: 1000
            });

            gsap.to(glint, {
                opacity: 1,
                x: x - 150,
                y: y - 150,
                duration: 0.2
            });

            parallaxLayers.forEach(layer => {
                const depth = parseFloat(layer.getAttribute('data-depth')) || 0.1;
                gsap.to(layer, {
                    x: (px - 0.5) * 40 * depth,
                    y: (py - 0.5) * 40 * depth,
                    duration: 0.5
                });
            });

            if (bgLayer) {
                gsap.to(bgLayer, {
                    x: (px - 0.5) * -20,
                    y: (py - 0.5) * -20,
                    duration: 0.5
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            gsap.to(glint, { opacity: 0, duration: 0.5 });
            parallaxLayers.forEach(layer => gsap.to(layer, { x: 0, y: 0, duration: 1 }));
            if (bgLayer) gsap.to(bgLayer, { x: 0, y: 0, duration: 1 });
        });
    });
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const heroTl = gsap.timeline();
    heroTl.from(".synthesis-core-wrap", { opacity: 0, scale: 0.5, duration: 3, ease: "expo.out" })
          .from("h1", { y: 60, opacity: 0, duration: 1.5, ease: "power4.out" }, "-=2")
          .from("p", { y: 30, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }, "-=1.2")
          .from(".btn-magnetic", { opacity: 0, scale: 0.95, duration: 1, stagger: 0.2, ease: "power2.out" }, "-=0.8");

    gsap.to(".proof-card", {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.2,
        scrollTrigger: {
            trigger: ".proof-card",
            start: "top 90%",
        }
    });

    gsap.utils.toArray(".step-sim").forEach((step, i) => {
        const bar = step.querySelector('.step-progress');
        gsap.to(bar, {
            width: "100%",
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: ".simulation-container",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            delay: i * 0.4
        });
    });
}

function initLanguage() {
    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;
    const slider = toggle.querySelector('.lang-slider');
    const options = toggle.querySelectorAll('.lang-option');

    toggle.addEventListener('click', () => {
        state.lang = state.lang === 'EN' ? 'DE' : 'EN';
        options.forEach(opt => opt.innerText === state.lang ? opt.classList.add('active') : opt.classList.remove('active'));
        gsap.to(slider, { x: state.lang === 'EN' ? 0 : 36, duration: 0.5, ease: "elastic.out(1, 0.6)" });
        updateContent();
    });

    updateContent();
}

function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        el.classList.add('fade-out');
        setTimeout(() => {
            const key = el.getAttribute('data-i18n');
            const translation = state.translations[state.lang][key];
            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
            el.classList.remove('fade-out');
        }, 200);
    });
}

document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
