document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            alert('Item has been added to your cart!');
        });
    });

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
});
