<template>
    <div class="container">
        <div class="purchased-products">
            <h2>Sản phẩm đã mua</h2>
            <table class="product-table">
                <thead>
                    <tr>
                        <th>Thuộc tính</th>
                        <th>sống lượng</th>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Thời gian</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in purchasedProducts" :key="product.id">
                        <td>
                            <div class="color" :style="{ backgroundColor: product.color }"></div>/{{ product.size }}
                        </td>

                        <td>{{ product.quantity }}</td>
                        <td class="image-cell">
                            <img :src="product.image" :alt="product.name" class="product-image" />
                        </td>
                        <td>{{ product.name }}</td>
                        <td class="product-price">{{ product.total }} VND</td>
                        <td class="product-time">{{ formatDate(product.created_at) }} </td>
                        <td>
                            <button @click="viewProductDetail(product.id)" class="view-detail-btn">Xem chi tiết</button>
                            <button v-if="product.rate == 0"
                                @click="reviewProduct(product.product, product.variant, product.order)"
                                class="review-btn">Đánh giá</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button @click="loadMore" v-if="hasMore" class="load-more-btn btn">Tải thêm</button>
        </div>
    </div>

</template>
<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
export default {
    data() {
        return {
            purchasedProducts: [],
            page: 1,
            hasMore: true,
        };
    },
    methods: {
        fetchProductOrders() {
            axios
                .get(`${API_BASE_URL}/user/orders?page=${this.page}`, {
                    withCredentials: true
                })
                .then(response => {
                    const data = response.data;
                    console.log(response.data);
                    this.purchasedProducts.push(...data.data);
                    this.hasMore = data.current_page < data.last_page;
                })
                .catch(error => {
                    console.error("Error fetching product orders:", error);
                });
        },
        loadMore() {
            this.page++;
            this.fetchProductOrders();
        },
        viewProductDetail(productId) {
            console.log("Xem chi tiết sản phẩm:", productId);
        },
        async reviewProduct(productId, variant, order) {
            const encryptResponse = await axios.get(`${API_BASE_URL}/encrypt/${productId}`);
            const encryptVariantResponse = await axios.get(`${API_BASE_URL}/encrypt/${variant}`);
            const encryptOrderResponse = await axios.get(`${API_BASE_URL}/encrypt/${order}`);
            this.$router.push({
                name: 'review', params: {
                    id: encryptResponse.data.encrypted_id,
                    variant: encryptVariantResponse.data.encrypted_id,
                    order: encryptOrderResponse.data.encrypted_id
                }
            });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            return date.toLocaleDateString('vi-VN', options);
        },
    },
    created() {
        this.fetchProductOrders();
    }
};
</script>

<style scoped>
.purchased-products {
    margin: 60px auto;
    padding: 20px;
}

.product-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.product-table th,
.product-table td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
}

.product-table th {
    background-color: #f2f2f2;
    font-weight: bold;
}

.image-cell {
    text-align: center;
}

.product-image {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    object-fit: cover;
}

.product-price {
    color: #00b3ff;
    font-weight: bold;
}

.view-detail-btn {
    background-color: #00b3ff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.view-detail-btn:hover {
    background-color: #00b3ff;
}

tr {
    padding: 25px 0;
}

.review-btn {
    display: block;
    background-color: #ff2600;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 10px 0;
}

.color {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
    border-radius: 5px;
}

.load-more-btn {
    margin-top: 20px;
    display: block;
    text-align: center;
    background-color: #00b3ff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
</style>