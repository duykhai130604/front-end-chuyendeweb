<template>
        <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow-lg" style="width: 350px; border-radius: 10px;">
            <h4 class="text-center mb-4">Register</h4>
            <div class="text-center mb-4">
                <img src="../../../assets/images/user.jpg" class="rounded-circle" alt="Shop Image" width="120" height="120">
            </div> 
            <form @submit.prevent="register">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter name">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter Password">
                </div>
                <div class="mb-3">
                    <label for="password_confirmation" class="form-label">Password confirmation</label>
                    <input v-model="password_confirmation" type="password" class="form-control" id="password_confirmation" placeholder="Enter Password">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter Email">
                </div>
                <div class="mb-3">
                    <label for="avatar" class="form-label">Avatar</label>
                    <input @change="onFileChange" type="file" class="form-control" id="avatar">
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary form-control">Register</button>
                </div>
            </form>
            <div class="text-center mt-3">
                <a href="#" class="text-decoration-none">Bạn đã có <span class="text-primary">tài khoản?</span></a>
            </div>
        </div>
    </div>
   </template>
<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            avatar: null // Thêm biến để lưu file ảnh
        }
    },
    methods: {
        onFileChange(event) {
            this.avatar = event.target.files[0]; // Lưu file vào biến avatar
        },
        async register() {
            const formData = new FormData(); // Tạo FormData để gửi dữ liệu
            formData.append('name', this.name);
            formData.append('email', this.email);
            formData.append('password', this.password);
            formData.append('password_confirmation', this.password_confirmation);
            formData.append('avatar', this.avatar); // Thêm file avatar vào FormData

            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                body: formData // Gửi FormData thay vì JSON
            });

            const data = await response.json();
            console.log(data);
            this.$router.push('/login');
        }
    }
}
</script>
