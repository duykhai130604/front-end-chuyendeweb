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
                                    <div class="row">
                                        <div class="col-12">
                                            <InputComponent id="productName" label="Product Name"
                                                v-model="productData.name" placeholder="Enter name"
                                                :errorMessage="errors.name" />
                                        </div>
                                        <div class="col-6">
                                            <InputComponent id="productPrice" label="Price" v-model="productData.price"
                                                placeholder="Price" :errorMessage="errors.price" />
                                        </div>
                                        <div class="col-6">
                                            <InputComponent id="discount" label="Discount"
                                                v-model="productData.discount" placeholder="Discount"
                                                :errorMessage="errors.discount" />
                                        </div>
                                        <div class="col-12 pt-3">
                                            <LabelComponent text="Category" htmlFor="categorySelect" />
                                            <select class="form-select form-control-lg" id="categorySelect"
                                                v-model="productData.category_id">
                                                <option v-for="category in categories" :key="category.id"
                                                    :value="category.id">
                                                    {{ category.name }}
                                                </option>
                                            </select>
                                            <ErrorMessage :errorMessage="errors.category_id" />
                                        </div>
                                        <div class="col-12">
                                            <LabelComponent text="Description" htmlFor="description" />
                                            <CKEditorComponent id="description" v-model="productData.desc" />
                                            <ErrorMessage :errorMessage="errors.desc" />
                                        </div>
                                    </div>
                                    <div class="card-action">
                                        <ButtonComponent label="Submit" btnClass="btn-success" @click="submitProduct"
                                            :disabled="isLoading" />
                                        <router-link to="/admin/products" class="btn btn-danger">Cancel</router-link>
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
    name: 'AddProduct',
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
                name: '',
                price: '',
                discount: 0,
                category_id: '',
                desc: ''
            },
            categories: [],
            errors: {},
            isLoading: false,
            loadingPercentage: 0
        };
    },
    mounted() {
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
