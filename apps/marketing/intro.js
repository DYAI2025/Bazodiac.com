/**
 * Bazodiac Intro Sequence
 * Simplified: Video-based intro with smooth fade to website
 */

export class IntroSequence {
    constructor() {
        this.videoElement = null;
        this.backgroundAudio = null;
        this.isComplete = false;
        this.musicEnabled = true;
    }

    init() {
        // Hide main content initially
        document.querySelector('main').style.opacity = '0';
        document.querySelector('header').style.opacity = '0';
        document.querySelector('footer').style.opacity = '0';

        // Get video element
        this.videoElement = document.getElementById('intro-video');

        // Get background audio element
        this.backgroundAudio = document.getElementById('background-ambient');
        if (this.backgroundAudio) {
            this.backgroundAudio.volume = 0; // Start silent
        }

        // Setup audio controls
        this.setupAudioControls();

        // Listen for start button
        const startBtn = document.getElementById('start-btn');
        console.log('🔘 Start button found:', startBtn);
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                console.log('✓ Start button clicked!');
                this.begin();
            });
        }
    }

    setupAudioControls() {
        const volumeSlider = document.getElementById('volume-slider');
        const musicToggle = document.getElementById('music-toggle');

        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const volume = e.target.value / 100;
                if (this.backgroundAudio && this.musicEnabled) {
                    this.backgroundAudio.volume = volume * 0.18; // 40% quieter default
                }
                console.log('🔊 Volume:', Math.round(volume * 100) + '%');
            });
        }

        if (musicToggle) {
            musicToggle.addEventListener('click', () => {
                this.musicEnabled = !this.musicEnabled;

                if (this.musicEnabled) {
                    musicToggle.innerHTML = '<i data-lucide="music" class="w-4 h-4"></i><span>Music ON</span>';
                    musicToggle.classList.remove('opacity-50');
                    if (this.backgroundAudio) {
                        const volumeSlider = document.getElementById('volume-slider');
                        const volume = (volumeSlider?.value || 50) / 100;
                        this.backgroundAudio.volume = volume * 0.18;
                        this.backgroundAudio.play().catch(() => {});
                    }
                    console.log('🎵 Music ON');
                } else {
                    musicToggle.innerHTML = '<i data-lucide="music-off" class="w-4 h-4"></i><span>Music OFF</span>';
                    musicToggle.classList.add('opacity-50');
                    if (this.backgroundAudio) {
                        this.backgroundAudio.pause();
                    }
                    console.log('🔇 Music OFF');
                }

                // Recreate icon
                if (window.lucide) {
                    window.lucide.createIcons();
                }
            });
        }
    }

    begin() {
        console.log('🚀 Intro sequence starting...');

        // Fade out interaction overlay
        const overlay = document.getElementById('interaction-overlay');
        if (overlay) {
            gsap.to(overlay, {
                opacity: 0,
                duration: 1,
                ease: "power4.inOut",
                onComplete: () => {
                    overlay.remove();
                    this.playVideo();
                }
            });
        } else {
            this.playVideo();
        }
    }

    playVideo() {
        console.log('▶️ Playing intro video...');

        if (this.videoElement) {
            this.videoElement.style.display = 'block';
            this.videoElement.play().catch(err => {
                console.error('Video play error:', err);
                this.complete();
            });

            // Listen for video end
            this.videoElement.addEventListener('ended', () => {
                console.log('✓ Video ended');
                this.complete();
            }, { once: true });
        } else {
            console.error('Video element not found!');
            this.complete();
        }
    }

    complete() {
        if (this.isComplete) return;
        this.isComplete = true;

        console.log('🌌 Intro complete, revealing website...');

        // Start background ambient music with fade-in
        if (this.backgroundAudio && this.musicEnabled) {
            console.log('🎵 Starting background ambient music...');
            this.backgroundAudio.play().catch(err => {
                console.warn('Background audio autoplay blocked:', err);
            });

            // Get current volume from slider (default 50%)
            const volumeSlider = document.getElementById('volume-slider');
            const baseVolume = (volumeSlider?.value || 50) / 100;

            // Fade in music over 2 seconds (40% quieter: 0.18 instead of 0.3)
            gsap.to(this.backgroundAudio, {
                volume: baseVolume * 0.18, // 40% quieter default
                duration: 2,
                ease: "power2.inOut"
            });
        }

        // Fade out video smoothly
        if (this.videoElement) {
            gsap.to(this.videoElement, {
                opacity: 0,
                duration: 2,
                ease: "power2.inOut",
                onComplete: () => {
                    this.videoElement.pause();
                    this.videoElement.style.display = 'none';
                }
            });
        }

        // Fade in website elements
        const main = document.querySelector('main');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        setTimeout(() => {
            main.style.transition = 'opacity 2.5s ease-out';
            main.style.opacity = '1';
        }, 300);

        setTimeout(() => {
            header.style.transition = 'opacity 2s ease-out';
            header.style.opacity = '1';
        }, 800);

        setTimeout(() => {
            footer.style.transition = 'opacity 2s ease-out';
            footer.style.opacity = '1';
        }, 1300);
    }
}
