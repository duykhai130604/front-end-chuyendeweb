<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow-lg" style="width: 350px; border-radius: 10px;">
            <h4 class="text-center mb-4">Login</h4>
            <div class="text-center mb-4">
                <img src="../../../assets/images/user.jpg" class="rounded-circle" alt="Shop Image" width="120"
                    height="120">
            </div>
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input v-model="email" type="text" class="form-control" id="email" placeholder="Enter Email">
                    <small v-if="emailError" class="text-danger">{{ emailError }}</small>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password"
                        placeholder="Enter Password">
                    <small v-if="passwordError" class="text-danger">{{ passwordError }}</small>
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary form-control">Login</button>
                </div>
            </form>
            <div class="text-center mt-3">
                <!-- <a href="http://localhost:8080/reset" class="text-decoration-none">Bạn quên <span
                        class="text-primary">mật khẩu?</span></a><br> -->
                <a href="http://localhost:8080/reset" class="text-decoration-none">Bạn quên <span class="text-primary">mật khẩu?</span></a><br>
                <a href="#" class="text-decoration-none">Bạn chưa có <span class="text-primary">tài khoản?</span></a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
export default {
    data() {
        return {
            email: '',
            password: '',
            emailError: '', // Biến để lưu lỗi email
            passwordError: '' // Biến để lưu lỗi password
        };
    },
    methods: {
        reset() {
            this.$router.push({ name: 'list-blogs' }); // Đường dẫn đến danh sách blog
        },
        validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
            return re.test(email);
        },
        async login() {
            // Reset lỗi
            this.emailError = '';
            this.passwordError = '';

            // Kiểm tra email
            if (!this.email) {
                this.emailError = 'Email is required';
                return;
            } else if (!this.validateEmail(this.email)) {
                this.emailError = 'Invalid email format';
                return;
            }

            // Kiểm tra password
            if (!this.password) {
                this.passwordError = 'Password is required';
                return;
            }

            // Nếu không có lỗi, thực hiện login
            try {
                const response = await axios.post(API_BASE_URL + '/login', {
                    email: this.email,
                    password: this.password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true 
                });

                if (response) {
                    this.$store.commit('setUserRole', response.data.user.role); 
                    console.log("Role",this.$store.state.userRole);
                    
                    this.$router.push('/');
                }
                else {
                    console.log('that bai')
                }
            } catch (error) {
                console.error('Error:', error);
                this.emailError = 'An error occurred. Please try again later.';
            }
        }
    }
}
</script>
