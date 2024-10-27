<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow-lg" style="width: 350px; border-radius: 10px;">
            <h4 class="text-center mb-4">Your Profile</h4>
            <div class="text-center mb-4">
                <img :src="profileImage" class="rounded-circle" alt="Profile Image" width="120" height="120">
            </div>
            <form @submit.prevent="updateProfile">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" v-model="formData.username" placeholder="Enter Username">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="formData.email" placeholder="Enter Email">
                </div>
                <div class="mb-3">
                    <label for="avatar" class="form-label">Avatar</label>
                    <input type="file" class="form-control" id="avatar" @change="onFileChange">
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-success">Sửa</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                username: '',
                email: '',
                avatar: null,
            },
            profileImage: 'assets/img/blogpost.jpg', // Đường dẫn ảnh mặc định
        };
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.formData.avatar = file;
                this.profileImage = URL.createObjectURL(file); // Hiển thị ảnh mới khi chọn file
            }
        },
        updateProfile() {
            // Xử lý cập nhật profile ở đây, ví dụ: gọi API
            console.log('Profile Data:', this.formData);
            // Thực hiện các hành động khác (gọi API, xử lý lưu dữ liệu, v.v.)
        }
    }
};
</script>

<style scoped>
.container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.card {
    width: 350px;
    padding: 20px;
    border-radius: 10px;
}
</style>
