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
                                        <h4 class="card-title">Product Variants</h4>
                                        <router-link
                                            :to="{ path: '/admin/products/addNewVariants', query: { id: productId } }"
                                            class="ms-auto">
                                            <ButtonComponent label="Add New Variant" btnClass="btn-primary btn-round"
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
                                                    <th>Color</th>
                                                    <th>Size</th>
                                                    <th>Quantity</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-if="filteredVariants.length === 0">
                                                    <td colspan="5" class="text-center">{{ message }}</td>
                                                </tr>
                                                <tr v-for="variant in filteredVariants" :key="variant.id">
                                                    <td>{{ variant.id }}</td>
                                                    <td>
                                                        <div class="col-6">
                                                            <div class="row gutters-xs">
                                                                <div class="col-auto">
                                                                    <label class="colorinput">
                                                                        <span class="colorinput-color"
                                                                            :style="{ backgroundColor: variant.color_name }"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{{ variant.size_name }}</td>
                                                    <td>{{ variant.quantity }}</td>
                                                    <td>
                                                        <div class="form-button-action">
                                                            <router-link
                                                                :to="{ name: 'editVariant', params: { id: variant.id } }">
                                                                <ButtonComponent btnClass="btn-link btn-info"
                                                                    icon="fa fa-edit" />
                                                            </router-link>
                                                            <ButtonComponent btnClass="btn-link btn-danger"
                                                                icon="fa fa-times" @click="deleteVariant(variant.id)" />
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
            <LoadingOverlay :isLoading="isLoading" />
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
import LoadingOverlay from '@/components/common/LoadingOverlayComponent.vue';
import ButtonComponent from "../../common/ButtonComponent.vue"
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
    setup() {
        const toast = useToast();
        return { toast };
    },
    name: 'ProductVariants',
    components: {
        SideBarComponent,
        HeaderComponent,
        FooterComponent,
        NavbarComponent,
        PaginationComponent,
        ButtonComponent,
        LoadingOverlay
    },
    data() {
        return {
            variants: [],
            filteredVariants: [],
            currentPage: 1,
            totalPages: 0,
            message: "Loading...",
            keyword: '',
            searchTimeout: null,
            productId: null,
            isLoading: false
        };
    },
    mounted() {
        this.productId = this.$route.params.id;
        this.fetchVariants();
    },
    methods: {
        fetchVariants(page = 1, keyword = '') {
            this.isLoading = true;
            const config = {
                method: 'get',
                url: `${API_BASE_URL}/admin/productVariants`,
                params: {
                    encodedId: this.productId,
                    keyword: keyword,
                    page: page
                }
            };
            axios.request(config)
                .then((response) => {
                    if (response.data.status === 'success' && response.data.variants) {
                        this.variants = response.data.variants.data;
                        this.filteredVariants = this.variants;
                        this.message = "";
                        this.totalPages = response.data.variants.last_page || 0;
                    } else {
                        this.variants = [];
                        this.filteredVariants = [];
                        this.message = response.data.message;
                        this.totalPages = 0;
                    }
                    this.currentPage = page;
                })
                .catch((error) => {
                    this.toast.error(error.response?.data?.message);
                    this.$router.push("/admin/products");
                    this.totalPages = 0;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        handleSearch(keyword) {
            this.keyword = keyword;
            clearTimeout(this.searchTimeout);

            this.searchTimeout = setTimeout(() => {
                this.fetchVariants(1, keyword);
            }, 500);
        },

        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.fetchVariants(page, this.keyword);
        },

        deleteVariant(id) {
            if (confirm("Are you sure you want to delete this variant?")) {
                axios.delete(`${API_BASE_URL}/admin/deleteProductVariant`, { data: { variant_id: id } })
                    .then((response) => {
                        if (response.data.status === 'success') {
                            this.filteredVariants = this.filteredVariants.filter(variant => variant.id !== id);
                            this.toast.success(response.data.message);
                        } else {
                            this.toast.error(response.data.message);
                        }
                    })
                    .catch((error) => {
                        this.toast.error(error.response?.data?.message);
                    });
            }
        },
    }
};
</script>

<style>
@import url("../../../assets/admin/assets/font-awesome-4.7.0/css/font-awesome.css");
</style>
