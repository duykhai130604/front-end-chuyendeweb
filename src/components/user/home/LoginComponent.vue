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
                <a href="http://localhost:8080/reset" class="text-decoration-none">Bạn quên <span
                        class="text-primary">mật khẩu?</span></a><br>
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
            emailError: '', 
            passwordError: '' 
        };
    },
    methods: {
        reset() {
            this.$router.push({ name: 'list-blogs' }); 
        },
        validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
            return re.test(email);
        },
        async login() {
            this.emailError = '';
            this.passwordError = '';
            if (!this.email) {
                this.emailError = 'Email is required';
                return;
            } else if (!this.validateEmail(this.email)) {
                this.emailError = 'Invalid email format';
                return;
            }
            if (!this.password) {
                this.passwordError = 'Password is required';
                return;
            }
            try {
                const response = await axios.post(API_BASE_URL + '/login', {
                    email: this.email,
                    password: this.password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response && response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                    this.$store.commit('setUserRole', response.data.user.role);
                    console.log("Role", this.$store.state.userRole);
                    this.$router.push('/');
                } else {
                    console.log('Login failed');
                }
            } catch (error) {
                console.error('Error:', error);
                this.emailError = 'An error occurred. Please try again later.';
            }
        }

    }
}
</script>
