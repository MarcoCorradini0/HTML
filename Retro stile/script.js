document.querySelectorAll('a[href^="#"]').forEach(element => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const main = document.querySelector('main');

        if (targetElement) {
            main.scrollTo({
                top: targetElement.offsetTop - main.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});