<template>
    <TheHeader />
    <Cart/>
    <Slider/>
    <HomeBanner/>
    <HomeAllProducts/>
    <TheFooter />
    <ProductModal/>
    <router-view></router-view>

</template>
<script>
import TheHeader from "../../components/user/TheHeader.vue";
import TheFooter from "../../components/user/TheFooter.vue";
import Cart from "../../components/user/home/HomeCart.vue";
import Slider from "../../components/user/home/HomeSlider.vue";
import HomeBanner from "../../components/user/home/HomeBanner.vue";
import HomeAllProducts from "../../components/user/home/HomeAllProducts.vue";
import ProductModal from "../../components/user/ProductModal.vue";
import "../../assets/js/main.js";
export default {
    components: {
        TheHeader, TheFooter,Cart, Slider, HomeBanner, HomeAllProducts,ProductModal
    }
}
</script>