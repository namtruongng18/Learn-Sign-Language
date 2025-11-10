// --- Theme Toggle Logic ---
const switchInput = document.getElementById('switch');

if (localStorage.getItem('theme') === 'dark') {
    switchInput.checked = true;
    document.body.classList.add('dark');
}

switchInput.addEventListener('change', () => {
  document.body.classList.toggle('dark', switchInput.checked);
  localStorage.setItem('theme', switchInput.checked ? 'dark' : 'light');
});

// --- Morphing Text Logic ---
const words = ["Support", "Educate", "Empower"];
let currentIndex = 0;
const morphingTextEl = document.getElementById('morphing-text');
const DURATION = 3000;
const ANIMATION_DURATION = 800;

function updateText() {
    morphingTextEl.classList.add('exit');
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        morphingTextEl.textContent = words[currentIndex];
        morphingTextEl.classList.remove('exit');
        morphingTextEl.classList.add('enter-start');
        void morphingTextEl.offsetWidth;
        morphingTextEl.classList.remove('enter-start');
    }, ANIMATION_DURATION);
}

setInterval(updateText, DURATION);

// --- NEW: Text Reveal Logic (Vanilla JS version of Framer Motion component) ---
function initTextReveal() {
    const textToAnimate = "Đơn giản để kết nối, mạnh mẽ để sẻ chia.";
    const container = document.getElementById('text-reveal');
    
    // Xóa nội dung cũ nếu có
    if (!container) return;
    container.innerHTML = '';

    const wordsArray = textToAnimate.split(" ");

    wordsArray.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'reveal-word';
        
        // Tính toán độ trễ (stagger). 
        // Mỗi từ trễ hơn từ trước 0.1s (giống staggerChildren: 0.1)
        const delay = index * 0.2; 
        span.style.animationDelay = `${delay}s`;

        container.appendChild(span);
    });
}

// Chạy hàm khi trang tải xong
document.addEventListener('DOMContentLoaded', initTextReveal);

// --- Typewriter Logic ---
const typewriterText = "Chào mừng bạn đến với S.E.E Website";
const typeSpeed = 78;      // Tốc độ gõ (ms)
const deleteSpeed = 50;     // Tốc độ xóa (ms)
const pauseDuration = 2000; // Thời gian chờ khi gõ xong (ms)

let charIndex = 0;
let isDeletingTypewriter = false;
const typewriterEl = document.getElementById('typewriter-text');

function typeWriterLoop() {
    if (!typewriterEl) return;

    const currentText = typewriterText.substring(0, charIndex);
    typewriterEl.textContent = currentText;

    let typeSpeedCurrent = typeSpeed;

    if (isDeletingTypewriter) {
        charIndex--;
        typeSpeedCurrent = deleteSpeed;
    } else {
        charIndex++;
    }

    // Nếu đã gõ xong trọn vẹn câu
    if (!isDeletingTypewriter && charIndex === typewriterText.length + 1) {
        isDeletingTypewriter = true;
        typeSpeedCurrent = pauseDuration; // Chờ một chút trước khi bắt đầu xóa
    }
    // Nếu đã xóa hết
    else if (isDeletingTypewriter && charIndex === 0) {
        isDeletingTypewriter = false;
        typeSpeedCurrent = 500; // Chờ một chút trước khi bắt đầu gõ lại
    }

    setTimeout(typeWriterLoop, typeSpeedCurrent);
}

// Khởi chạy hiệu ứng khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    // Gọi hàm này nếu nó chưa chạy (đề phòng xung đột với DOMContentLoaded khác)
    if (typewriterEl && typewriterEl.textContent === '') {
        typeWriterLoop();
    }
});

// --- Particle Logo Logic ---
function initParticleLogo() {
    const container = document.getElementById('particle-logo');
    if (!container) return;

    const particleCount = 30; // Số lượng hạt (giảm xuống 30 cho logo đỡ rối)
    const particles = [];

    // Tạo các hạt
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        // Vị trí ngẫu nhiên ban đầu trong container
        // Dùng offsetWidth/Height để lấy kích thước thật của container
        const x = Math.random() * container.offsetWidth;
        const y = Math.random() * container.offsetHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = Math.random().toString(); // Độ mờ ngẫu nhiên

        container.appendChild(particle);
        particles.push({
            element: particle,
            initialX: x,
            initialY: y,
            offsetIndex: i // Để tạo sự lệch pha trong chuyển động
        });
    }

    // Hàm animation loop
    function animateParticles() {
        const time = Date.now() * 0.001; // Thời gian hiện tại (giây)

        particles.forEach(p => {
             // Công thức chuyển động phức tạp từ bản gốc React
            const timeOffset = time + p.offsetIndex;
            const moveX = Math.sin(timeOffset * 0.5) * 15 + Math.cos(timeOffset * 0.3) * 10;
            const moveY = Math.cos(timeOffset * 0.4) * 10 + Math.sin(timeOffset * 0.6) * 15;
            
            // Áp dụng vị trí mới = vị trí ban đầu + độ lệch
            // Dùng transform để tối ưu hiệu năng thay vì set left/top liên tục
            p.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            
            // Hiệu ứng nhấp nháy độ mờ
            p.element.style.opacity = (Math.sin(timeOffset * 2) * 0.5 + 0.5).toString();
        });

        requestAnimationFrame(animateParticles);
    }

    // Đợi một chút để container có kích thước rồi mới bắt đầu chạy
    // (Quan trọng vì đôi khi font chữ chưa load xong thì kích thước sai)
    setTimeout(() => {
         // Cập nhật lại vị trí ban đầu nếu cần thiết (optional)
         animateParticles();
    }, 100);
}

// Chạy sau khi trang tải xong
document.addEventListener('DOMContentLoaded', initParticleLogo);

// --- Text Highlighter Logic ---
function initTextHighlighter() {
    // Lấy tất cả các phần tử cần highlight
    const highlightElements = document.querySelectorAll('.text-highlight');

    if (highlightElements.length === 0) return;

    const observerOptions = {
        root: null,      // Theo dõi so với viewport
        threshold: 0.5,  // Kích hoạt khi 50% phần tử xuất hiện
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm class 'visible' để kích hoạt CSS transition
                entry.target.classList.add('visible');
                // Ngừng theo dõi sau khi đã hiện (chạy 1 lần)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    highlightElements.forEach(el => observer.observe(el));
}

// Chạy hàm khi trang tải xong
document.addEventListener('DOMContentLoaded', initTextHighlighter);

// Tự động cập nhật năm hiện tại
document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});

// --- Back to Top Logic ---
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

if (scrollToTopBtn) {
    // Hiện nút khi cuộn xuống 300px
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    // Xử lý sự kiện click để cuộn lên đầu
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Cuộn mượt mà
        });
    });
}