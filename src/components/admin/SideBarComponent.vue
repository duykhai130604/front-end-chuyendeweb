
<template>
    <div class="sidebar" data-background-color="dark">
        <div class="sidebar-logo">
            <div class="logo-header" data-background-color="dark">
                <a href="index.html" class="logo">
                    <img src="../../assets/admin/assets/img/kaiadmin/logo_light.png" alt="navbar brand" class="navbar-brand" height="20" />
                </a>
                <div class="nav-toggle">
                    <button class="btn btn-toggle toggle-sidebar">
                        <i class="gg-menu-right"></i>
                    </button>
                    <button class="btn btn-toggle sidenav-toggler">
                        <i class="gg-menu-left"></i>
                    </button>
                </div>
                <button class="topbar-toggler more">
                    <i class="gg-more-vertical-alt"></i>
                </button>
            </div>
        </div>
        <div class="sidebar-wrapper scrollbar scrollbar-inner">
            <div class="sidebar-content">
                <ul class="nav nav-secondary">
                    <li class="nav-item">
                        <router-link to="/admin">Dashboard</router-link>
                    </li>
                    <li class="nav-section">
                        <span class="sidebar-mini-icon">
                            <i class="fa fa-ellipsis-h"></i>
                        </span>
                        <h4 class="text-section">Manage</h4>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/categories">Categories</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/products">Products</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/orders">Orders</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/blogs">Blogs</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/purchase">Purchase Trends</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideBarComponent',
};
</script>

<style scoped>
/* Thêm CSS nếu cần */
</style>
