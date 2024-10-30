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
                                        <div class="col-6">
                                            <div class="form-check">
                                                <LabelComponent text="Categories" htmlFor="categorySelect" />
                                                <div v-for="category in categories" :key="category.id">
                                                    <input v-model="productData.categories" name="categories[]"
                                                        class="form-check-input" type="checkbox" :value="category.id"
                                                        id="flexCheckDefault">
                                                    <label class="form-check-label" for="flexCheckDefault">
                                                        {{ category.name }}
                                                    </label>
                                                </div>
                                                <ErrorMessage :errorMessage="errors.categories" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <LabelComponent text="Thumbnail" />
                                            <br>
                                            <input type="file" class="form-control-file" id="image"
                                                @change="handleFileUpload" />
                                            <ErrorMessage :errorMessage="errors.image" />
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
import { useToast } from 'vue-toastification';

export default {
    name: 'AddProduct',
    setup() {
        const toast = useToast();
        return {
            toast
        };
    },
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
                categories: [],
                desc: '',
                image: null
            },
            categories: [],
            errors: {},
            isLoading: false,
            loadingPercentage: 0
        };
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];
            this.productData.image = file ? file : null;
        },

        submitProduct() {
            if (this.isLoading) return;
            this.isLoading = true;
            this.loadingPercentage = 0;

            const formData = new FormData();
            formData.append('name', this.productData.name);
            formData.append('price', this.productData.price);
            formData.append('discount', this.productData.discount);
            formData.append('desc', this.productData.desc);
            formData.append('status', 1);

            this.productData.categories.forEach(category => {
                formData.append('categories[]', category);
            });

            if (this.productData.image) {
                formData.append('image', this.productData.image);
            }

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    this.loadingPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
            };

            axios.post(`${API_BASE_URL}/admin/addProduct`, formData, config)
                .then(response => {
                    this.isLoading = false;
                    this.toast.success(response.data.message, {
                        position: 'top-center',
                        timeout: 1500,
                        pauseOnHover: false,
                    });
                    this.$router.push('/admin/products');
                })
                .catch(error => {
                    this.isLoading = false;
                    if (error.response && error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        }
    },
    mounted() {
        axios.get(`${API_BASE_URL}/getAllCategories`)
            .then(response => {
                this.categories = response.data;
            })
            .catch(error => {
                this.errors = error.response.data.errors;
            });
    }
}
</script>
