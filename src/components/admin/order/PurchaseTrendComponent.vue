<template>
    <div class="page-inner">
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Tỷ lệ hàng bị hủy so số đơn hàng</div>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <canvas id="barChart"></canvas>
                        </div>
                        <router-link to="/admin/cancled" class="btn btn-info">Chi tiết</router-link>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Số lượng đơn hàng bị hủy</div>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <canvas id="barChart1"></canvas>
                        </div>
                        <a href="destroyoder.html">
                            <router-link to="/admin/cancled" class="btn btn-info">Chi tiết</router-link>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from "vue";
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import { API_BASE_URL } from "@/utils/config";

export default {  
    name: "ChartsDashboard",
    setup() {
        const renderBarChart = (ctx, labels, data, title, color, maxDataValue) => {
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: title,
                            data: data,
                            backgroundColor: color, 
                            borderColor: color,
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: "top",
                        },
                        title: {
                            display: true,
                            text: title,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: maxDataValue,
                        },
                    },
                },
            });
        };

        onMounted(() => {
            const ctx1 = document.getElementById("barChart").getContext("2d");
            const ctx2 = document.getElementById("barChart1").getContext("2d");
            const months = [
                "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", 
                "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", 
                "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
            ];
            axios.get(`${API_BASE_URL}/order-stats/${new Date().getFullYear()}`)
                .then(response => {
                    const data = response.data;
                    const totalOrders = Array(12).fill(0);
                    const status2Orders = Array(12).fill(0); 
                    let maxTotalOrders = 0; 
                    const conversionRates = Array(12).fill(0); 
                    data.forEach(item => {
                        totalOrders[item.month - 1] = item.total_orders; 
                        status2Orders[item.month - 1] = item.status_2_orders;
                        if (item.total_orders > 0) {
                            conversionRates[item.month - 1] = (item.status_2_orders / item.total_orders) * 100;
                        }

                        if (item.total_orders > maxTotalOrders) {
                            maxTotalOrders = item.total_orders;
                        }
                    });
                    renderBarChart(
                        ctx1,
                        months,
                        conversionRates, 
                        "Tỷ lệ hủy đơn %",
                        "rgba(54, 162, 235, 0.8)", 
                        100 
                    );
                    renderBarChart(
                        ctx2,
                        months,
                        status2Orders, 
                        "Số lượng đơn hàng bị hủy",
                        "rgba(255, 99, 132, 0.8)",
                        maxTotalOrders 
                    );
                })
                .catch(error => {
                    console.error("Error fetching data for chart 2:", error);
                });
        });

        return {};
    },
};





</script>

<style scoped>
.chart-container {
    position: relative;
    height: 300px;
}
</style>
