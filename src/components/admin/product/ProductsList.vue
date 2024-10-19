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
                                            <button class="btn btn-primary btn-round ms-auto">
                                                <i class="fa fa-plus"></i> Add New Product
                                            </button>
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
                                                            <button type="button" data-bs-toggle="tooltip"
                                                                title="Edit Product"
                                                                class="btn btn-link btn-primary btn-lg">
                                                                <i class="fa fa-edit"></i>
                                                            </button>
                                                            <button type="button" data-bs-toggle="tooltip"
                                                                title="Remove" class="btn btn-link btn-danger">
                                                                <i class="fa fa-times"></i>
                                                            </button>
                                                            <button type="button" data-bs-toggle="tooltip"
                                                                title="Manage Variants" class="btn btn-link btn-info">
                                                                <i class="fa fa-list"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <nav aria-label="pagination">
                                        <ul class="pagination">
                                            <li v-if="currentPage > 1">
                                                <a href="" @click.prevent="changePage(currentPage - 1)"
                                                    aria-hidden="true">
                                                    « <span class="visuallyhidden">Previous set of pages</span>
                                                </a>
                                            </li>
                                            <li v-for="page in totalPages" :key="page">
                                                <a href="" @click.prevent="changePage(page)"
                                                    :class="{ 'active': currentPage === page }"
                                                    :aria-current="currentPage === page ? 'page' : undefined">
                                                    <span class="visuallyhidden">Page </span>{{ page }}
                                                </a>
                                            </li>
                                            <li v-if="currentPage < totalPages">
                                                <a href="" @click.prevent="changePage(currentPage + 1)"
                                                    aria-hidden="true">
                                                    <span class="visuallyhidden">Next set of pages</span> »
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
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
import HeaderComponent from '../HeaderComponent.vue';
import FooterComponent from '../FooterComponent.vue';
import NavbarComponent from '../NavbarComponent.vue';
import axios from 'axios';

export default {
    name: 'ProductList',
    components: {
        SideBarComponent,
        HeaderComponent,
        FooterComponent,
        NavbarComponent
    },
    data() {
        return {
            products: [],
            filteredProducts: [],
            currentPage: 1,
            totalPages: 0,
            message: "Loading...",
            keyword: '',
            searchTimeout: null
        };
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        fetchProducts(page = 1, keyword = '') {
            const config = {
                method: 'get',
                url: `http://localhost:8000/api/products?page=${page}&keyword=${keyword}`,
                headers: {}
            };
            axios.request(config)
                .then((response) => {
                    console.log(response.data);

                    if (response.data.data && Array.isArray(response.data.data)) {
                        this.products = response.data.data;
                        this.filteredProducts = this.products;
                        this.message = "";
                    } else {
                        this.products = [];
                        this.filteredProducts = [];
                        this.message = response.data.message
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
        }
    }
};
</script>

<style>
@import url("../../../assets/admin/assets/font-awesome-4.7.0/css/font-awesome.css");

.visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: auto;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
}

nav {
    display: flex;
    justify-content: center;
    border-top: 1px solid #eee;
    margin-top: 1em;
    padding-top: 0.5em;
}

.pagination {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.pagination li {
    margin: 0 1px;
}

.pagination a {
    display: block;
    padding: 0.5em 1em;
    border: 1px solid #999;
    border-radius: 0.2em;
    text-decoration: none;
}

.pagination a[aria-current="page"] {
    background-color: #333;
    color: #fff;
}
</style>
