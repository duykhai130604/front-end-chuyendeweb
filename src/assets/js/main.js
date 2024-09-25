document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // Load page
    const animsitionElements = document.querySelectorAll(".animsition");
    animsitionElements.forEach((element) => {
        element.classList.add('fade-in');
        setTimeout(() => {
            element.classList.remove('fade-in');
        }, 15000000);
    });

    // Back to top button
    const myBtn = document.getElementById("myBtn");
    const windowH = window.innerHeight / 2;

    window.addEventListener('scroll', function () {
        if (window.scrollY > windowH) {
            //myBtn.style.display = 'flex';   
        } else {
            //myBtn.style.display = 'none';
        }
    });

    myBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Fixed Header
    const headerDesktop = document.querySelector('.container-menu-desktop');
    const wrapMenu = document.querySelector('.wrap-menu-desktop');

    let posWrapHeader = document.querySelector('.top-bar') ? document.querySelector('.top-bar').offsetHeight : 0;

    function checkScroll() {
        if (window.scrollY > posWrapHeader) {
            headerDesktop.classList.add('fix-menu-desktop');
            wrapMenu.style.top = '0';
        } else {
            headerDesktop.classList.remove('fix-menu-desktop');
            wrapMenu.style.top = posWrapHeader - window.scrollY + 'px';
        }
    }

    window.addEventListener('scroll', checkScroll);

    // Menu mobile
    const mobileMenuButton = document.querySelector('.btn-show-menu-mobile');
    const menuMobile = document.querySelector('.menu-mobile');

    mobileMenuButton.addEventListener('click', function () {
        this.classList.toggle('is-active');
        menuMobile.style.display = menuMobile.style.display === 'block' ? 'none' : 'block';
    });

    const arrowMainMenu = document.querySelectorAll('.arrow-main-menu-m');
    arrowMainMenu.forEach((arrow) => {
        arrow.addEventListener('click', function () {
            const subMenu = this.parentElement.querySelector('.sub-menu-m');
            subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
            this.classList.toggle('turn-arrow-main-menu-m');
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 992) {
            if (menuMobile.style.display === 'block') {
                menuMobile.style.display = 'none';
                mobileMenuButton.classList.toggle('is-active');
            }

            const subMenus = document.querySelectorAll('.sub-menu-m');
            subMenus.forEach((subMenu) => {
                if (subMenu.style.display === 'block') {
                    subMenu.style.display = 'none';
                    arrowMainMenu.forEach((arrow) => arrow.classList.remove('turn-arrow-main-menu-m'));
                }
            });
        }
    });

    // Show / hide modal search
    const searchModal = document.querySelector('.modal-search-header');
    const showModalSearchButton = document.querySelector('.js-show-modal-search');
    const hideModalSearchButton = document.querySelector('.js-hide-modal-search');

    showModalSearchButton.addEventListener('click', function () {
        searchModal.classList.add('show-modal-search');
        this.style.opacity = '0';
    });

    hideModalSearchButton.addEventListener('click', function () {
        searchModal.classList.remove('show-modal-search');
        showModalSearchButton.style.opacity = '1';
    });

    const containerSearchHeader = document.querySelector('.container-search-header');
    containerSearchHeader.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Isotope (requires isotope.js)
   // const topeContainer = document.querySelector('.isotope-grid');
    const filterButtons = document.querySelectorAll('.filter-tope-group button');

    filterButtons.forEach((button) => {
        button.addEventListener('click', function () {
            //const filterValue = this.getAttribute('data-filter');
            // Assuming you have Isotope loaded
            // topeContainer.isotope({ filter: filterValue }); // Uncomment if using Isotope
        });
    });

    // Cart
    const showCartButton = document.querySelector('.js-show-cart');
    const hideCartButton = document.querySelector('.js-hide-cart');
    const cartPanel = document.querySelector('.js-panel-cart');

    showCartButton.addEventListener('click', function () {
        cartPanel.classList.add('show-header-cart');
    });

    hideCartButton.addEventListener('click', function () {
        cartPanel.classList.remove('show-header-cart');
    });

    // Product count +/- buttons
    const numProductDownButtons = document.querySelectorAll('.btn-num-product-down');
    const numProductUpButtons = document.querySelectorAll('.btn-num-product-up');

    numProductDownButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const input = this.nextElementSibling;
            const numProduct = Number(input.value);
            if (numProduct > 0) {
                input.value = numProduct - 1;
            }
        });
    });

    numProductUpButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const numProduct = Number(input.value);
            input.value = numProduct + 1;
        });
    });

    // Rating
    const ratingContainers = document.querySelectorAll('.wrap-rating');
    ratingContainers.forEach((container) => {
        const items = container.querySelectorAll('.item-rating');
        let ratedIndex = -1;
        const input = container.querySelector('input');
        input.value = 0;

        items.forEach((item, index) => {
            item.addEventListener('mouseenter', function () {
                for (let i = 0; i <= index; i++) {
                    items[i].classList.remove('zmdi-star-outline');
                    items[i].classList.add('zmdi-star');
                }
                for (let j = index + 1; j < items.length; j++) {
                    items[j].classList.add('zmdi-star-outline');
                    items[j].classList.remove('zmdi-star');
                }
            });

            item.addEventListener('click', function () {
                ratedIndex = index;
                input.value = index + 1;
            });
        });

        container.addEventListener('mouseleave', function () {
            for (let i = 0; i <= ratedIndex; i++) {
                items[i].classList.remove('zmdi-star-outline');
                items[i].classList.add('zmdi-star');
            }
            for (let j = ratedIndex + 1; j < items.length; j++) {
                items[j].classList.add('zmdi-star-outline');
                items[j].classList.remove('zmdi-star');
            }
        });
    });

    // Show modal1
    const showModal1Buttons = document.querySelectorAll('.js-show-modal1');
    const modal1 = document.querySelector('.js-modal1');

    showModal1Buttons.forEach((button) => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            modal1.classList.add('show-modal1');
        });
    });

    const hideModal1Button = document.querySelector('.js-hide-modal1');
    hideModal1Button.addEventListener('click', function () {
        modal1.classList.remove('show-modal1');
    });
});
