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
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body">
                                    <div v-if="message" class="alert alert-danger text-center">{{ message }}</div>
                                    <div v-else class="row">
                                        <div class="form-group">
                                            <LabelComponent for="productName" text="Product Name" />
                                            <InputComponent
                                                type="text"
                                                id="productName"
                                                v-model="productData.name"
                                                placeholder="Enter name"
                                            />
                                            <ErrorMessage :errorMessage="errors.name" />

                                            <div class="row">
                                                <div class="col-6">
                                                    <LabelComponent for="productPrice" text="Price" />
                                                    <InputComponent
                                                        type="text"
                                                        id="productPrice"
                                                        v-model="productData.price"
                                                        placeholder="Price"
                                                    />
                                                    <ErrorMessage :errorMessage="errors.price" />
                                                </div>
                                                <div class="col-6">
                                                    <LabelComponent for="discount" text="Discount" />
                                                    <InputComponent
                                                        type="text"
                                                        id="discount"
                                                        v-model="productData.discount"
                                                        placeholder="Discount"
                                                    />
                                                    <ErrorMessage :errorMessage="errors.discount" />
                                                </div>
                                            </div>
                                            <LabelComponent for="categorySelect" text="Category" />
                                            <select class="form-select form-control-lg" id="categorySelect"
                                                v-model="productData.category_id">
                                                <option v-for="category in categories" :key="category.id"
                                                    :value="category.id">
                                                    {{ category.name }}
                                                </option>
                                            </select>
                                            <ErrorMessage :errorMessage="errors.category_id" />
                                            <LabelComponent for="description" text="Description" />
                                            <CKEditorComponent v-model="productData.desc" />
                                            <ErrorMessage :errorMessage="errors.desc" />
                                        </div>
                                        <div class="card-action">
                                            <ButtonComponent label="Save change" btnClass="btn-success" @click="submitProduct"
                                            :disabled="isLoading" />
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
import InputComponent from '../../common/InputComponent.vue';
import ButtonComponent from '../../common/ButtonComponent.vue';
import LabelComponent from '../../common/LabelComponent.vue';

export default {
    name: 'EditProduct',
    components: {
        SideBarComponent,
        NavbarComponent,
        HeaderComponent,
        FooterComponent,
        CKEditorComponent,
        LoadingOverlay,
        ErrorMessage,
        InputComponent,
        ButtonComponent,
        LabelComponent,
    },
    data() {
        return {
            productData: {
                id: '',
                name: '',
                price: '',
                discount: 0,
                category_id: '',
                desc: ''
            },
            categories: [],
            errors: {},
            message: '',
            isLoading: false,
            loadingPercentage: 0
        };
    },
    mounted() {
        const encodedId = this.$route.params.id;

        axios.get(`${API_BASE_URL}/getProductDetails?encodedId=${encodedId}`)
            .then(response => {
                const product = response.data.product;
                console.log("productDetails", product);
                
                this.productData = {
                    id: encodedId,
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
            if (this.isLoading) return;
            this.isLoading = true;
            this.loadingPercentage = 0;
            const productData = {
                id: this.productData.id,
                name: this.productData.name,
                price: Number(this.productData.price),
                discount: Number(this.productData.discount) || 0,
                category_id: String(this.productData.category_id), 
                desc: this.productData.desc
            };

            const config = {
                method: 'post',
                url: `${API_BASE_URL}/admin/editProduct`,
                headers: { 
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(productData)
            };

            axios.request(config)
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
