(function () {
    'use strict';

    var dialog = document.querySelector('#availabilityDialog');

    document.querySelectorAll('[data-unavailable]').forEach(function (button) {
        if (button.matches('.search-button,.header-button.with-submenu,[data-site-dropdown-trigger],.inner-years button')) return;
        button.addEventListener('click', function (event) {
            event.preventDefault();
            if (!dialog) return;
            dialog.querySelector('p').textContent = button.getAttribute('data-unavailable');
            dialog.showModal();
        });
    });

    if (dialog) {
        var close = dialog.querySelector('button');
        if (close) close.addEventListener('click', function () { dialog.close(); });
    }

    document.querySelectorAll('[data-gallery-index]').forEach(function (button) {
        button.addEventListener('click', function () {
            var index = Number(button.getAttribute('data-gallery-index'));
            document.querySelectorAll('[data-gallery-index]').forEach(function (item) {
                var selected = item === button;
                item.classList.toggle('active', selected);
                item.setAttribute('aria-pressed', String(selected));
            });
            var image = document.querySelector('.equipment-image');
            if (image) image.style.transform = index === 1 ? 'scaleX(-1)' : '';
        });
    });
}());
