<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow-lg" style="width: 350px; border-radius: 10px;">
            <h4 class="text-center mb-4">Register</h4>
            <div class="text-center mb-4">
                <img src="../../../assets/images/user.jpg" class="rounded-circle" alt="Shop Image" width="120" height="120">
            </div>
            <form @submit.prevent="reset">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter name">
                    <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter Email">
                    <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter Password">
                    <span v-if="errors.password" class="text-danger">{{ errors.password }}</span>
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary form-control">Reset</button>
                </div>
            </form>           
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            errors: {} // Biến để lưu các thông báo lỗi
        };
    },
methods: {
        onFileChange(event) {
            this.avatar = event.target.files[0]; // Lưu file vào biến avatar
        },
        async reset() {
            this.errors = {}; // Reset lỗi trước khi kiểm tra
            let valid = true;

            // Kiểm tra email và định dạng email
            if (!this.email) {
                this.errors.email = 'Email is required';
                valid = false;
            } else if (!this.validateEmail(this.email)) {
                this.errors.email = 'Invalid email format';
                valid = false;
            }

            // Nếu tất cả điều kiện hợp lệ
            if (valid) {
                const formData = new FormData();
                formData.append('name', this.name);
                formData.append('email', this.email);
                formData.append('password', this.password);

                try {
                    const response = await axios.post('http://localhost:8000/api/reset', formData);
                    if (response){
                        this.$router.push({ name: 'login' });                    }
                    
                } catch (error) {
                    console.error('Error:', error);
                    this.errors.global = 'An unexpected error occurred. Please try again later.'; // Thông báo lỗi toàn cầu
                }
            }
        },
        validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
            return re.test(email);
        }
    }
};
</script>
