// 响应式导航栏组件
class ResponsiveNav {
    constructor() {
        this.navElement = null;
        this.menuButton = null;
        this.navLinks = null;
        this.isMobile = false;
        this.init();
    }

    init() {
        this.createNavElement();
        this.setupEventListeners();
        this.checkViewport();
        this.setActiveLink();
    }

    createNavElement() {
        // 创建导航栏HTML结构
        const navHTML = `
            <nav class="responsive-nav">
                <div class="nav-container">
                    <a href="index-final.html" class="nav-brand">
                        <span class="brand-number">20</span>
                        <span class="brand-text">成长轨迹</span>
                    </a>
                    
                    <button class="menu-toggle" aria-label="导航菜单">
                        <span class="menu-bar"></span>
                        <span class="menu-bar"></span>
                        <span class="menu-bar"></span>
                    </button>
                    
                    <ul class="nav-links">
                        <li><a href="index-final.html" class="nav-link">
                            <i class="fas fa-home"></i>
                            <span>时间轴</span>
                        </a></li>
                        <li><a href="thoughts-gallery.html" class="nav-link">
                            <i class="fas fa-brain"></i>
                            <span>思想感悟</span>
                        </a></li>
                        <li><a href="memories-stories.html" class="nav-link">
                            <i class="fas fa-book"></i>
                            <span>记忆与故事</span>
                        </a></li>
                        <li><a href="christmas-video.html" class="nav-link">
                            <i class="fas fa-tree"></i>
                            <span>圣诞树</span>
                        </a></li>
                        <li><a href="music.html" class="nav-link">
                            <i class="fas fa-music"></i>
                            <span>音乐专区</span>
                        </a></li>
                    </ul>
                </div>
            </nav>
        `;

        // 插入到页面顶部
        document.body.insertAdjacentHTML('afterbegin', navHTML);
        
        this.navElement = document.querySelector('.responsive-nav');
        this.menuButton = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
    }

    setupEventListeners() {
        // 菜单切换
        this.menuButton?.addEventListener('click', () => {
            this.toggleMenu();
        });

        // 窗口大小变化
        window.addEventListener('resize', () => {
            this.checkViewport();
        });

        // 滚动效果
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // 点击外部关闭菜单
        document.addEventListener('click', (e) => {
            if (!this.navElement.contains(e.target) && this.navLinks.classList.contains('active')) {
                this.closeMenu();
            }
        });

        // 导航链接点击
        this.navLinks?.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                this.setActiveLink(e.target);
                if (this.isMobile) {
                    this.closeMenu();
                }
            }
        });
    }

    toggleMenu() {
        this.navLinks.classList.toggle('active');
        this.menuButton.classList.toggle('active');
        
        // 防止背景滚动
        if (this.navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMenu() {
        this.navLinks.classList.remove('active');
        this.menuButton.classList.remove('active');
        document.body.style.overflow = '';
    }

    checkViewport() {
        this.isMobile = window.innerWidth <= 768;
        
        if (!this.isMobile) {
            this.closeMenu();
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            this.navElement.classList.add('scrolled');
        } else {
            this.navElement.classList.remove('scrolled');
        }
    }

    setActiveLink(clickedLink = null) {
        const links = this.navLinks.querySelectorAll('.nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index-final.html';
        
        links.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (clickedLink === link || href === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// 初始化导航栏
document.addEventListener('DOMContentLoaded', () => {
    new ResponsiveNav();
});