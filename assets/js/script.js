// Performance Optimization: Use Event Delegation
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn button');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // Lazy Loading Images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Product Tabs
    const tabList = document.querySelector('[role="tablist"]');
    if (tabList) {
        const tabs = tabList.querySelectorAll('[role="tab"]');
        
        tabList.addEventListener('click', (e) => {
            const target = e.target.closest('[role="tab"]');
            if (!target) return;
            
            // Update selected state
            tabs.forEach(tab => {
                tab.setAttribute('aria-selected', tab === target);
                tab.classList.toggle('active', tab === target);
            });
            
            // Show corresponding panel
            const panelId = target.getAttribute('aria-controls');
            document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
                panel.hidden = panel.id !== panelId;
            });
        });

        // Keyboard navigation for tabs
        tabList.addEventListener('keydown', (e) => {
            const target = e.target.closest('[role="tab"]');
            if (!target) return;
            
            const tabArray = Array.from(tabs);
            const index = tabArray.indexOf(target);
            
            let newTab;
            switch (e.key) {
                case 'ArrowLeft':
                    newTab = tabArray[index - 1] || tabArray[tabArray.length - 1];
                    break;
                case 'ArrowRight':
                    newTab = tabArray[index + 1] || tabArray[0];
                    break;
                default:
                    return;
            }
            
            newTab.focus();
            newTab.click();
            e.preventDefault();
        });
    }

    // Add to Cart Functionality with Debounce
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    document.addEventListener('click', debounce((e) => {
        const addButton = e.target.closest('.add-btn');
        if (!addButton) return;
        
        const productCard = addButton.closest('.product-card');
        if (!productCard) return;
        
        const confirmationMessage = productCard.querySelector('.confirmation-message');
        if (confirmationMessage) {
            confirmationMessage.style.display = 'block';
            setTimeout(() => {
                confirmationMessage.style.display = 'none';
            }, 2000);
        }
    }, 300));

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .product-card, .review-card').forEach(el => {
        observer.observe(el);
    });
});

// Error Handling and Reporting
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
    // You can add your error reporting service here
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const timing = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', timing.loadEventEnd - timing.navigationStart);
    });
}