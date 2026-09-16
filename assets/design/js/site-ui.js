(function () {
    'use strict';

    var $doc = document;
    var desktopBreakpoint = 1200;

    var menuData = {
        about: {
            type: 'list', className: 'site-dropdown-about',
            items: [
                ['О нас', 'about.html'],
                ['Дипломы и награды', 'documents.html'],
                ['Отзывы', '#'],
                ['Разрешения', 'documents.html']
            ]
        },
        products: {
            type: 'list',
            items: [
                ['Решения по обустройству нефтегазовых месторождений', 'catalog.html'],
                ['Блочные насосные станции', 'equipment.html'],
                ['Блочные кустовые насосные станции', 'equipment.html'],
                ['Блочно-комплектное газопромысловое оборудование', 'equipment.html'],
                ['Установки для исследования и замера товарной продукции', 'equipment.html'],
                ['Блочно-модульные здания', 'catalog.html']
            ]
        },
        licenses: {
            type: 'mega',
            groups: [
                ['Система качества', ['Сертификаты ISO', 'Внутренние стандарты качества', 'Политики в области качества']],
                ['Лицензии', ['Лицензии на осуществление деятельности', 'Разрешительная документация', 'Свидетельство о допуске СРО']],
                ['Сертификаты и декларации', ['Сертификаты соответствия', 'Декларация соответствия', 'Сертификаты на продукцию']],
                ['СОУТ', ['Результаты СОУТ', 'Карты специальной оценки', 'Мероприятия по улучшению условий труда']],
                ['Программы госгарантий', ['Участие в государственных программах', 'Гарантии качества продукции', 'Страховые документы']]
            ]
        },
        companies: {
            type: 'list',
            items: [
                ['АО «Уралтехнострой-Туймазыхиммаш»', '#'],
                ['ООО «Теплопанель»', '#'],
                ['ООО «Парк «Куль-Тау»', '#']
            ]
        }
    };

    var searchItems = [
        ['МБСНУ', 'equipment.html'],
        ['Блочные насосные станции', 'catalog.html'],
        ['Блочные кустовые насосные станции', 'catalog.html'],
        ['Блочно-комплектное газопромысловое оборудование', 'catalog.html'],
        ['Установки для исследования и замера товарной продукции', 'catalog.html'],
        ['Блочно-модульные здания', 'catalog.html'],
        ['О компании', 'about.html'],
        ['Открытые вакансии', 'vacancies.html'],
        ['Молодым специалистам', 'young-specialists.html'],
        ['Социальные программы для сотрудников', 'social-programs.html']
    ];

    function injectCss() {
        if ($doc.querySelector('link[data-site-ui-css]')) return;
        var link = $doc.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'assets/design/css/site-ui.css';
        link.setAttribute('data-site-ui-css', '1');
        $doc.head.appendChild(link);
    }

    function normalize(text) { return (text || '').replace(/\s+/g, ' ').trim().toLowerCase(); }

    function keyForTrigger(el) {
        var t = normalize(el.textContent);
        if (t.indexOf('о компании') !== -1) return 'about';
        if (t.indexOf('продукц') !== -1) return 'products';
        if (t.indexOf('лиценз') !== -1 || t.indexOf('сертификат') !== -1) return 'licenses';
        if (t.indexOf('группа компаний') !== -1) return 'companies';
        return null;
    }

    function closeDesktopMenus(except) {
        $doc.querySelectorAll('.site-desktop-dropdown.is-open').forEach(function (menu) {
            if (menu !== except) menu.classList.remove('is-open');
        });
        $doc.querySelectorAll('.site-dropdown-active').forEach(function (host) {
            if (!except || !host.contains(except)) host.classList.remove('site-dropdown-active');
        });
        $doc.querySelectorAll('[data-site-dropdown-trigger][aria-expanded="true"]').forEach(function (trigger) {
            if (!except || !trigger.parentElement.contains(except)) trigger.setAttribute('aria-expanded', 'false');
        });
    }

    function listDropdown(data) {
        var box = $doc.createElement('div');
        box.className = 'site-desktop-dropdown site-dropdown-list ' + (data.className || '');
        box.setAttribute('role', 'menu');
        data.items.forEach(function (item, index) {
            var a = $doc.createElement('a');
            a.href = item[1];
            a.textContent = item[0];
            if (index === 0) a.classList.add('is-current');
            if (item[1] === '#') a.addEventListener('click', function (e) { e.preventDefault(); });
            box.appendChild(a);
        });
        return box;
    }

    function megaDropdown(data) {
        var box = $doc.createElement('div');
        box.className = 'site-desktop-dropdown site-dropdown-mega';
        data.groups.forEach(function (group, groupIndex) {
            var col = $doc.createElement('div');
            col.className = 'site-mega-col';
            var title = $doc.createElement('span');
            title.className = 'site-mega-title';
            title.textContent = group[0];
            col.appendChild(title);
            var links = $doc.createElement('div');
            links.className = 'site-mega-links';
            group[1].forEach(function (text, itemIndex) {
                var a = $doc.createElement('a');
                a.href = 'documents.html';
                a.textContent = text;
                if (groupIndex === 0 && itemIndex === 0) a.classList.add('is-current');
                links.appendChild(a);
            });
            col.appendChild(links);
            box.appendChild(col);
        });
        return box;
    }

    function enhanceDesktopNavigation() {
        var triggers = Array.prototype.slice.call($doc.querySelectorAll('header .navigation > li.with-submenu > a, header .header-button.with-submenu'));
        triggers.forEach(function (trigger) {
            var key = keyForTrigger(trigger);
            if (!key || trigger.dataset.siteDropdownTrigger) return;
            trigger.dataset.siteDropdownTrigger = key;
            trigger.setAttribute('aria-haspopup', 'true');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.removeAttribute('data-unavailable');
            var host = trigger.closest('li') || trigger.parentElement;
            if (!host) return;
            if (key === 'licenses') host.classList.add('site-dropdown-mega-host');
            var menu = menuData[key].type === 'mega' ? megaDropdown(menuData[key]) : listDropdown(menuData[key]);
            host.appendChild(menu);
            trigger.addEventListener('click', function (e) {
                if (window.innerWidth < desktopBreakpoint) return;
                e.preventDefault();
                var opening = !menu.classList.contains('is-open');
                closeDesktopMenus(menu);
                menu.classList.toggle('is-open', opening);
                host.classList.toggle('site-dropdown-active', opening);
                trigger.setAttribute('aria-expanded', opening ? 'true' : 'false');
            });
            host.addEventListener('mouseenter', function () {
                if (window.innerWidth < desktopBreakpoint) return;
                closeDesktopMenus(menu);
                menu.classList.add('is-open');
                host.classList.add('site-dropdown-active');
                trigger.setAttribute('aria-expanded', 'true');
            });
            host.addEventListener('mouseleave', function () {
                if (window.innerWidth < desktopBreakpoint) return;
                menu.classList.remove('is-open');
                host.classList.remove('site-dropdown-active');
                trigger.setAttribute('aria-expanded', 'false');
            });
        });
        $doc.addEventListener('click', function (e) {
            if (!e.target.closest('[data-site-dropdown-trigger], .site-desktop-dropdown')) closeDesktopMenus();
        });
    }

    function searchSvg() {
        return '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M8.2 13.4a5.2 5.2 0 1 0 0-10.4 5.2 5.2 0 0 0 0 10.4Zm3.8-1.4 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    }

    function ensureMobileActions() {
        $doc.querySelectorAll('header').forEach(function (header) {
            if (header.querySelector('.site-mobile-actions')) return;
            var row = header.querySelector('.container > .row') || header.querySelector('.container');
            if (!row) return;
            var actions = $doc.createElement('div');
            actions.className = 'site-mobile-actions';
            actions.innerHTML = '<button class="site-mobile-search" type="button" aria-label="Поиск">' + searchSvg() + '</button><button class="site-mobile-toggle" type="button" aria-label="Открыть меню" aria-expanded="false"><i></i></button>';
            row.appendChild(actions);
        });
    }

    function mobileItem(label, href, subitems, opened) {
        var item = $doc.createElement('div');
        item.className = 'site-mobile-item' + (opened ? ' is-open' : '');
        if (subitems && subitems.length) {
            var button = $doc.createElement('button');
            button.type = 'button';
            button.className = 'site-mobile-row';
            button.setAttribute('aria-expanded', opened ? 'true' : 'false');
            button.innerHTML = '<span>' + label + '</span><i class="site-mobile-chevron"></i>';
            item.appendChild(button);
            var sub = $doc.createElement('div');
            sub.className = 'site-mobile-submenu';
            subitems.forEach(function (entry) {
                var a = $doc.createElement('a');
                a.href = entry[1];
                a.textContent = entry[0];
                if (entry[1] === '#') a.addEventListener('click', function (e) { e.preventDefault(); });
                sub.appendChild(a);
            });
            item.appendChild(sub);
            button.addEventListener('click', function () {
                var isOpen = item.classList.toggle('is-open');
                button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });
        } else {
            var a = $doc.createElement('a');
            a.className = 'site-mobile-row';
            a.href = href || '#';
            a.textContent = label;
            if (!href || href === '#') a.addEventListener('click', function (e) { e.preventDefault(); });
            item.appendChild(a);
        }
        return item;
    }

    function buildMobileMenu() {
        if ($doc.getElementById('siteMobileMenu')) return $doc.getElementById('siteMobileMenu');
        var menu = $doc.createElement('div');
        menu.id = 'siteMobileMenu';
        menu.className = 'site-mobile-menu';
        menu.setAttribute('aria-hidden', 'true');
        menu.innerHTML = '<div class="site-mobile-menu-head"><a href="index.html"><img class="site-mobile-menu-logo" src="uploads/logo-white.svg" alt="Уралтехнострой"></a><div class="site-mobile-menu-actions"><button class="site-mobile-icon-button site-mobile-menu-search" type="button" aria-label="Поиск">' + searchSvg() + '</button><button class="site-mobile-icon-button site-mobile-close" type="button" aria-label="Закрыть меню"></button></div></div><div class="site-mobile-menu-body"><nav class="site-mobile-nav" aria-label="Мобильная навигация"></nav><div class="site-mobile-contacts"><div class="site-mobile-contact"><span>Номера телефонов</span><a href="tel:+73472166661">+7(347) 216-66-61</a><a href="tel:+73472165221">+7(347) 216-52-21</a></div><div class="site-mobile-contact"><span>Адрес электронной почты</span><a href="mailto:info@uralts.ru">info@uralts.ru</a></div></div></div>';
        var nav = menu.querySelector('.site-mobile-nav');
        nav.appendChild(mobileItem('О компании', 'about.html', menuData.about.items, false));
        nav.appendChild(mobileItem('Продукция', 'catalog.html', menuData.products.items, false));
        nav.appendChild(mobileItem('Лицензии и сертификаты', 'documents.html', [
            ['Система качества', 'documents.html'], ['Лицензии', 'documents.html'], ['Сертификаты и декларации', 'documents.html'], ['СОУТ', 'documents.html'], ['Программы госгарантий', 'documents.html']
        ], false));
        nav.appendChild(mobileItem('Карьера', 'vacancies.html', [
            ['Открытые вакансии', 'vacancies.html'], ['Молодым специалистам', 'young-specialists.html'], ['Социальные программы', 'social-programs.html']
        ], false));
        nav.appendChild(mobileItem('Закупки', '#', null, false));
        nav.appendChild(mobileItem('Пресс-релиз', 'press-releases.html', null, false));
        nav.appendChild(mobileItem('Группа компаний', '#', menuData.companies.items, true));
        nav.appendChild(mobileItem('Контакты', 'contacts.html', null, false));
        $doc.body.appendChild(menu);
        return menu;
    }

    function initMobileMenu() {
        ensureMobileActions();
        var menu = buildMobileMenu();
        function openMenu() {
            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            $doc.body.classList.add('site-ui-locked');
            $doc.querySelectorAll('.site-mobile-toggle').forEach(function (btn) { btn.setAttribute('aria-expanded', 'true'); });
        }
        function closeMenu() {
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            $doc.body.classList.remove('site-ui-locked');
            $doc.querySelectorAll('.site-mobile-toggle').forEach(function (btn) { btn.setAttribute('aria-expanded', 'false'); });
        }
        $doc.addEventListener('click', function (e) {
            if (e.target.closest('.site-mobile-toggle')) { e.preventDefault(); openMenu(); }
            if (e.target.closest('.site-mobile-close')) { e.preventDefault(); closeMenu(); }
        });
        window.addEventListener('resize', function () { if (window.innerWidth >= desktopBreakpoint) closeMenu(); });
        return { close: closeMenu };
    }

    function buildSearch() {
        if ($doc.getElementById('siteSearchOverlay')) return $doc.getElementById('siteSearchOverlay');
        var overlay = $doc.createElement('div');
        overlay.id = 'siteSearchOverlay';
        overlay.className = 'site-search-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML = '<section class="site-search-dialog" role="dialog" aria-modal="true" aria-labelledby="siteSearchTitle"><div class="site-search-header"><h2 id="siteSearchTitle" class="site-search-title">Что хотите найти?</h2><button class="site-search-close" type="button" aria-label="Закрыть">×</button></div><label class="site-search-field"><input type="search" autocomplete="off" placeholder="Введите запрос"><span>' + searchSvg() + '</span></label><div class="site-search-results"><div class="site-search-meta"></div><div class="site-search-grid"></div></div></section>';
        $doc.body.appendChild(overlay);
        var input = overlay.querySelector('input');
        var meta = overlay.querySelector('.site-search-meta');
        var grid = overlay.querySelector('.site-search-grid');
        function render() {
            var q = normalize(input.value);
            var results = searchItems.filter(function (item) { return !q || normalize(item[0]).indexOf(q) !== -1; });
            meta.textContent = q ? 'По вашему запросу найдено ' + results.length + ' результатов' : 'Популярные разделы сайта';
            grid.innerHTML = '';
            if (!results.length) {
                var empty = $doc.createElement('div');
                empty.className = 'site-search-empty';
                empty.textContent = 'По вашему запросу ничего не найдено';
                grid.appendChild(empty);
                return;
            }
            results.forEach(function (item) {
                var a = $doc.createElement('a');
                a.className = 'site-search-card';
                a.href = item[1];
                a.innerHTML = '<strong>' + item[0] + '</strong>';
                grid.appendChild(a);
            });
        }
        input.addEventListener('input', render);
        render();
        return overlay;
    }

    function initSearch(mobileApi) {
        var overlay = buildSearch();
        var input = overlay.querySelector('input');
        function openSearch() {
            mobileApi.close();
            overlay.classList.add('is-open');
            overlay.setAttribute('aria-hidden', 'false');
            $doc.body.classList.add('site-ui-locked');
            window.setTimeout(function () { input.focus(); }, 20);
        }
        function closeSearch() {
            overlay.classList.remove('is-open');
            overlay.setAttribute('aria-hidden', 'true');
            $doc.body.classList.remove('site-ui-locked');
        }
        $doc.querySelectorAll('.search-button').forEach(function (button) { button.removeAttribute('data-unavailable'); });
        $doc.addEventListener('click', function (e) {
            if (e.target.closest('.search-button,.site-mobile-search,.site-mobile-menu-search')) { e.preventDefault(); openSearch(); }
            if (e.target.closest('.site-search-close')) { e.preventDefault(); closeSearch(); }
            if (e.target === overlay) closeSearch();
        });
        $doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeSearch(); });
    }

    function initPressTabs() {
        var years = $doc.querySelector('.inner-years');
        var grid = $doc.querySelector('.news-grid');
        if (!years || !grid) return;
        var cards = Array.prototype.slice.call(grid.children).filter(function (el) { return el.querySelector('.news-item'); });
        var buttons = Array.prototype.slice.call(years.querySelectorAll('button'));
        buttons.forEach(function (button) { button.removeAttribute('data-unavailable'); });
        var empty = $doc.createElement('p');
        empty.className = 'press-year-empty';
        empty.textContent = 'Материалы за выбранный год пока не опубликованы.';
        grid.appendChild(empty);
        function apply(year) {
            var visible = 0;
            cards.forEach(function (card) {
                var time = card.querySelector('time[datetime]');
                var cardYear = time ? time.getAttribute('datetime').slice(0, 4) : '';
                var show = cardYear === year;
                card.hidden = !show;
                if (show) visible += 1;
            });
            empty.hidden = visible > 0;
            buttons.forEach(function (btn) {
                var active = btn.textContent.trim() === year;
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
        }
        buttons.forEach(function (button) { button.addEventListener('click', function () { apply(button.textContent.trim()); }); });
        var existingYears = cards.map(function (card) {
            var time = card.querySelector('time[datetime]'); return time ? time.getAttribute('datetime').slice(0, 4) : '';
        }).filter(Boolean);
        var active = years.querySelector('button.active');
        var initial = active ? active.textContent.trim() : (existingYears[0] || buttons[0].textContent.trim());
        if (existingYears.length && existingYears.indexOf(initial) === -1) initial = existingYears[0];
        apply(initial);
    }

    function initHistorySlider() {
        var slider = $doc.querySelector('.history-slider');
        if (!slider || !window.jQuery || !window.jQuery.fn || !window.jQuery.fn.slick) return;
        var $ = window.jQuery;
        if ($(slider).hasClass('slick-initialized')) return;
        $(slider).slick({ infinite: false, slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: false, adaptiveHeight: false });
        var controls = slider.parentElement.querySelector('.history-controls');
        if (controls) {
            var prev = controls.querySelector('[data-history-prev]');
            var next = controls.querySelector('[data-history-next]');
            if (prev) prev.addEventListener('click', function () { $(slider).slick('slickPrev'); });
            if (next) next.addEventListener('click', function () { $(slider).slick('slickNext'); });
        }
    }

    function init() {
        injectCss();
        enhanceDesktopNavigation();
        var mobileApi = initMobileMenu();
        initSearch(mobileApi);
        initPressTabs();
        initHistorySlider();
    }

    if ($doc.readyState === 'loading') $doc.addEventListener('DOMContentLoaded', init); else init();
}());
