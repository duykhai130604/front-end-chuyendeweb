<template>
    <TheHeader />
    <Cart/>
    <Slider/>
    <TheFooter />
    <router-view></router-view>

</template>
<script>
import TheHeader from "../../components/user/TheHeader.vue";
import TheFooter from "../../components/user/TheFooter.vue";
import Cart from "../../components/user/home/HomeCart.vue";
import Slider from "../../components/user/home/HomeSlider.vue";
export default {
    components: {
        TheHeader, TheFooter,Cart, Slider
    }
}
</script>