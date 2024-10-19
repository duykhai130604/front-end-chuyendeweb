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
                        <h3 class="fw-bold mb-3">Add New Product</h3>
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
                                    <div class="row">
                                        <div class="form-group">
                                            <label for="productName">Product Name</label>
                                            <input type="text" class="form-control" id="productName"
                                                placeholder="Enter name" />
                                            <div class="row pt-3">
                                                <div class="col-6">
                                                    <label for="productPrice">Price</label>
                                                    <input type="text" class="form-control" id="productPrice"
                                                        placeholder="Price" />
                                                </div>
                                                <div class="col-6">
                                                    <label for="discount">Discount</label>
                                                    <input type="text" class="form-control" id="discount"
                                                        placeholder="Discount" />
                                                </div>
                                            </div>
                                            <label class="pt-3" for="categorySelect">Category</label>
                                            <select class="form-select form-control-lg" id="categorySelect">
                                                <option v-for="category in categories" :key="category.id" :value="category.id">
                                                    {{ category.name }}
                                                </option>
                                            </select>
                                            <label class="pt-3" for="description">Description</label>
                                            <CKEditorComponent />
                                        </div>
                                        <div class="card-action">
                                            <button class="btn btn-success">Submit</button>
                                            <router-link to="/admin/products" class="btn btn-danger">Cancel</router-link>
                                        </div>
                                    </div>
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
import axios from 'axios';
import CKEditorComponent from "../../CKEditor/CKEditorComponent.vue";
import SideBarComponent from '../SideBarComponent.vue';
import NavbarComponent from '../NavbarComponent.vue';
import HeaderComponent from '../HeaderComponent.vue';
import FooterComponent from '../FooterComponent.vue';

export default {
    name: 'ProductList',
    components: {
        SideBarComponent, NavbarComponent, HeaderComponent, FooterComponent, CKEditorComponent
    },
    data() {
        return {
            categories: [] // Khởi tạo biến categories
        };
    },
    mounted() {
        // Gọi API để lấy danh sách categories
        axios.get('http://localhost:8000/api/getAllCategories')
            .then(response => {
                this.categories = response.data; // Lưu dữ liệu vào biến categories
            })
            .catch(error => {
                console.error("Có lỗi xảy ra khi lấy categories:", error);
            });
    }
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
</style>
