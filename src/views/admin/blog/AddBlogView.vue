<template>
    <div>
        <div class="wrapper">
            <SideBarComponent />
            <div class="main-panel">
                <div class="main-header">
                    <HeaderComponent />
                    <NavbarComponent />
                </div>
                <div class="container">
                    <div class="page-inner">
                        <AddBlog />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "../../../assets/admin/assets/js/plugin/webfont/webfont.min";
import "../../../assets/admin/assets/css/bootstrap.min.css";
import "../../../assets/admin/assets/css/kaiadmin.min.css";
import "../../../assets/admin/assets/css/demo.css";
import "../../../assets/admin/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js";
import "../../../assets/admin/assets/js/core/bootstrap.min copy"; 
import "../../../assets/admin/assets/js/core/jquery-3.7.1.min copy"; 
import AddBlog from "@/components/admin/blog/AddBlog.vue"; 
import NavbarComponent from "@/components/admin/NavbarComponent.vue";
import HeaderComponent from "@/components/admin/HeaderComponent.vue";
import SideBarComponent from "@/components/admin/SideBarComponent.vue";

export default {
    components: {
        HeaderComponent,
        NavbarComponent,
        SideBarComponent,
        AddBlog
    },
}
</script>
