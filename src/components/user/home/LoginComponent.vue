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
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter Password">
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary form-control">Login</button>
                </div>
            </form>
            <div class="text-center mt-3">
                <a href="#" class="text-decoration-none">Bạn quên <span class="text-primary">mật khẩu?</span></a><br>
                <a href="#" class="text-decoration-none">Bạn chưa có <span class="text-primary">tài khoản?</span></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            });
            const data = await response.json();
            console.log(data.token)
            localStorage.setItem('token', data.token); // Lưu token vào localStorage
            console.log(data);

            if (!data.error) {
                this.$router.push('/');
            }
        }
    }
}
</script>