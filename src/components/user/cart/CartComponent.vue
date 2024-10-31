<template>
    <!-- Shopping Cart -->
    <form class="bg0 p-t-75 p-b-85">
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
                                            <div class="how-itemcart1">
                                                <img :src="item.image" alt="IMG">
                                            </div>
                                        </td>
                                        <td class="column-2">{{ item.name }}</td>
                                        <td class="column-3">{{ formatCurrency(item.price) }}</td>
                                        <td class="column-4">
                                            <div class="wrap-num-product flex-w m-l-auto m-r-0">
                                                <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m" @click="decreaseQuantity(index)">
                                                    <i class="fs-16 zmdi zmdi-minus"></i>
                                                </div>

                                                <input class="mtext-104 cl3 txt-center num-product" type="number"
                                                    v-model.number="item.quantity" min="1" max="20">

                                                <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m" @click="increaseQuantity(index)">
                                                    <i class="fs-16 zmdi zmdi-plus"></i>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="column-5">{{ formatCurrency(item.price * item.quantity) }}</td>
                                        <td class="column-6">
                                            <ButtonComponent btnClass="btn-link btn-danger" icon="fa fa-times" @click="removeItem(index)" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                            <div class="flex-w flex-m m-r-20 m-tb-5">
                                <input class="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5" type="text"
                                    name="coupon" placeholder="Mã giảm giá">
                                <div
                                    class="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
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
                                <span class="stext-110 cl2">
                                    Subtotal:
                                </span>
                            </div>

                            <div class="size-209">
                                <span class="mtext-110 cl2">
                                    {{ formatCurrency(subtotal) }}
                                </span>
                            </div>
                        </div>

                        <div class="flex-w flex-t bor12 p-t-15 p-b-30">
                            <div class="size-208 w-full-ssm">
                                <span class="stext-110 cl2">
                                    Address:
                                </span>
                            </div>

                            <div class="size-209 p-r-18 p-r-0-sm w-full-ssm">
                                <textarea class="stext-111 cl6 p-t-2" name=""
                                    id="">53, Đường võ văn ngân, TPHCM</textarea>
                            </div>
                        </div>

                        <!-- <div class="flex-w flex-t p-t-27 p-b-33">
                            <div class="size-208">
                                <span class="mtext-101 cl2">
                                    Total:
                                </span>
                            </div>

                            <div class="size-209 p-t-1">
                                <span class="mtext-110 cl2">
                                    {{ formatCurrency(subtotal) }}
                                </span>
                            </div>
                        </div> -->

                        <button class="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty-cart" v-else>
            <p>Cart is empty</p>
        </div>
    </form>
</template>

<script>
import ButtonComponent from '../../common/ButtonComponent.vue';

export default {
    components: { ButtonComponent },
    data() {
        return {
            cartItems: [
                {
                    name: 'Fresh Strawberries',
                    price: 36000,
                    quantity: 1,
                    image: 'https://res.cloudinary.com/dkfedhd63/image/upload/v1730276126/bta4odqzcft0ijx7pzlk.webp'
                },
                {
                    name: 'Lightweight Jacket',
                    price: 16000,
                    quantity: 1,
                    image: 'https://res.cloudinary.com/dkfedhd63/image/upload/v1730276126/bta4odqzcft0ijx7pzlk.webp'
                }
            ]
        }
    },
    computed: {
        subtotal() {
            return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
    },
    methods: {
        increaseQuantity(index) {
            if (this.cartItems[index].quantity < 20) {
                this.cartItems[index].quantity++;
            }
        },
        decreaseQuantity(index) {
            if (this.cartItems[index].quantity > 1) {
                this.cartItems[index].quantity--;
            }
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        removeItem(index) {
            this.cartItems.splice(index, 1);
        }
    }
}
</script>

<style scoped>
.text-center {
    text-align: center;
    font-size: 1.25rem;
    color: #555;
}
.table-shopping-cart {
    width: 100%;
    border-collapse: collapse;
}
.table_head th, .table_row td {
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
.column-3, .column-4, .column-5, .column-6 {
    width: 15%;
}
.empty-cart {
    text-align: center;
    font-size: 80px;
    color: #555;
    margin: 100px 0;
    font-weight: 800;
}
</style>
