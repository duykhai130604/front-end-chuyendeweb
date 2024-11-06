<template>
    <div class="bg0 p-t-75 p-b-85">
        <div class="container">
            <h1 class="text-center">Checkout</h1>

            <div class="row">
                <div class="col-md-8 col-lg-9">
                    <div class="flex-w flex-t bor12 p-t-15 p-b-30">
                        <div class="size-208 w-full-ssm">
                            <span class="stext-110 cl2">
                                Phone Number:
                            </span>
                        </div>
                        <div class="size-209 p-r-18 p-r-0-sm w-full-ssm">
                            <input type="text" class="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5"
                                placeholder="Số điện thoại" v-model="phone" pattern="[0-9]*"
                                @input="phone = phone.replace(/[^0-9]/g, '')" />
                        </div>
                    </div>

                    <div class="flex-w flex-t bor12 p-t-15 p-b-30">
                        <div class="size-208 w-full-ssm">
                            <span class="stext-110 cl2">
                                Address:
                            </span>
                        </div>
                        <div class="size-209 p-r-18 p-r-0-sm w-full-ssm">
                            <textarea class="addresss text-111 cl6 p-t-2" name="" id="" rows="5"
                                v-model="address"></textarea>
                        </div>
                    </div>
                    <button @click="checkout" type="submit" class="btn btn-dark mt-4">Checkout</button>

                    <router-link to="/cart">
                        <button class="btn btn-link mt-4">
                            Return to cart
                        </button>
                    </router-link>

                </div>
                <div class="col-md-4 col-lg-3">
                    <div class="mt-5">
                        <h2>Shopping Cart</h2>
                        <table>
                            <tbody>
                                <tr v-for="item in cartItems" :key="item.variant_id">
                                    <td><img class="image-checkout" :src="item.product_thumbnail"
                                            :alt="item.product_name"></td>
                                    <td>{{ item.product_name }}, {{ item.size_name }}<br>{{ item.product_price }} VND
                                    </td>
                                    <td>Quantity: {{ item.variant_quantity }}</td>
                                </tr>
                            </tbody>
                        </table>
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
    data() {
        return {
            cartItems: [],
            phone: '',
            address: ''
        }
    },
    methods: {
        fetchCartItems() {
            const config = {
                method: 'get',
                withCredentials: true,
                url: API_BASE_URL + '/getCarts',
            };

            axios.request(config)
                .then((response) => {
                    this.cartItems = response.data.cart;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        checkout() {
            const config = {
                method: 'post',
                withCredentials: true,
                url: API_BASE_URL + '/checkout',
                data: {
                    phone: this.phone,
                    address: this.address
                }
            };

            axios.request(config)
                .then(() => {
                    this.$router.push('/');
                })
                .catch((error) => {
                    console.log(error);
                });
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

.cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.cart-item img {
    width: 100px;
    height: auto;
    margin-right: 15px;
}

.cart-item .quantity {
    margin-right: 15px;
}

.cart-summary {
    margin-top: 30px;
}

.image-checkout {
    width: 50px;
    height: auto;
    border-radius: 10px;
    margin-right: 10px;
}
</style>
