<template>
    <div class="wrapper">
        <SideBarComponent />
        <div class="main-panel">
            <div class="main-header">
                <HeaderComponent />
                <NavbarComponent />
            </div>
            <div class="container">
                <div class="page-inner">
                    <div class="page-header">
                        <h3 class="fw-bold mb-3">Edit Product</h3>
                        <ul class="breadcrumbs mb-3">
                            <li class="nav-home">
                                <a href="#">
                                    <i class="icon-home"></i>
                                </a>
                            </li>
                            <li class="separator">
                                <i class="icon-arrow-right"></i>
                            </li>
                            <li class="nav-item">
                                <a href="#">Product List</a>
                            </li>
                            <li class="separator">
                                <i class="icon-arrow-right"></i>
                            </li>
                            <li class="nav-item">
                                <a href="#">Add New Product</a>
                            </li>
                        </ul>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body">
                                    <div v-if="message" class="alert alert-danger text-center">{{ message }}</div>
                                    <div class="row">
                                        <div class="form-group">
                                            <label for="productName">Product Name</label>
                                            <input type="text" class="form-control" id="productName"
                                                v-model="productData.name" placeholder="Enter name" />
                                            <ErrorMessage :errorMessage="errors.name" />

                                            <div class="row pt-3">
                                                <div class="col-6">
                                                    <label for="productPrice">Price</label>
                                                    <input type="text" class="form-control" id="productPrice"
                                                        v-model="productData.price" placeholder="Price" />
                                                    <ErrorMessage :errorMessage="errors.price" />
                                                </div>
                                                <div class="col-6">
                                                    <label for="discount">Discount</label>
                                                    <input type="text" class="form-control" id="discount"
                                                        v-model="productData.discount" placeholder="Discount" />
                                                    <ErrorMessage :errorMessage="errors.discount" />
                                                </div>
                                            </div>
                                            <label class="pt-3" for="categorySelect">Category</label>
                                            <select class="form-select form-control-lg" id="categorySelect"
                                                v-model="productData.category_id">
                                                <option v-for="category in categories" :key="category.id"
                                                    :value="category.id">
                                                    {{ category.name }}
                                                </option>
                                            </select>
                                            <ErrorMessage :errorMessage="errors.category_id" />
                                            <label class="pt-3" for="description">Description</label>
                                            <CKEditorComponent v-model="productData.desc" />
                                            <ErrorMessage :errorMessage="errors.desc" />
                                        </div>
                                        <div class="card-action">
                                            <button class="btn btn-success" @click="submitProduct"
                                                :disabled="isLoading">
                                                Save Change
                                            </button>
                                            <router-link to="/admin/products"
                                                class="btn btn-danger">Cancel</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
            <LoadingOverlay :isLoading="isLoading" :loadingPercentage="loadingPercentage" />
        </div>
    </div>
</template>

<script>
import { API_BASE_URL } from '../../../utils/config';
import axios from 'axios';
import CKEditorComponent from "../../common/CKEditorComponent.vue";
import SideBarComponent from '../SideBarComponent.vue';
import NavbarComponent from '../NavbarComponent.vue';
import HeaderComponent from '../HeaderComponent.vue';
import FooterComponent from '../FooterComponent.vue';
import LoadingOverlay from '../../common/LoadingOverlayComponent.vue';
import ErrorMessage from '../../common/ErrorMessageComponent.vue';

export default {
    name: 'EditProduct',
    components: {
        SideBarComponent, NavbarComponent, HeaderComponent, FooterComponent, CKEditorComponent, LoadingOverlay, ErrorMessage
    },
    data() {
        return {
            productData: {
                name: '',
                price: '',
                discount: 0,
                category_id: '',
                desc: ''
            },
            categories: [],
            errors: {},
            message: '', // Thêm biến message
            isLoading: false,
            loadingPercentage: 0
        };
    },
    mounted() {
        // Lấy encodedId từ URL
        const encodedId = this.$route.params.id;
        
        // Gọi API để lấy thông tin sản phẩm
        axios.get(`${API_BASE_URL}/getProductDetails?encodedId=${encodedId}`)
            .then(response => {
                const product = response.data.product;
                console.log("productDetails",product);
                
                this.productData = {
                    name: product.name,
                    price: product.price,
                    discount: product.discount,
                    category_id: product.category_id,
                    desc: product.desc
                };

            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    this.message = error.response.data.message;
                    setTimeout(() => {
                        this.$router.push('/admin/products');
                    }, 3000);
                }
            });

        // Lấy danh sách các danh mục
        axios.get(`${API_BASE_URL}/getAllCategories`)
            .then(response => {
                this.categories = response.data;
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    },
    methods: {
        submitProduct() {
            this.isLoading = true;
            this.loadingPercentage = 0;
            const productData = {
                name: this.productData.name,
                price: Number(this.productData.price),
                discount: Number(this.productData.discount) || 0,
                category_id: Number(this.productData.category_id),
                desc: this.productData.desc
            };

            axios.post(`${API_BASE_URL}/admin/addProduct`, productData, {
                onUploadProgress: progressEvent => {
                    this.loadingPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
            })
                .then(response => {
                    this.isLoading = false;
                    alert(response.data.message);
                    this.$router.push('/admin/products');
                })
                .catch(error => {
                    this.isLoading = false;
                    if (error.response && error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    } else {
                        alert('System error, please try again later');
                    }
                });
        }
    }
}
</script>

<style>
@import url("../../../assets/admin/assets/font-awesome-4.7.0/css/font-awesome.css");
</style>
