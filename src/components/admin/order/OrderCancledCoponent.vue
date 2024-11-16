<template>
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Oders destroyed</h3>
        </div>
        <!-- Ngày đặt hàng -->
        <div class="row my-3">
            <div class="col-md-6">
                <label for="orderMonth" class="form-label">Chọn tháng đặt hàng</label>
                <div class="input-group">
                    <input type="month" v-model="orderMonth" @change="fetchReasonStats" class="form-control"
                        id="orderMonth" placeholder="2024/07" />
                    <span class="input-group-text"><i class="bi bi-calendar"></i></span>
                </div>
            </div>
        </div>

        <div class="row">
            <!-- Lý do hủy đơn -->
            <div class="col-md-4">
                <label for="reasonCancel" class="form-label">Các lý do hủy đơn</label>
                <table class="table table-bordered">
                    <tbody>
                        <tr v-for="(reason, index) in reasonStats" :key="reason.reason_count">
                            <td>{{ index + 1 }} <span class="mx-3">{{ reason.reason ?? 'Bị hủy bởi admin' }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Số đơn bị hủy -->
            <div class="col-md-2">
                <label class="form-label">Số đơn bị hủy</label>
                <table class="table table-bordered">
                    <tbody>
                        <tr v-for="(reason, index) in reasonStats" :key="index">
                            <td>{{ reason.reason_count }}</td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <!-- Các sản phẩm bị hủy -->
            <div class="col-md-4">
                <label for="cancelledProducts" class="form-label">Các sản phẩm bị hủy nhiều nhất</label>
                <table class="table table-bordered">
                    <tbody>
                        <tr v-for="(reason, index) in orders" :key="index">
                            <td>{{ index + 1 }} <span class="mx-2">{{ reason.name }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Số đơn bị hủy -->
            <div class="col-md-2">
                <label class="form-label">Số đơn bị hủy</label>
                <table class="table table-bordered">
                    <tbody>
                        <tr v-for="(reason, index) in orders" :key="index">
                            <td>{{ reason.product_count }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Table for Product, Reason, Order ID, Time -->
        <table class="table table-bordered my-5">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Sản phẩm</th>
                    <th>Lý do hủy đơn</th>
                    <th>Thời gian</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(reason, index) in orders" :key="index">
                    <td>{{ index + 1 }} </td>
                    <td>{{ reason.name }}</td>
                    <td>{{ reason.reason ?? 'Bị hủy bởi admin' }}</td>
                    <td>{{ reason.created_at }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-3">
        <button class="btn btn-primary" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
            Trang trước
        </button>
        <span>Trang {{ currentPage }} / {{ lastPage }}</span>
        <button class="btn btn-primary" :disabled="currentPage === lastPage" @click="changePage(currentPage + 1)">
            Trang kế
        </button>
    </div>
</template>
<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
export default {
    data() {
        return {
            reasonStats: [],
            orders: [],
            orderMonth: "",
            currentPage: 1, 
            lastPage: 1,  
        };
    },
    mounted() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        this.orderMonth = `${year}-${month}`;
        this.fetchReasonStats();

    },
    methods: {
        fetchReasonStats() {
            if (!this.orderMonth) return;
            const [year, month] = this.orderMonth.split("-");
            axios.get(`${API_BASE_URL}/monthly-reason-stats`, {
                params: {
                    month: month,
                    year: year,
                    page: this.currentPage,
                },
            })
                .then((response) => {
                    this.reasonStats = response.data.data;
                    this.currentPage = response.data.current_page;
                    this.lastPage = response.data.last_page;
                    this.fetchOrder();
                })
                .catch((error) => {
                    console.error("Error fetching reason stats:", error);
                });
        },
        fetchOrder() {
            if (!this.orderMonth) return;
            const [year, month] = this.orderMonth.split("-");
            axios.get(`${API_BASE_URL}/order-cancled`, {
                params: {
                    month: month,
                    year: year,
                    page: this.currentPage,
                },
            })
                .then((response) => {
                    this.orders = response.data.data;
                })
                .catch((error) => {
                    console.error("Error fetching reason stats:", error);
                });
        },
        changePage(page) {
        if (page > 0 && page <= this.lastPage) {
            this.currentPage = page;
            this.fetchReasonStats(page);
        }
    },
    },
};
</script>
