<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow-lg" style="width: 350px; border-radius: 10px;">
            <h4 class="text-center mb-4">Register</h4>
            <div class="text-center mb-4">
                <img src="../../../assets/images/user.jpg" class="rounded-circle" alt="Shop Image" width="120" height="120">
            </div>
            <form @submit.prevent="reset">
                <span v-if="errors.global" class="text-danger">{{ errors.global }}</span>
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
                    <button :disabled="loading" type="submit" class="btn btn-primary form-control">
                        <span v-if="loading">Processing...</span>
                        <span v-else>Register</span>
                    </button>
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
            errors: {},
            loading: false // Track loading state
        };
    },
    methods: {
        async reset() {
            this.errors = {};
            let valid = true;

            // Validate name, email, and password
            if (!this.name) {
                this.errors.name = 'Name is required';
                valid = false;
            }
            if (!this.email) {
                this.errors.email = 'Email is required';
                valid = false;
            } else if (!this.validateEmail(this.email)) {
                this.errors.email = 'Invalid email format';
                valid = false;
            }
            if (!this.password) {
                this.errors.password = 'Password is required';
                valid = false;
            }

            if (valid) {
                this.loading = true;
                const formData = new FormData();
                formData.append('name', this.name);
                formData.append('email', this.email);
                formData.append('password', this.password);

                try {
                    const response = await axios.post('http://localhost:8000/api/reset', formData);
                    if (response) {
                        this.$router.push({ name: 'login' });
                    }
                } catch (error) {
                    console.error('Error:', error);
                    this.errors.global = 'An unexpected error occurred. Please try again later.';
                } finally {
                    this.loading = false; // Reset loading state
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
