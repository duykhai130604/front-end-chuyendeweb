<template>
    <h1 class="product-title">Sản phẩm đã theo dõi</h1>
    <div class="product-page">
        <!-- Lặp qua danh sách sản phẩm đã theo dõi -->
        <div v-for="product in products" :key="product.product_id" class="product-card">
            <div class="product-header">
                <div class="order-details">
                    <span class="follow-date">{{ formatDate(product.created_at) }}</span>
                </div>
            </div>

            <div class="product-details">
                <div class="product-image">
                    <img :src="product.thumbnail || 'https://via.placeholder.com/300'" alt="Product Image">
                </div>
                <div class="product-info">
                    <h2 class="product-name">{{ product.name }}</h2>
                    <p class="product-description">{{ product.desc }}</p>
                    <div class="price">
                        <span v-if="product.discount > 0" class="original-price">{{ product.price }}VND</span>
                        <span v-if="product.discount > 0" class="discount-price">{{ primaryPrice }}VND </span>
                        <span class="discount-price">{{ product.price }}VND </span>
                    </div>
                    <div class="product-status">
                        <span class="status">Trạng thái: <strong>Đang Được Theo Dõi</strong></span>
                    </div>
                </div>
            </div>

            <div class="actions">
                <button class="btn btn-primary" @click="goToProductDetail(product.product_id)">Xem Chi Tiết Sản Phẩm</button>
            </div>
        </div>
    </div>
</template>
<script>
import { API_BASE_URL } from '@/utils/config';
import axios from 'axios';

export default {
    data() {
        return {
            products: [],
            primaryPrice: 0,
        };
    },
    methods: {
        async fetchProduct() {
            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Vui lòng đăng nhập');
                return;
            }
            try {
                const response = await axios.get(`${API_BASE_URL}/get-follow`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.data.data) {
                    this.products = response.data.data;
                    if (response.data.data.discount !== 0) {
                        this.primaryPrice = response.data.price - (response.data.price * response.data.discount) / 100;
                    }
                } else {
                    alert('Không tìm thấy sản phẩm đã theo dõi');
                }
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm đã theo dõi:', error);
                alert('Có lỗi xảy ra khi tải sản phẩm');
            }
        },
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString('vi-VN', options);
        },
        async goToProductDetail(id) {
            const encryptResponse = await axios.get(`${API_BASE_URL}/encrypt/${id}`);
            this.$router.push({ name: 'product', params: { id: encryptResponse.data.encrypted_id } });
        },
    },
    mounted() {
        this.fetchProduct();
    },
};
</script>


<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Arial', sans-serif;
    background-color: #f8f8f8;
    color: #333;
}

a {
    text-decoration: none;
    color: inherit;
}

.product-page {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.product-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.product-title {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin-top: 100px;
    margin-left: 20%;
}

.order-details {
    font-size: 14px;
    color: #777;
}

.follow-id,
.follow-date {
    margin-left: 10px;
}

.product-details {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

.product-image img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
}

.product-info {
    margin-left: 20px;
}

.product-name {
    font-size: 24px;
    font-weight: bold;
    color: #333;
}

.product-description {
    margin: 10px 0;
    font-size: 16px;
    color: #555;
}

.price {
    margin-top: 20px;
    font-size: 18px;
}

.original-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 10px;
}

.discount-price {
    color: #e74c3c;
    font-weight: bold;
}

.product-status {
    margin-top: 10px;
    font-size: 16px;
    color: #2ecc71;
}

.actions .btn {
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    margin: 10px 5px;
}
</style>