/* eslint-disable */(function () {
  // USE STRICT
  "use strict";

  // Function to select elements
  function select(selector, context = document) {
      return context.querySelectorAll(selector);
  }

  /*==================================================================
  [ Slick1 ]*/
  select('.wrap-slick1').forEach(function (wrapSlick1) {
      const slick1 = wrapSlick1.querySelector('.slick1');
      const itemSlick1 = slick1.querySelectorAll('.item-slick1');
      const layerSlick1 = slick1.querySelectorAll('.layer-slick1');
      let actionSlick1 = [];

      function initSlick() {
          const layerCurrentItem = itemSlick1[0].querySelectorAll('.layer-slick1');

          // Clear timeouts
          actionSlick1.forEach(timeout => clearTimeout(timeout));
          layerSlick1.forEach(layer => {
              layer.classList.remove(layer.dataset.appear, 'visible-true');
          });

          layerCurrentItem.forEach((layer, index) => {
              actionSlick1[index] = setTimeout(() => {
                  layer.classList.add(layer.dataset.appear, 'visible-true');
              }, layer.dataset.delay);
          });
      }

      // Initialize Slick
      $(slick1).slick({
          pauseOnFocus: false,
          pauseOnHover: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          speed: 1000,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 6000,
          arrows: true,
          appendArrows: wrapSlick1,
          prevArrow: '<button class="arrow-slick1 prev-slick1"><i class="zmdi zmdi-caret-left"></i></button>',
          nextArrow: '<button class="arrow-slick1 next-slick1"><i class="zmdi zmdi-caret-right"></i></button>',
          dots: wrapSlick1.querySelector('.wrap-slick1-dots') !== null,
          appendDots: wrapSlick1.querySelector('.wrap-slick1-dots'),
          dotsClass: 'slick1-dots',
          customPaging: function (slick, index) {
              const linkThumb = slick.$slides[index].dataset.thumb;
              const caption = slick.$slides[index].dataset.caption;
              return '<img src="' + linkThumb + '">' +
                  '<span class="caption-dots-slick1">' + caption + '</span>';
          },
      });

      slick1.addEventListener('afterChange', function (event) {
          const currentSlide = event.detail.currentSlide;
          const layerCurrentItem = itemSlick1[currentSlide].querySelectorAll('.layer-slick1');

          actionSlick1.forEach(timeout => clearTimeout(timeout));
          layerSlick1.forEach(layer => {
              layer.classList.remove(layer.dataset.appear, 'visible-true');
          });

          layerCurrentItem.forEach((layer, index) => {
              actionSlick1[index] = setTimeout(() => {
                  layer.classList.add(layer.dataset.appear, 'visible-true');
              }, layer.dataset.delay);
          });
      });

      initSlick();
  });

  /*==================================================================
  [ Slick2 ]*/
  select('.wrap-slick2').forEach(function (wrapSlick2) {
      const slick2 = wrapSlick2.querySelector('.slick2');
      $(slick2).slick({
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          autoplay: false,
          autoplaySpeed: 6000,
          arrows: true,
          appendArrows: wrapSlick2,
          prevArrow: '<button class="arrow-slick2 prev-slick2"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
          nextArrow: '<button class="arrow-slick2 next-slick2"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
          responsive: [
              {
                  breakpoint: 1200,
                  settings: {
                      slidesToShow: 4,
                      slidesToScroll: 4
                  }
              },
              {
                  breakpoint: 992,
                  settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3
                  }
              },
              {
                  breakpoint: 768,
                  settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                  }
              },
              {
                  breakpoint: 576,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                  }
              }
          ]
      });
  });

  // Handle tab change
  select('a[data-toggle="tab"]').forEach(function (tab) {
      tab.addEventListener('shown.bs.tab', function (e) {
          const nameTab = e.target.getAttribute('href');
          select(nameTab).forEach(function (element) {
              const slick2 = element.querySelector('.slick2');
              $(slick2).slick('reinit');
          });
      });
  });

  /*==================================================================
  [ Slick3 ]*/
  select('.wrap-slick3').forEach(function (wrapSlick3) {
      const slick3 = wrapSlick3.querySelector('.slick3');
      $(slick3).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 6000,
          arrows: true,
          appendArrows: wrapSlick3.querySelector('.wrap-slick3-arrows'),
          prevArrow: '<button class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
          nextArrow: '<button class="arrow-slick3 next-slick3"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
          dots: true,
          appendDots: wrapSlick3.querySelector('.wrap-slick3-dots'),
          dotsClass: 'slick3-dots',
          customPaging: function (slick, index) {
              const portrait = slick.$slides[index].dataset.thumb;
              return '<img src="' + portrait + '"/><div class="slick3-dot-overlay"></div>';
          },
      });
  });

})();
