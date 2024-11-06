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
                                            <InputComponent type="text" id="productName" v-model="productData.name"
                                                placeholder="Enter name" />
                                            <ErrorMessage :errorMessage="errors.name" />

                                            <div class="row">
                                                <div class="col-6">
                                                    <LabelComponent for="productPrice" text="Price" />
                                                    <InputComponent type="text" id="productPrice"
                                                        v-model="productData.price" placeholder="Price" />
                                                    <ErrorMessage :errorMessage="errors.price" />
                                                </div>
                                                <div class="col-6">
                                                    <LabelComponent for="discount" text="Discount" />
                                                    <InputComponent type="text" id="discount"
                                                        v-model="productData.discount" placeholder="Discount" />
                                                    <ErrorMessage :errorMessage="errors.discount" />
                                                </div>
                                                <div class="col-12">
                                                    <div class="form-check">
                                                        <LabelComponent text="Categories" />
                                                        <div v-for="category in categories" :key="category.id">
                                                            <input v-model="productData.categories" name="categories[]"
                                                                class="form-check-input" type="checkbox"
                                                                :value="category.id"
                                                                :id="'categoryCheck' + category.id" />
                                                            <label class="form-check-label"
                                                                :for="'categoryCheck' + category.id">
                                                                {{ category.name }}
                                                            </label>
                                                        </div>
                                                        <ErrorMessage :errorMessage="errors.categories" />
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <LabelComponent text="Thumbnail Old" />
                                                    <br>
                                                    <img class="img-fluid image-old" alt="Thumbnail old"
                                                        :src="thumbnailOld" />
                                                </div>
                                                <div class="col-6">
                                                    <LabelComponent text="Thumbnail" />
                                                    <br>
                                                    <input type="file" class="form-control-file" id="image"
                                                        @change="handleFileUpload" />
                                                    <ErrorMessage :errorMessage="errors.image" />
                                                </div>
                                            </div>
                                            <LabelComponent for="description" text="Description" />
                                            <CKEditorComponent v-model="productData.desc" />
                                            <ErrorMessage :errorMessage="errors.desc" />
                                        </div>
                                        <div class="card-action">
                                            <ButtonComponent label="Save change" btnClass="btn-success"
                                                @click="submitProduct" :disabled="isLoading" />
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
            <LoadingOverlay :isLoading="isLoading" />
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
import { useToast } from "vue-toastification"
export default {
    name: 'EditProduct',
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
                id: '',
                name: '',
                price: '',
                discount: 0,
                categories: [],
                desc: ''
            },
            categories: [],
            errors: {},
            message: '',
            isLoading: false,
            thumbnailOld: ''
        };
    },
    mounted() {
        const encodedId = this.$route.params.id;
        axios.get(`${API_BASE_URL}/getProductDetails?encodedId=${encodedId}`)
            .then(response => {
                const product = response.data.product;
                this.thumbnailOld = product.thumbnail;
                this.productData = {
                    id: encodedId,
                    name: product.name,
                    price: product.price,
                    discount: product.discount,
                    categories: product.categories || [],
                    desc: product.desc
                };

                return axios.get(`${API_BASE_URL}/getCategoriesByProductId?encodeId=${encodedId}`);
            })
            .then(response => {
                this.productData.categories = response.data.selectedCategories;
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    this.toast.error(error.response.data.message);
                    this.$router.push('/admin/products');
                }
            });
        // Lấy tất cả danh mục
        axios.get(`${API_BASE_URL}/getAllCategories`)
            .then(response => {
                this.categories = response.data;
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];
            this.productData.image = file ? file : null;
        },
        submitProduct() {
            if (this.isLoading) return;
            this.isLoading = true;

            const formData = new FormData();
            formData.append('id', this.productData.id);
            formData.append('name', this.productData.name);
            formData.append('price', Number(this.productData.price));
            formData.append('discount', Number(this.productData.discount) || 0);
            this.productData.categories.forEach(category => {
                formData.append('categories[]', category);
            });
            formData.append('desc', this.productData.desc);
            if (this.productData.image) {
                formData.append('image', this.productData.image);
            }

            const config = {
                method: 'post',
                url: `${API_BASE_URL}/admin/editProduct`,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
                data: formData,
            };

            axios.request(config)
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
                    } else {
                        alert('System error, please try again later');
                    }
                });
        },
    }

}
</script>
<style>
.image-old {
    width: 150px;
    height: 150px;
    border-radius: 10px;
}
</style>
