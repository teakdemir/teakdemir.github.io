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
        
        setTimeout(() => {
            console.log('JavaScript is working! 💻');
        }, 1000);
    }

    // Navigation Functions
    setupNavigation() {
        this.setActiveNavItem();
        this.setupScrollEffect();
        this.setupMobileMenuClose();
    }

    setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const pageName = currentPage.replace('.html', '');
        
        // Desktop navbar
        const navItems = document.querySelectorAll('.navbar-item');
        navItems.forEach(item => {
            const itemPage = item.getAttribute('data-page');
            if (itemPage === pageName || (pageName === '' && itemPage === 'index')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Mobile menu
        const mobileItems = document.querySelectorAll('.mobile-menu-item');
        mobileItems.forEach(item => {
            const itemPage = item.getAttribute('data-page');
            if (itemPage === pageName || (pageName === '' && itemPage === 'index')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
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

    // Floating Image Animation
    createFloatingImage() {
        const imageNumber = Math.floor(Math.random() * 5) + 1;
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

window.createFloatingImage = () => {
    tolgaeaWebsite.createFloatingImage();
};

window.tolgaea = tolgaeaWebsite;