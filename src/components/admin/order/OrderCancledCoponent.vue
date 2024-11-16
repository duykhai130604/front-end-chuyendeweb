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
                    <input type="month" class="form-control" id="orderMonth" placeholder="2024/07" />
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
                        <tr>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>4</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Số đơn bị hủy -->
            <div class="col-md-2">
                <label class="form-label">Số đơn bị hủy</label>
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>2</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Các sản phẩm bị hủy -->
            <div class="col-md-4">
                <label for="cancelledProducts" class="form-label">Các sản phẩm bị hủy nhiều nhất</label>
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td>Sản phẩm A</td>
                        </tr>
                        <tr>
                            <td>Sản phẩm B</td>
                        </tr>
                        <tr>
                            <td>Sản phẩm C</td>
                        </tr>
                        <tr>
                            <td>Sản phẩm D</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Số đơn bị hủy -->
            <div class="col-md-2">
                <label class="form-label">Số đơn bị hủy</label>
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>2</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Ngày đặt hàng -->
        <div class="row my-3">
            <div class="col-md-6">
                <label for="orderDate" class="form-label">Ngày đặt hàng</label>
                <div class="input-group">
                    <input type="date" class="form-control" id="orderDate" placeholder="2024/07/31 - 2024/08/30" />
                    <span class="input-group-text"><i class="bi bi-calendar"></i></span>
                </div>
            </div>
        </div>

        <!-- Table for Product, Reason, Order ID, Time -->
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Sản phẩm</th>
                    <th>Lý do hủy đơn</th>
                    <th>Mã đơn hàng</th>
                    <th>Thời gian</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
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
                },
            })
            .then((response) => {
                this.reasonStats = response.data;  
                this.orders = response.data.orders || [];
            })
            .catch((error) => {
                console.error("Error fetching reason stats:", error);
            });
        },
    },
};
</script>
