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
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">Add new variant</div>
                            </div>
                            <div class="card-body">
                                <LoadingOverlay :isLoading="isLoading" :loadingPercentage="loadingPercentage" />
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-6">
                                            <LabelComponent text="Colors" />
                                            <div class="row gutters-xs">
                                                <div class="col-auto" v-for="color in colors" :key="color.id">
                                                    <label class="colorinput">
                                                        <input type="radio" name="color" :value="color.id"
                                                            class="colorinput-input" v-model="productData.color_id" />
                                                        <span class="colorinput-color"
                                                            :style="{ backgroundColor: color.name }"></span>
                                                    </label>
                                                </div>
                                            </div>
                                            <ErrorMessage :errorMessage="errors.color_id" />
                                        </div>
                                        <div class="col-6">
                                            <LabelComponent text="Sizes" />
                                            <div class="selectgroup w-100">
                                                <label class="selectgroup-item" v-for="size in sizes" :key="size.id">
                                                    <input type="radio" name="size" :value="size.id"
                                                        class="selectgroup-input" v-model="productData.size_id" />
                                                    <span class="selectgroup-button">{{ size.name }}</span>
                                                </label>
                                            </div>
                                            <ErrorMessage :errorMessage="errors.size_id" />
                                        </div>

                                        <div class="col-6">
                                            <LabelComponent text="Quantity" />
                                            <br>
                                            <input type="number" class="form-control" id="quantity"
                                                placeholder="Enter quantity" v-model="productData.quantity" />
                                            <ErrorMessage :errorMessage="errors.quantity" />
                                        </div>
                                        <div class="col-6">
                                            <LabelComponent text="Images" />
                                            <br>
                                            <input type="file" class="form-control-file" id="images" multiple
                                                @change="handleFileUpload" />
                                            <ErrorMessage :errorMessage="errors.images" />
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action">
                                    <ButtonComponent btnClass="btn btn-success" label="Submit" @click="submitForm"
                                        :disabled="isLoading" />
                                    <ButtonComponent btnClass="btn btn-danger" label="Cancel" @click="goBack" />
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
import SideBarComponent from '../SideBarComponent.vue';
import NavbarComponent from '../NavbarComponent.vue';
import HeaderComponent from '../HeaderComponent.vue';
import FooterComponent from '../FooterComponent.vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import ErrorMessage from '@/components/common/ErrorMessageComponent.vue';
import LoadingOverlay from '@/components/common/LoadingOverlayComponent.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
import { useToast } from 'vue-toastification';
import LabelComponent from '@/components/common/LabelComponent.vue';

export default {
    name: 'AddNewVariant',
    components: {
        SideBarComponent, NavbarComponent, HeaderComponent, FooterComponent, ButtonComponent, ErrorMessage, LoadingOverlay, LabelComponent
    },
    data() {
        return {
            sizes: [],
            colors: [],
            productData: {
                product_id: this.$route.query.id,
                color_id: '',
                size_id: '',
                quantity: '',
                images: []
            },
            errors: {},
            isLoading: false,
            loadingPercentage: 0
        };
    },
    setup() {
        const toast = useToast();
        return { toast };
    },
    mounted() {
        this.checkProductExists();
        this.loadSizes();
        this.loadColors();
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        checkProductExists() {
            axios.get(`${API_BASE_URL}/checkProduct`, {
                params: { id: this.productData.product_id }
            })
                .then(response => {
                    if (response.data.status === 'error') {
                        this.toast.error(response.data.message);
                        this.$router.push("/admin/products");
                    }
                });
        },
        loadSizes() {
            axios.get(`${API_BASE_URL}/getAllSizes`)
                .then(response => {
                    this.sizes = response.data.sizes;
                })
                .catch(error => {
                    console.error(error);
                    this.toast.error('Failed to load sizes');
                });
        },
        loadColors() {
            axios.get(`${API_BASE_URL}/getAllColors`)
                .then(response => {
                    this.colors = response.data.colors;
                })
                .catch(error => {
                    console.error(error);
                    this.toast.error('Failed to load colors');
                });
        },
        handleFileUpload(event) {
            const files = event.target.files;
            this.productData.images = files.length ? Array.from(files) : [];
        },
        submitForm() {
            this.errors = {};
            this.isLoading = true;
            this.loadingPercentage = 0;

            const data = new FormData();
            data.append('product_id', this.productData.product_id);
            data.append('color_id', this.productData.color_id);
            data.append('size_id', this.productData.size_id);
            data.append('quantity', this.productData.quantity);
            data.append('status', 1);

            this.productData.images.forEach(file => {
                data.append('images[]', file);
            });

            axios.post(`${API_BASE_URL}/admin/addProductVariant`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: progressEvent => {
                    this.loadingPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
            })
                .then(response => {
                    this.toast.success(response.data.message || 'Variant added successfully');
                    this.resetForm();
                })
                .catch(error => {
                    console.error(error);
                    if (error.response) {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors;
                        } else if (error.response.status === 409) {
                            this.toast.error(error.response.data.message);
                        } else {
                            this.toast.error(error.response.data.message);
                        }
                    } else {
                        this.toast.error('Network error, please try again');
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                    this.loadingPercentage = 0;
                });
        },
        resetForm() {
            this.productData = {
                product_id: this.$route.query.id,
                color_id: '',
                size_id: '',
                quantity: '',
                images: []
            };
            this.errors = {};
        }
    }
};
</script>
