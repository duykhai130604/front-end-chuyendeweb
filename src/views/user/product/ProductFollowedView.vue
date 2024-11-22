<template>
    <TheHeader />
    <Cart/>
    <Slider/>
    <ProductFollowed/>
    <TheFooter />
    <router-view></router-view>
</template>
<script>

// Import CSS files
import "@/assets/vendor/bootstrap/css/bootstrap.min.css";
import '@/assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '@/assets/fonts/iconic/css/material-design-iconic-font.min.css';
import '@/assets/fonts/linearicons-v1.0.0/icon-font.min.css';
import '@/assets/vendor/animate/animate.css';
import '@/assets/vendor/css-hamburgers/hamburgers.min.css';
import '@/assets/vendor/animsition/css/animsition.min.css';
import '@/assets/vendor/select2/select2.min.css';
import '@/assets/vendor/daterangepicker/daterangepicker.css';
import '@/assets/vendor/slick/slick.css';
import '@/assets/vendor/MagnificPopup/magnific-popup.css';
import '@/assets/vendor/perfect-scrollbar/perfect-scrollbar.css';
import '@/assets/css/util.css';
import '@/assets/css/main.css';
// Import JavaScript files
import "@/assets/admin/assets/js/core/bootstrap.min copy";
import "@/assets/vendor/animsition/js/animsition.js";
import "@/assets/vendor/bootstrap/js/popper.js";
import "@/assets/vendor/select2/select2.js";
import "@/assets/vendor/daterangepicker/moment.js";
import "@/assets/vendor/daterangepicker/daterangepicker.js";
import "@/assets/vendor/slick/slick.min.js";
import "@/assets/js/slick-custom.js";
// import "@/assets/vendor/parallax100/parallax100.js";
import "@/assets/vendor/MagnificPopup/jquery.magnific-popup.min.js";
import "@/assets/vendor/isotope/isotope.pkgd.min.js";
import "@/assets/vendor/sweetalert/sweetalert.min.js";
import "@/assets/vendor/perfect-scrollbar/perfect-scrollbar.min.js";
import "@/assets/js/main.js";
// Khởi tạo Vue app và sử dụng router

import TheHeader from "@/components/user/TheHeader.vue";
import TheFooter from "@/components/user/TheFooter.vue";
import Cart from "@/components/user/home/HomeCart.vue";
import Slider from "@/components/user/home/HomeSlider.vue";
import ProductFollowed from "@/components/user/product/ProductFollowed.vue";

export default {
    components: {
        TheHeader, TheFooter,Cart, Slider,ProductFollowed
    }
}
</script>