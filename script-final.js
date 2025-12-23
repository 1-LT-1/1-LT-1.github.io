// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面内容
    renderTimelineContent();
    renderSpheresContent();
    initTimelineInteractions();
    initSphereInteractions();
    initSmoothScrolling();
    
    // 延迟加载非关键交互效果
    setTimeout(() => {
        initInteractiveEffects();
    }, 100);
});

// 渲染时间轴内容
function renderTimelineContent() {
    const timelineData = siteData.timeline;
    const timelineContainer = document.querySelector('.timeline-circle');
    const circularTimeline = document.querySelector('.circular-timeline');
    if (!timelineContainer || !circularTimeline) return;
    
    // 清空现有内容
    timelineContainer.innerHTML = '';
    
    // 计算角度位置
    const angleStep = 360 / timelineData.length;
    
    timelineData.forEach((item, index) => {
        const angle = angleStep * index;
        const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
        const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);
        
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.style.left = `${x}%`;
        timelineItem.style.top = `${y}%`;
        timelineItem.setAttribute('data-id', item.id);
        
        timelineItem.innerHTML = `
            <div class="timeline-year">${item.year}</div>
        `;
        
        // 创建内容容器（放在时间轴容器外部，不随旋转）
        const timelineContent = document.createElement('div');
        timelineContent.className = 'timeline-content';
        timelineContent.setAttribute('data-for', item.id);
        timelineContent.innerHTML = `
            <h3>${item.title}</h3>
            <p class="timeline-summary">${item.summary}</p>
            <div class="timeline-details">
                ${item.details.map(detail => `<p>${detail}</p>`).join('')}
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
        circularTimeline.appendChild(timelineContent);
    });
}

// 渲染球形模块内容
function renderSpheresContent() {
    const spheresContainer = document.querySelector('.spheres-container');
    if (!spheresContainer) return;
    
    const spheresData = siteData.spheres;
    
    // 清空现有内容
    spheresContainer.innerHTML = '';
    
    spheresData.forEach(sphere => {
        const sphereModule = document.createElement('div');
        sphereModule.className = 'sphere-module';
        sphereModule.setAttribute('data-id', sphere.id);
        
        sphereModule.innerHTML = `
            <div class="sphere-surface">
                <i class="${sphere.icon}"></i>
                <h3>${sphere.title}</h3>
                <p>${sphere.preview}</p>
            </div>
            <div class="sphere-content">
                <h4>${sphere.content.title}</h4>
                <div class="content-grid">
                    ${sphere.content.items.map(item => `
                        <div class="content-item">
                            ${item.icon ? `<i class="${item.icon}"></i>` : ''}
                            ${item.title ? `<h5>${item.title}</h5>` : ''}
                            <p>${item.content}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        spheresContainer.appendChild(sphereModule);
    });
}

// 圆形时间轴交互功能
function initTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const itemId = this.getAttribute('data-id');
            const content = document.querySelector(`.timeline-content[data-for="${itemId}"]`);
            
            if (!content) return;
            
            // 如果当前项目已经激活，则关闭
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                content.classList.remove('active');
                return;
            }
            
            // 关闭其他激活的时间点和内容
            timelineItems.forEach(otherItem => otherItem.classList.remove('active'));
            timelineContents.forEach(otherContent => otherContent.classList.remove('active'));
            
            // 激活当前时间点和内容
            this.classList.add('active');
            content.classList.add('active');
        });
    });
    
    // 点击页面其他区域关闭所有时间点和内容
    document.addEventListener('click', function() {
        timelineItems.forEach(item => item.classList.remove('active'));
        timelineContents.forEach(content => content.classList.remove('active'));
    });
    
    // 阻止时间点内容区域的点击事件冒泡
    timelineContents.forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

// 球形模块交互功能
function initSphereInteractions() {
    const sphereModules = document.querySelectorAll('.sphere-module');
    
    sphereModules.forEach(module => {
        module.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 如果当前模块已经激活，则关闭
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                return;
            }
            
            // 关闭其他激活的球形模块
            sphereModules.forEach(otherModule => otherModule.classList.remove('active'));
            
            // 激活当前球形模块
            this.classList.add('active');
        });
    });
    
    // 点击页面其他区域关闭所有球形模块
    document.addEventListener('click', function() {
        sphereModules.forEach(module => module.classList.remove('active'));
    });
    
    // 阻止球形模块内容区域的点击事件冒泡
    sphereModules.forEach(module => {
        const content = module.querySelector('.sphere-content');
        if (content) {
            content.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });
}

// 平滑滚动功能
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // 只对页面内锚点链接（以#开头）进行平滑滚动处理
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // 减去导航栏高度
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // 外部页面链接（如christmas-video.html）将正常跳转
        });
    });
}

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.minimal-nav');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// 滚动动画效果
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.timeline-item, .sphere-module');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 页面加载完成后初始化滚动动画
window.addEventListener('load', function() {
    initScrollAnimations();
});



// 页面加载完成事件监听
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM内容加载完成，开始初始化页面...');
    
    // 隐藏加载状态
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('loading-hidden');
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }
    
    // 初始化页面功能
    initPage();
});

// 页面初始化函数
function initPage() {
    console.time('页面初始化时间');
    
    // 按优先级初始化功能
    initSmoothScrolling();
    initScrollListener();
    initInteractiveEffects();
    
    // 延迟加载非关键功能
    setTimeout(() => {
        renderTimelineContent();
        renderSpheresContent();
        initTimelineInteractions();
        initSphereInteractions();
        initScrollAnimations();
    }, 100);
    
    console.timeEnd('页面初始化时间');
}

// 滚动监听 - 优化性能
function initScrollListener() {
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    function updateNavbar() {
        const navbar = document.querySelector('.minimal-nav');
        const currentScrollY = window.scrollY;
        
        // 减少DOM操作频率
        if (Math.abs(currentScrollY - lastScrollY) > 10) {
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScrollY = currentScrollY;
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true }); // 添加passive选项提升滚动性能
}

// 交互效果 - 优化性能
function initInteractiveEffects() {
    let mouseX = 0, mouseY = 0;
    let rafId = null;
    
    function updateMouseEffect() {
        const timelineCircle = document.querySelector('.timeline-circle');
        if (timelineCircle) {
            const x = (mouseX / window.innerWidth) * 3 - 1.5;
            const y = (mouseY / window.innerHeight) * 3 - 1.5;
            timelineCircle.style.transform = `translate(-50%, -50%) rotate(${x + y}deg)`;
        }
        rafId = null;
    }
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 使用requestAnimationFrame减少更新频率
        if (!rafId) {
            rafId = requestAnimationFrame(updateMouseEffect);
        }
    }, { passive: true });
}

// 滚动动画 - 优化Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // 动画完成后停止观察
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.timeline-item, .sphere-module');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out)';
        observer.observe(el);
    });
}

// 性能监控
function initPerformanceMonitoring() {
    // 页面加载时间监控
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`页面加载完成，耗时: ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('页面加载时间较长，建议优化资源加载');
        }
    });
    
    // 资源加载错误监控
    window.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK') {
            console.error('资源加载失败:', e.target.src || e.target.href);
        }
    }, true);
    
    // 内存使用监控
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            console.log(`内存使用: ${Math.round(memory.usedJSHeapSize / 1048576)}MB / ${Math.round(memory.totalJSHeapSize / 1048576)}MB`);
        }, 30000);
    }
}

// 页面可见性监听 - 优化后台性能
function initVisibilityListener() {
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 页面不可见时暂停非必要动画
            console.log('页面进入后台，优化性能');
        } else {
            // 页面重新可见时恢复
            console.log('页面回到前台');
        }
    });
}

// 初始化性能监控和可见性监听
initPerformanceMonitoring();
initVisibilityListener();

// 鼠标移动效果已整合到initInteractiveEffects函数中