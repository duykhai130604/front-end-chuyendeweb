<template>
    <div class="wrapper">
        <SideBarComponent />
        <div class="main-panel">
            <div class="main-header">
                <HeaderComponent />
                <NavbarComponent @search="handleSearch" />
            </div>
            <div class="container">
                <div class="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header">
                                    <div class="d-flex align-items-center">
                                        <h4 class="card-title">Product List</h4>
                                        <router-link to="/admin/products/addNewProduct" class="ms-auto">
                                            <ButtonComponent label="Add New Product" btnClass="btn-primary btn-round"
                                                icon="fa fa-plus" />
                                        </router-link>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th style="width: 10%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-if="filteredProducts.length === 0">
                                                    <td colspan="4" class="text-center">{{ message }}</td>
                                                </tr>
                                                <tr v-for="product in filteredProducts" :key="product.id">
                                                    <td>{{ product.id }}</td>
                                                    <td>{{ product.name }}</td>
                                                    <td>{{ formatPrice(product.price) }}</td>
                                                    <td>
                                                        <div class="form-button-action">
                                                            <router-link
                                                                :to="{ name: 'editProduct', params: { id: product.id } }">
                                                                <ButtonComponent btnClass="btn-link"
                                                                    icon="fa fa-edit" />
                                                            </router-link>
                                                            <ButtonComponent btnClass="btn-link btn-danger"
                                                                icon="fa fa-times" @click="confirmDelete(product.id)" />
                                                            <router-link
                                                                :to="{ name: 'productVariants', params: { id: product.id } }">
                                                                <ButtonComponent btnClass="btn-link btn-info"
                                                                    icon="fa fa-list" />
                                                            </router-link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <PaginationComponent :currentPage="currentPage" :totalPages="totalPages"
                                        :changePage="changePage" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </div>
    </div>
</template>

<script>
import { API_BASE_URL } from '../../../utils/config';
import SideBarComponent from '../SideBarComponent.vue';
import HeaderComponent from '../HeaderComponent.vue';
import FooterComponent from '../FooterComponent.vue';
import NavbarComponent from '../NavbarComponent.vue';
import PaginationComponent from '../../common/PaginationComponent.vue';
import ButtonComponent from '../../common/ButtonComponent.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
    name: 'ProductList',
    setup() {
        const toast = useToast();
        return {
            toast
        };
    },
    components: {
        SideBarComponent,
        HeaderComponent,
        FooterComponent,
        NavbarComponent,
        PaginationComponent,
        ButtonComponent,
    },
    data() {
        return {
            products: [],
            filteredProducts: [],
            currentPage: 1,
            totalPages: 0,
            message: "Loading...",
            keyword: '',
            searchTimeout: null,
            isDeleting: false,
        };
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        fetchProducts(page = 1, keyword = '') {
            const config = {
                method: 'get',
                url: `${API_BASE_URL}/products?page=${page}&keyword=${keyword}`,
                headers: {}
            };
            axios.request(config)
                .then((response) => {
                    if (response.data.data) {
                        this.products = response.data.data;
                        this.filteredProducts = this.products;
                        this.message = "";
                    } else {
                        this.products = [];
                        this.filteredProducts = [];
                        this.message = response.data.message;
                    }

                    this.totalPages = response.data.last_page || 0;
                    this.currentPage = page;
                })
                .catch((error) => {
                    console.error(error);
                    this.message = "An error occurred while fetching products.";
                });
        },
        handleSearch(keyword) {
            this.keyword = keyword;
            clearTimeout(this.searchTimeout);

            this.searchTimeout = setTimeout(() => {
                this.fetchProducts(1, keyword);
            }, 500);
        },
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.fetchProducts(page, this.keyword);
        },
        formatPrice(price) {
            return price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
        },
        confirmDelete(id) {
            if (confirm('Are you sure you want to delete this product?')) {
                this.deleteProduct(id);
            }
        },

        deleteProduct(id) {
            const config = {
                method: 'delete',
                url: `${API_BASE_URL}/admin/deleteProduct`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ id: id })
            };

            axios.request(config)
                .then((response) => {
                    this.toast.success(response.data.message, {
                        position: 'top-center',
                        timeout: 1500,
                        pauseOnHover: false,
                    });
                    this.fetchProducts(this.currentPage, this.keyword);
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        this.toast.error(error.response.data.message || 'An unexpected error occurred.', {
                            position: 'top-center',
                            timeout: 1500,
                            pauseOnHover: false,
                        });
                    } else {
                        this.toast.error('An unexpected error occurred.', {
                            position: 'top-center',
                            timeout: 1500,
                            pauseOnHover: false,
                        });
                    }
                });
        }
    }
};
</script>

<style>
@import url("../../../assets/admin/assets/font-awesome-4.7.0/css/font-awesome.css");
</style>
