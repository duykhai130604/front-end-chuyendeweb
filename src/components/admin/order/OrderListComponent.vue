<template>
    <div class="container">
        <div class="page-inner">
            <div class="page-header">
                <h3 class="fw-bold mb-3">Orders</h3>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label for="orderDate" class="form-label">Ngày đặt hàng</label>
                    <div class="input-group">
                        <input type="date"  @change="fetchOrderByDate(page=1)" v-model="date" class="form-control" id="orderDate" placeholder="2024/08/30" />
                        <span class="input-group-text"><i class="bi bi-calendar"></i></span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Basic</h4>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table id="basic-datatables" class="display table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>User</th>
                                            <th>Amount</th>
                                            <th>Address</th>
                                            <th>Status</th>
                                            <th>Created at</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(order, index) in orders" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ order.user }}</td>
                                            <td>{{ order.amount }}</td>
                                            <td>{{ order.address }} <p>Phone number: {{ order.phone }}</p>
                                            </td>
                                            <td>{{ getStatusText(order.status) }}</td>
                                            <td>{{ formatDate(order.created_at) }}</td>
                                            <td>
                                                <!-- Button to trigger the modal -->
                                                <div class="btn btn-primary btn-sm" @click="openModal(order)">Details
                                                </div>

                                                <!-- Modal structure -->
                                                <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
                                                    <div class="modal-content" @click.stop>
                                                        <h2>Order Details</h2>
                                                        <p><strong>Phone:</strong> {{ orderModal.phone }}</p>
                                                        <p><strong>Address:</strong> {{ orderModal.address }}</p>
                                                        <p><strong>Order Created At:</strong> {{
                                                            orderModal.created_at
                                                            }}</p>
                                                        <p><strong>Quantity:</strong> {{ orderModal.quantity }}</p>
                                                        <p><strong>Total:</strong> {{ orderModal.total }} VND</p>
                                                        <p><strong>Reason:</strong> {{ orderModal.reason }}</p>
                                                        <p><strong>Status:</strong> {{ getStatusText(orderModal.status)
                                                            }}
                                                        </p>
                                                        <p><strong>Status:</strong> {{ orderModal.cancle }}</p>
                                                        <p><strong>Product Order Rate:</strong> {{
                                                            order.product_order_rate }}</p>
                                                        <p><strong>Product Name:</strong> {{ orderModal.product_name }}
                                                        </p>
                                                        <p><strong>Product Price:</strong> {{ orderModal.product_price
                                                            }} VND
                                                        </p>
                                                        <p><strong>Size:</strong> {{ orderModal.size }}</p>
                                                        <p><strong>Color:</strong> <span
                                                                :style="{ color: orderModal.color }">{{ orderModal.color
                                                                }}</span>
                                                        </p>
                                                        <p><strong>User:</strong> {{ orderModal.user }}</p>
                                                        <!-- Close Button -->
                                                        <div class="btn btn-secondary btn-sm" @click="closeModal">Close
                                                        </div>
                                                    </div>
                                                </div> <a href="#" class="btn btn-danger btn-sm"
                                                    v-if="order.status === 3"
                                                    @click="cancelOrder(order.id)">Cancel</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <nav aria-label="pagination">
                                    <ul class="pagination">
                                        <li v-if="currentPage > 1">
                                            <a href="" @click.prevent="changePage(currentPage - 1)" aria-hidden="true">
                                                « <span class="visuallyhidden"></span>
                                            </a>
                                        </li>
                                        <li v-for="page in totalPages" :key="page">
                                            <a href="" @click.prevent="changePage(page)"
                                                :class="{ 'active': currentPage === page }"
                                                :aria-current="currentPage === page ? 'page' : undefined">
                                                <span class="visuallyhidden"> </span>{{ page }}
                                            </a>
                                        </li>
                                        <li v-if="currentPage < totalPages">
                                            <a href="" @click.prevent="changePage(currentPage + 1)" aria-hidden="true">
                                                <span class="visuallyhidden"></span> »
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
export default {
    name: 'OrdersView',
    data() {
        return {
            orders: [],
            orderModal: null,
            isModalVisible: false,
            totalPages:0,
            currentPage:1,
            date:''
        };
    },
    methods: {
        async fetchOrderByDate(page) {
            try {
                const response = await axios.get(API_BASE_URL+'/orders-by-date/'+this.date+'?page='+page);
                this.orders = response.data.data;                
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        },
        async fetchOrders(page) {
            try {
                const response = await axios.get(API_BASE_URL + '/orders?page='+page);
                this.orders = response.data.data;
                this.totalPages = response.data.last_page;
                this.currentPage = response.data.current_page;

            } catch (error) {
                console.error('There was an error fetching the orders:', error);
            }
        }, formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString();
        },
        openModal(order) {
            this.orderModal = order;
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.fetchOrders(page);
        },
        getStatusText(statusCode) {
            switch (statusCode) {
                case 1:
                    return 'Đã giao thành công';
                case 0:
                    return 'Bị hủy bởi admin';
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
        async cancelOrder(order) {
            try {
                if (confirm('Bạn có chắc hủy đơn này?')) {
                    await axios.put(API_BASE_URL + '/product-order/update-status', {
                        id: order,
                        status: 0,
                        reason: 'Bị hủy bởi người bán',
                    });
                    this.fetchOrders();
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('Order not found or invalid status');
                } else {
                    console.error('Error updating order:', error);
                }

            }
        }
    },
    mounted() {
        this.fetchOrders();
    }
};
</script>
<style scoped>
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
    width: 400px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
}

.btn {
    cursor: pointer;
}

.btn-sm {
    padding: 5px 10px;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}
nav {
    display: flex;
    justify-content: center;
    border-top: 1px solid #eee;
    margin-top: 1em;
    padding-top: 0.5em;
}

.pagination {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.pagination li {
    margin: 0 1px;
}

.pagination a {
    display: block;
    padding: 0.5em 1em;
    border: 1px solid #999;
    border-radius: 0.2em;
    text-decoration: none;
}

.pagination a[aria-current="page"] {
    background-color: #333;
    color: #fff;
}
</style>