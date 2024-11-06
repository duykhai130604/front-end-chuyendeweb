<template>
    <div class="bg0 p-t-75 p-b-85">
        <div class="container" v-if="cartItems.length > 0">
            <div class="row">
                <div class="col-lg-10 col-xl-7 m-lr-auto m-b-50">
                    <div class="m-l-25 m-r--38 m-lr-0-xl">
                        <div class="wrap-table-shopping-cart">
                            <table class="table-shopping-cart">
                                <thead>
                                    <tr class="table_head">
                                        <th class="column-1">Product</th>
                                        <th class="column-2"></th>
                                        <th class="column-3">Price</th>
                                        <th class="column-4">Quantity</th>
                                        <th class="column-5">Total</th>
                                        <th class="column-6">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="table_row" v-for="(item, index) in cartItems" :key="index">
                                        <td class="column-1">
                                            <div class="itemcart1">
                                                <img :src="item.product_thumbnail" alt="Product Image" class="image-cart">
                                            </div>
                                        </td>
                                        <td class="column-2">{{ item.product_name }}<br />{{ item.size_name }}</td>
                                        <td class="column-3">{{ formatCurrency(item.product_price) }}</td>
                                        <td class="column-4">
                                            <div class="wrap-num-product flex-w m-l-auto m-r-0">
                                                <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                                    @click="decreaseQuantity(index)">
                                                    <i class="fs-16 zmdi zmdi-minus"></i>
                                                </div>
                                                <input class="mtext-104 cl3 txt-center num-product" type="number"
                                                    v-model.number="item.variant_quantity" min="1" max="20" readonly>
                                                <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                                    @click="increaseQuantity(index)">
                                                    <i class="fs-16 zmdi zmdi-plus"></i>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="column-5">{{ formatCurrency(item.product_price * item.variant_quantity) }}</td>
                                        <td class="column-6">
                                            <ButtonComponent class="btn-danger" icon="fa fa-times"
                                                @click="removeItem(item.variant_id)" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                            <div class="flex-w flex-m m-r-20 m-tb-5">
                                <input class="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5" type="text"
                                    name="coupon" placeholder="Mã giảm giá">
                                <div class="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
                                    Thêm mã giảm giá
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
                    <div class="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                        <h4 class="mtext-109 cl2 p-b-30">
                            Total cart
                        </h4>
                        <div class="flex-w flex-t bor12 p-b-13">
                            <div class="size-208">
                                <span class="stext-110 cl2">Subtotal:</span>
                            </div>
                            <div class="size-209">
                                <span class="mtext-110 cl2">{{ formatCurrency(subtotal) }}</span>
                            </div>
                        </div>
                        <router-link to="/checkout">
                            <button @click="handlePayment"
                                class="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                                Thanh toán
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty-cart" v-else>
            <p>Cart is empty</p>
        </div>
    </div>
</template>

<script>
import ButtonComponent from '../../common/ButtonComponent.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';

export default {
    components: { ButtonComponent },
    data() {
        return {
            cartItems: [],
            phone: '',
            address: ''
        }
    },
    computed: {
        subtotal() {
            return this.cartItems.reduce((total, item) => total + (item.product_price * item.variant_quantity), 0);
        }
    },
    methods: {
        increaseQuantity(index) {
            if (this.cartItems[index].variant_quantity < 20) {
                this.cartItems[index].variant_quantity++;
                this.updateQuantity(this.cartItems[index]);
            }
        },
        decreaseQuantity(index) {
            if (this.cartItems[index].variant_quantity > 1) {
                this.cartItems[index].variant_quantity--;
                this.updateQuantity(this.cartItems[index]);
            }
        },
        updateQuantity(item) {
            axios.put(`${API_BASE_URL}/updateCartItem`, {
                variant_id: item.variant_id,
                quantity: item.variant_quantity
            }, { withCredentials: true })
                .then((response) => {
                    console.log(response.data.message);
                })
                .catch((error) => {
                    console.error(error.response.data.error);
                });
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        removeItem(variant_id) {
            axios.delete(`${API_BASE_URL}/deleteCartItem`, { data: { variant_id: variant_id }, withCredentials: true })
                .then((response) => {
                    this.cartItems = this.cartItems.filter(item => item.variant_id !== variant_id);
                    console.log(response.data.message);
                })
                .catch((error) => {
                    console.error(error.response.data.error);
                });
        },
        fetchCartItems() {
            axios.get(`${API_BASE_URL}/getCarts`, { withCredentials: true })
                .then((response) => {
                    this.cartItems = response.data.cart;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        handlePayment() {
            console.log("Số điện thoại:", this.phone);
            console.log("Địa chỉ:", this.address);
        }
    },
    mounted() {
        this.fetchCartItems();
    }
}
</script>
<style scoped>
.addresss {
    border: 1px solid darkgray;
    width: 230px;
}

.text-center {
    text-align: center;
    font-size: 1.25rem;
    color: #555;
}

.table-shopping-cart {
    width: 100%;
    border-collapse: collapse;
}

.table_head th,
.table_row td {
    text-align: center;
    padding: 15px;
    border-bottom: 1px solid #e6e6e6;
}

.column-1 {
    width: 20%;
}

.column-2 {
    width: 25%;
    text-align: left;
    padding-left: 10px;
}

.column-3,
.column-4,
.column-5,
.column-6 {
    width: 15%;
}

.empty-cart {
    text-align: center;
    font-size: 80px;
    color: #555;
    margin: 100px 0;
    font-weight: 800;
}

.image-cart {
    width: 150px;
    height: auto;
    border: 2px solid bisque;
}
</style>
