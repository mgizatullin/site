(function () {
    'use strict';
    var toggle = document.querySelector('.menu-toggler');
    var menu = document.querySelector('#internalNavigation');
    function closeMenu() {
        if (!toggle || !menu) return;
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
    }
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            var open = toggle.getAttribute('aria-expanded') !== 'true';
            toggle.setAttribute('aria-expanded', String(open));
            menu.classList.toggle('is-open', open);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menu.classList.contains('is-open')) { closeMenu(); toggle.focus(); }
        });
        document.addEventListener('click', function (e) {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
        });
        window.addEventListener('resize', function () { if (window.innerWidth >= 1200) closeMenu(); });
    }
    var dialog = document.querySelector('#availabilityDialog');
    document.querySelectorAll('[data-unavailable]').forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            if (!dialog) return;
            dialog.querySelector('p').textContent = button.getAttribute('data-unavailable');
            dialog.showModal();
        });
    });
    if (dialog) dialog.querySelector('button').addEventListener('click', function () { dialog.close(); });
    document.querySelectorAll('[data-gallery-index]').forEach(function (button) {
        button.addEventListener('click', function () {
            var index = Number(button.getAttribute('data-gallery-index'));
            document.querySelectorAll('[data-gallery-index]').forEach(function (item) {
                var selected = item === button;
                item.classList.toggle('active', selected);
                item.setAttribute('aria-pressed', String(selected));
            });
            var image = document.querySelector('.equipment-image');
            if (image) { image.style.transform = index === 1 ? 'scaleX(-1)' : ''; }
        });
    });
}());
