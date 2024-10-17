<template>
    <AdminDashboard/>
    <router-view></router-view>
</template>
<script>
import AdminDashboard from "../../components/admin/home/AdminDashboard.vue";
export default {
    components: {
        AdminDashboard
    }
}
</script>
