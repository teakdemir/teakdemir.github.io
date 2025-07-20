/* ==========================================
   TOLGAEA.ME - ANA JAVASCRIPT DOSYASI
   ========================================== */

// Ana sınıf - Tüm website fonksiyonlarını yönetir
class TolgaeaWebsite {
    constructor() {
        this.init();
    }

    // Website'i başlat
    init() {
        this.setupEventListeners();
        this.loadPageSpecificFeatures();
        this.logWelcomeMessage();
    }

    // Event listener'ları kur
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.onPageLoad();
        });
    }

    // Sayfa yüklendiğinde çalış
    onPageLoad() {
        console.log('Website loaded successfully! 🚀');
        
        // Otomatik yıl güncelleme
        this.updateCopyrightYear();
        
        // SVG responsiveness
        this.handleSVGResponsiveness();
        
        // 1 saniye sonra JavaScript mesajı
        setTimeout(() => {
            console.log('JavaScript is working! 💻');
        }, 1000);
    }

    // SVG responsive kontrolü
    handleSVGResponsiveness() {
        const updateSVG = () => {
            const desktopSVG = document.querySelector('.desktop-svg');
            const mobileSVG = document.querySelector('.mobile-svg');
            
            if (desktopSVG && mobileSVG) {
                if (window.innerWidth <= 768) {
                    // Mobile
                    desktopSVG.style.display = 'none';
                    mobileSVG.style.display = 'block';
                } else {
                    // Desktop
                    desktopSVG.style.display = 'block';
                    mobileSVG.style.display = 'none';
                }
            }
        };

        // İlk yükleme
        updateSVG();
        
        // Ekran boyutu değiştiğinde
        window.addEventListener('resize', updateSVG);
    }

    // Copyright yılını otomatik güncelle
    updateCopyrightYear() {
        const currentYear = new Date().getFullYear();
        
        // Footer'daki tüm copyright metinlerini bul ve güncelle
        const footers = document.querySelectorAll('footer p');
        footers.forEach(footerP => {
            // 2025 veya herhangi bir 4 haneli yılı güncel yılla değiştir
            const yearRegex = /&copy;\s*\d{4}/g;
            if (yearRegex.test(footerP.innerHTML)) {
                footerP.innerHTML = footerP.innerHTML.replace(yearRegex, `&copy; ${currentYear}`);
            }
        });
        
        // Debug için konsola yazdır
        if (currentYear !== 2025) {
            TolgaeaWebsite.log(`Yıl otomatik güncellendi: ${currentYear}`, 'success');
        }
    }

    // Hoş geldin mesajlarını konsola yazdır
    logWelcomeMessage() {
        const currentPage = this.getCurrentPageName();
        
        setTimeout(() => {
            switch(currentPage) {
                case 'index':
                    console.log('Ana sayfa yüklendi! 🏠');
                    break;
                case 'projects':
                    console.log('Projeler sayfası yüklendi! 🎮');
                    break;
                case 'completed-games':
                    console.log('Tamamlanan oyunlar sayfası yüklendi! 🏆');
                    break;
                case 'current-project':
                    console.log('Mevcut proje sayfası yüklendi! ⚡');
                    break;
                case 'future-project':
                    console.log('Gelecek proje sayfası yüklendi! 🔮');
                    break;
                case 'resume':
                    console.log('Özgeçmiş sayfası yüklendi! 📄');
                    break;
                case 'contact':
                    console.log('İletişim sayfası yüklendi! 📧');
                    break;
                default:
                    console.log('Sayfa yüklendi! ✨');
            }
        }, 1500);
    }

    // Mevcut sayfa adını al
    getCurrentPageName() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        
        if (!fileName || fileName === 'index.html' || fileName === '') {
            return 'index';
        }
        
        return fileName.replace('.html', '');
    }

    // Sayfa özel özelliklerini yükle
    loadPageSpecificFeatures() {
        const currentPage = this.getCurrentPageName();
        
        switch(currentPage) {
            case 'index':
                this.setupContactToggle();
                break;
            case 'contact':
                this.setupContactPage();
                break;
        }
    }

    // Ana sayfa contact toggle özelliği
    setupContactToggle() {
        // Bu fonksiyon ana sayfada contact info toggle için kullanılabilir
        window.toggleContact = () => {
            const contactInfo = document.getElementById('contact-info');
            
            if (contactInfo) {
                contactInfo.remove();
            } else {
                const contactDiv = document.createElement('div');
                contactDiv.id = 'contact-info';
                contactDiv.innerHTML = `
                    <div style="margin-top: 15px; padding: 15px; background: #f0f0f0; border-radius: 10px;">
                        <p><strong>Email:</strong> <a href="mailto:takdemirbusiness@gmail.com" style="color: #667eea; text-decoration: none;">takdemirbusiness@gmail.com</a></p>
                        <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/tolga-eren-akdemir-1b9021266/" target="_blank" style="color: #667eea; text-decoration: none;">LinkedIn Profile</a></p>
                        <p><strong>GitHub:</strong> <a href="https://github.com/teakdemir" target="_blank" style="color: #667eea; text-decoration: none;">GitHub Profile</a></p>
                    </div>
                `;
                event.target.closest('.card').appendChild(contactDiv);
            }
        };
    }

    // İletişim sayfası özelliklerini kur
    setupContactPage() {
        // Email kopyalama fonksiyonu
        window.copyEmail = (event) => {
            event.preventDefault();
            const email = 'takdemirbusiness@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                this.showToast('Email copied to clipboard!');
            }).catch(() => {
                // Fallback for older browsers
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

    // Toast mesajı göster
    showToast(message) {
        // Mevcut toast'ı kaldır
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Yeni toast oluştur
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);

        // Toast'ı göster
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // 2 saniye sonra gizle
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 2000);
    }

    // Uçan resim animasyonu oluştur
    createFloatingImage() {
        // 1-5 arası rastgele resim numarası
        const imageNumber = Math.floor(Math.random() * 5) + 1;
        
        // Ekranda rastgele pozisyon
        const x = Math.random() * (window.innerWidth - 60);
        const y = Math.random() * (window.innerHeight - 60);
        
        // Resim elementi oluştur
        const img = document.createElement('img');
        
        // Farklı yolları dene
        const possiblePaths = [
            `images/Random/${imageNumber}.jpg`,
            `Random/${imageNumber}.jpg`,
            `./images/Random/${imageNumber}.jpg`,
            `./Random/${imageNumber}.jpg`
        ];
        
        img.src = possiblePaths[0]; // İlk yolu dene
        img.className = 'floating-image';
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        
        // Hata durumunda diğer yolları dene
        let pathIndex = 0;
        img.onerror = () => {
            pathIndex++;
            if (pathIndex < possiblePaths.length) {
                img.src = possiblePaths[pathIndex];
            } else {
                console.log(`❤️ Tıklandı ama resimler bulunamadı. Kontrol edin:`);
                console.log(`- images/Random/ klasörü var mı?`);
                console.log(`- 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg dosyaları var mı?`);
                // Resim bulunamazsa varsayılan emoji kullan
                img.remove();
                this.createFloatingEmoji();
                return;
            }
        };
        
        // Sayfaya ekle
        document.body.appendChild(img);
        
        // Kısa bir gecikme sonra animasyonu başlat
        setTimeout(() => {
            img.classList.add('animate');
        }, 10);
        
        // Animasyon bittikten sonra DOM'dan kaldır
        setTimeout(() => {
            if (img.parentNode) {
                img.parentNode.removeChild(img);
            }
        }, 2000);
    }

    // Resim bulunamazsa emoji kullan
    createFloatingEmoji() {
        const emojis = ['❤️', '🎮', '💻', '🚀', '⭐'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Ekranda rastgele pozisyon
        const x = Math.random() * (window.innerWidth - 60);
        const y = Math.random() * (window.innerHeight - 60);
        
        // Emoji elementi oluştur
        const emojiDiv = document.createElement('div');
        emojiDiv.textContent = randomEmoji;
        emojiDiv.className = 'floating-image';
        emojiDiv.style.left = x + 'px';
        emojiDiv.style.top = y + 'px';
        emojiDiv.style.fontSize = '40px';
        emojiDiv.style.display = 'flex';
        emojiDiv.style.alignItems = 'center';
        emojiDiv.style.justifyContent = 'center';
        
        // Sayfaya ekle
        document.body.appendChild(emojiDiv);
        
        // Animasyon başlat
        setTimeout(() => {
            emojiDiv.classList.add('animate');
        }, 10);
        
        // DOM'dan kaldır
        setTimeout(() => {
            if (emojiDiv.parentNode) {
                emojiDiv.parentNode.removeChild(emojiDiv);
            }
        }, 2000);
    }

    // Utility fonksiyonları
    static getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static isMobile() {
        return window.innerWidth <= 768;
    }

    static log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix = `[${timestamp}] Tolgaea.me:`;
        
        switch(type) {
            case 'error':
                console.error(prefix, message);
                break;
            case 'warn':
                console.warn(prefix, message);
                break;
            case 'success':
                console.log(`%c${prefix} ${message}`, 'color: #43e97b; font-weight: bold;');
                break;
            default:
                console.log(prefix, message);
        }
    }
}

// Website'i başlat
const tolgaeaWebsite = new TolgaeaWebsite();

// Global fonksiyonları window objesine ekle (HTML'den çağırabilmek için)
window.createFloatingImage = () => {
    tolgaeaWebsite.createFloatingImage();
};

// Diğer global fonksiyonlar da buraya eklenebilir
window.tolgaea = tolgaeaWebsite;

// Debug modunu aktifleştir (geliştirme için)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.tolgaea.debug = true;
    TolgaeaWebsite.log('Debug mode active! 🔧', 'warn');
}

// SVG Responsive Control - EKSTRA KOD
document.addEventListener('DOMContentLoaded', () => {
    const updateSVG = () => {
        const desktop = document.querySelector('.desktop-svg');
        const mobile = document.querySelector('.mobile-svg');
        
        if (desktop && mobile) {
            if (window.innerWidth <= 768) {
                // Mobile - Dikey SVG
                desktop.style.display = 'none';
                mobile.style.display = 'block';
                console.log('📱 Mobile SVG aktif');
            } else {
                // Desktop - Yatay SVG  
                desktop.style.display = 'block';
                mobile.style.display = 'none';
                console.log('💻 Desktop SVG aktif');
            }
        }
    };
    
    // İlk yükleme
    updateSVG();
    
    // Ekran boyutu değişince
    window.addEventListener('resize', updateSVG);
});