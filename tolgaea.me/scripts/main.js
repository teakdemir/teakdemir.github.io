/* ==========================================
   TOLGAEA.ME - MAIN JAVASCRIPT (COMPLETE REWRITE)
   ========================================== */

// Main Website Class
class TolgaeaWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.loadPageSpecificFeatures();
        this.logWelcomeMessage();
        this.initPageTransitions();
        this.initDarkMode();
        this.addLoadingSpinner();
        this.setupSmoothScroll();
        this.setupCustomCursor(); // CURSOR SETUP EKLENDI
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.onPageLoad();
        });

        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }

    onPageLoad() {
        console.log('Website loaded successfully! 🚀');
        this.updateCopyrightYear();
        this.handleSVGResponsiveness();
        
        // Add staggered fade-in for elements
        const animateElements = () => {
            const elements = document.querySelectorAll('.card, .project-card, .game-card, .resume-section');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    requestAnimationFrame(() => {
                        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    });
                }, index * 100);
            });
        };
        
        setTimeout(() => {
            console.log('JavaScript is working! 💻');
            animateElements();
        }, 100);
    }

    // Dark Mode Functions
    initDarkMode() {
        // Check for saved dark mode preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            this.updateDarkModeIcon(true);
        }
    }

    toggleDarkMode() {
        const body = document.body;
        const isDarkMode = body.classList.toggle('dark-mode');
        
        // Save preference
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Update icon
        this.updateDarkModeIcon(isDarkMode);
        
        // Add smooth transition
        body.style.transition = 'background 0.3s ease';
    }

    updateDarkModeIcon(isDarkMode) {
        const toggleIcons = document.querySelectorAll('.toggle-icon');
        toggleIcons.forEach(icon => {
            icon.textContent = isDarkMode ? '☀️' : '🌙';
        });
    }

    // Loading Spinner
    addLoadingSpinner() {
        // Create loading spinner
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        document.body.appendChild(spinner);
        
        // Remove spinner after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                spinner.style.opacity = '0';
                setTimeout(() => {
                    spinner.remove();
                }, 300);
            }, 500);
        });
    }

    // Navigation Functions
    setupNavigation() {
        this.setActiveNavItem();
        this.setupScrollEffect();
        this.setupMobileMenuClose();
    }

    setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        let pageName = currentPage.replace('.html', '');
        
        // Handle edge cases
        if (!pageName || pageName === '' || pageName === 'index') {
            pageName = 'index';
        }
        
        console.log('Current page:', pageName); // Debug log
        
        // Desktop navbar
        const navItems = document.querySelectorAll('.navbar-item');
        navItems.forEach(item => {
            const itemPage = item.getAttribute('data-page');
            item.classList.remove('active');
            
            if (itemPage === pageName || (pageName === 'index' && itemPage === 'index')) {
                item.classList.add('active');
                console.log('Active navbar item set:', itemPage); // Debug log
            }
        });
        
        // Mobile menu
        const mobileItems = document.querySelectorAll('.mobile-menu-item');
        mobileItems.forEach(item => {
            const itemPage = item.getAttribute('data-page');
            item.classList.remove('active');
            
            if (itemPage === pageName || (pageName === 'index' && itemPage === 'index')) {
                item.classList.add('active');
                console.log('Active mobile item set:', itemPage); // Debug log
            }
        });
    }

    setupScrollEffect() {
        let lastScroll = 0;
        let ticking = false;

        const updateNavbar = () => {
            const navbar = document.querySelector('.navbar');
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateX(-50%) translateY(-100px)';
            } else {
                navbar.style.transform = 'translateX(-50%) translateY(0)';
            }
            
            lastScroll = currentScroll;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    }

    setupMobileMenuClose() {
        document.addEventListener('click', (e) => {
            const mobileMenu = document.querySelector('.mobile-menu');
            const mobileToggle = document.querySelector('.navbar-mobile-toggle');
            
            if (mobileMenu && mobileToggle && 
                !mobileMenu.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    // Smooth Scroll
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Page Transitions
    initPageTransitions() {
        const links = document.querySelectorAll('a[href$=".html"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('http')) return;
                
                e.preventDefault();
                this.closeMobileMenu();
                
                document.body.style.opacity = '0';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    }

    // Mobile Menu Functions
    toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        if (mobileMenu && overlay) {
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        if (mobileMenu && overlay) {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
        }
    }

    // SVG Responsive Control
    handleSVGResponsiveness() {
        const updateSVG = () => {
            const desktopSVG = document.querySelector('.desktop-svg');
            const mobileSVG = document.querySelector('.mobile-svg');
            
            if (desktopSVG && mobileSVG) {
                if (window.innerWidth <= 768) {
                    desktopSVG.style.display = 'none';
                    mobileSVG.style.display = 'block';
                } else {
                    desktopSVG.style.display = 'block';
                    mobileSVG.style.display = 'none';
                }
            }
        };

        updateSVG();
        window.addEventListener('resize', updateSVG);
    }

    // Update Copyright Year
    updateCopyrightYear() {
        const currentYear = new Date().getFullYear();
        const footers = document.querySelectorAll('footer p');
        
        footers.forEach(footerP => {
            const yearRegex = /&copy;\s*\d{4}/g;
            if (yearRegex.test(footerP.innerHTML)) {
                footerP.innerHTML = footerP.innerHTML.replace(yearRegex, `&copy; ${currentYear}`);
            }
        });
    }

    // Welcome Messages
    logWelcomeMessage() {
        const currentPage = this.getCurrentPageName();
        
        setTimeout(() => {
            const messages = {
                'index': 'Ana sayfa yüklendi! 🏠',
                'projects': 'Projeler sayfası yüklendi! 🎮',
                'completed-games': 'Tamamlanan oyunlar sayfası yüklendi! 🏆',
                'current-project': 'Mevcut proje sayfası yüklendi! ⚡',
                'future-project': 'Gelecek proje sayfası yüklendi! 🔮',
                'resume': 'Özgeçmiş sayfası yüklendi! 📄',
                'contact': 'İletişim sayfası yüklendi! 📧'
            };
            
            console.log(messages[currentPage] || 'Sayfa yüklendi! ✨');
        }, 1500);
    }

    getCurrentPageName() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        
        if (!fileName || fileName === 'index.html' || fileName === '') {
            return 'index';
        }
        
        return fileName.replace('.html', '');
    }

    // Page Specific Features
    loadPageSpecificFeatures() {
        const currentPage = this.getCurrentPageName();
        
        switch(currentPage) {
            case 'contact':
                this.setupContactPage();
                break;
        }
    }

    setupContactPage() {
        window.copyEmail = (event) => {
            event.preventDefault();
            const email = 'takdemirbusiness@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                this.showToast('Email copied to clipboard!');
            }).catch(() => {
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                this.showToast('Email copied to clipboard!');
            });
        };
    }

    showToast(message) {
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 2000);
    }

    // CURSOR SETUP - YENİ FONKSİYON
    setupCustomCursor() {
        // Sayfanın genel cursor'unu değiştir
        document.body.style.cursor = 'crosshair';
        
        // Interactive elementlere özel cursor'lar
        const setupElementCursor = () => {
            const buttons = document.querySelectorAll('.btn, button, .navbar-item, .mobile-menu-item, .contact-item, a');
            buttons.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    document.body.style.cursor = 'grab';
                });
                
                element.addEventListener('mouseleave', () => {
                    document.body.style.cursor = 'crosshair';
                });
            });

            // Kalp için özel cursor
            const hearts = document.querySelectorAll('.heart-clickable');
            hearts.forEach(heart => {
                heart.addEventListener('mouseenter', () => {
                    document.body.style.cursor = 'grab';
                });
                
                heart.addEventListener('mousedown', () => {
                    document.body.style.cursor = 'grabbing';
                });
                
                heart.addEventListener('mouseup', () => {
                    document.body.style.cursor = 'grab';
                });
                
                heart.addEventListener('mouseleave', () => {
                    document.body.style.cursor = 'crosshair';
                });
            });
        };

        // Sayfa yüklendikten sonra cursor setup'ı çalıştır
        setTimeout(setupElementCursor, 500);
    }

    // Floating Image Animation change the number 10 to the number of images you have. all images should be in the images/Random folder. and named number.jpg
    createFloatingImage() {
        const imageNumber = Math.floor(Math.random() * 10) + 1;
        const x = Math.random() * (window.innerWidth - 60);
        const y = Math.random() * (window.innerHeight - 60);
        
        const img = document.createElement('img');
        img.src = `images/Random/${imageNumber}.jpg`;
        img.className = 'floating-image';
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        
        img.onerror = () => {
            img.remove();
            this.createFloatingEmoji();
        };
        
        document.body.appendChild(img);
        
        setTimeout(() => {
            img.classList.add('animate');
        }, 10);
        
        setTimeout(() => {
            if (img.parentNode) {
                img.parentNode.removeChild(img);
            }
        }, 2000);
    }

    createFloatingEmoji() {
        const emojis = ['❤️', '🎮', '💻', '🚀', '⭐'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        const x = Math.random() * (window.innerWidth - 60);
        const y = Math.random() * (window.innerHeight - 60);
        
        const emojiDiv = document.createElement('div');
        emojiDiv.textContent = randomEmoji;
        emojiDiv.className = 'floating-image';
        emojiDiv.style.left = x + 'px';
        emojiDiv.style.top = y + 'px';
        emojiDiv.style.fontSize = '40px';
        emojiDiv.style.display = 'flex';
        emojiDiv.style.alignItems = 'center';
        emojiDiv.style.justifyContent = 'center';
        
        document.body.appendChild(emojiDiv);
        
        setTimeout(() => {
            emojiDiv.classList.add('animate');
        }, 10);
        
        setTimeout(() => {
            if (emojiDiv.parentNode) {
                emojiDiv.parentNode.removeChild(emojiDiv);
            }
        }, 2000);
    }
}

// Initialize Website
const tolgaeaWebsite = new TolgaeaWebsite();

// Global Functions
window.toggleMobileMenu = () => {
    tolgaeaWebsite.toggleMobileMenu();
};

window.closeMobileMenu = () => {
    tolgaeaWebsite.closeMobileMenu();
};

window.toggleDarkMode = () => {
    tolgaeaWebsite.toggleDarkMode();
};

window.createFloatingImage = () => {
    tolgaeaWebsite.createFloatingImage();
};

window.tolgaea = tolgaeaWebsite;