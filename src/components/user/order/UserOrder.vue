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
                        <th>Tình trạng</th>
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
                        <td class="product-time">{{ getStatusText(product.status) }} </td>
                        <td>
                            <button @click="viewProductDetail(product.id)" class="view-detail-btn">Xem chi tiết</button>
                            <button v-if="product.rate == 0 && product.status == 1"
                                @click="reviewProduct(product.product, product.variant, product.order)"
                                class="review-btn">Đánh giá</button>
                            <button v-if="product.status == 3" @click="gotProduct(product.id)"
                                class="btn btn-warning mx-2">Đã nhận được
                                hàng</button>
                            <button v-if="product.status == 3" @click="chooseReason(product.id)"
                                class="btn btn-danger mx-2 my-2">Hủy đơn</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button @click="loadMore" v-if="hasMore" class="load-more-btn btn">Tải thêm</button>
        </div>
    </div>
    <!-- Modal structure -->
    <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <h2>Lí do hủy đơn</h2>
            <div class="form-group">
                <label for="reasonList">Chọn lý do:</label>
                <select class="form-control" id="reasonList" v-model="reason">
                    <option v-for="(reasonOption, index) in commonReasons" :key="index" :value="reasonOption">
                        {{ reasonOption }}
                    </option>
                    <option value="Khác">Khác (nhập bên dưới)</option>
                </select>
            </div>
            <!-- Ô nhập lý do khác -->
            <div v-if="reason === 'Khác'" class="form-group">
                <label for="otherReason">Nhập lý do khác:</label>
                <input type="text" class="form-control" id="otherReason" v-model="otherReason"
                    placeholder="Nhập lý do hủy đơn của bạn" />
            </div>
            <!-- Close Button -->
            <div class="btn btn-secondary" @click="closeModal">Close
            </div>
            <div class="btn btn-danger my-2" @click="cancle()">Hủy
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
            purchasedProducts: [],
            page: 1,
            hasMore: true,
            reason: '',
            isModalVisible: false,
            order: null,
            otherReason: '',
            commonReasons: [
                'Đặt nhầm sản phẩm',
                'Thay đổi địa chỉ giao hàng',
                'Thời gian giao hàng quá lâu',
                'Sản phẩm không còn cần thiết',
                'Giá sản phẩm không hợp lý',
                'Tìm thấy sản phẩm giá tốt hơn',
                'Sản phẩm không giống mô tả',
                'Phí vận chuyển quá cao',
                'Không liên hệ được với nhân viên',
                'Khác'
            ]

        };
    },
    methods: {
        validateCancellation() {
            if (!this.reason) {
                alert('Vui lòng chọn lý do hủy đơn.');
                return false;
            }
            if (this.reason === 'Khác' && (!this.otherReason || this.otherReason.length > 150)) {
                alert(
                    'Vui lòng nhập lý do khác không quá 150 ký tự?'
                );
                return false;
            }
            return true;
        },
        chooseReason(order) {
            this.order = order;
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        //cancle
        async cancle() {
            try {
                if (this.validateCancellation()) {
                    if (confirm('Bạn có chắc hủy đơn này?')) {
                        if (this.reason == 'Khác'){
                            await axios.put(API_BASE_URL + '/product-order/update-status', {
                                id: this.order,
                                status: 2,
                                reason: this.otherReason,
                            });
                        }else{
                            await axios.put(API_BASE_URL + '/product-order/update-status', {
                                id: this.order,
                                status: 2,
                                reason: this.reason,
                            });
                        }
                        this.purchasedProducts = [];
                        this.isModalVisible = false;
                        this.fetchProductOrders();

                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('Order not found or invalid status');
                } else {
                    console.error('Error updating order:', error);
                }

            }
        },
        async gotProduct(order) {
            try {
                if (confirm('Bạn đã nhận được hàng?')) {
                    await axios.put(API_BASE_URL + '/product-order/update-status', {
                        id: order,
                        status: 1,
                        reason: null,
                    });
                    this.purchasedProducts = [];
                    this.fetchProductOrders();
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('Order not found or invalid status');
                } else {
                    console.error('Error updating order:', error);
                }

            }
        },
        fetchProductOrders() {
            axios
                .get(`${API_BASE_URL}/user/orders?page=${this.page}`, {
                    withCredentials: true
                })
                .then(response => {
                    const data = response.data;
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
        getStatusText(statusCode) {
            switch (statusCode) {
                case 1:
                    return 'Đã giao thành công';
                case 0:
                    return 'Bị hủy bởi người bán';
                case 2:
                    return 'Bị hủy bởi khách hàng';
                case 3:
                    return 'Đang chuyển xử lý';
                case 4:
                    return 'Thanh toán hoặc hóa đơn xử lý không thành công';
                default:
                    return 'Không xác định';
            }
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

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 600px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
}
</style>