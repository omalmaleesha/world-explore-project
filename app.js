function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScroll() {
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        if (isElementInViewport(card)) {
            card.classList.add('visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', handleScroll);
window.addEventListener('scroll', handleScroll);