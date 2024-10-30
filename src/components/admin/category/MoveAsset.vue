<template>
    <div class="page-header">
        <h3 class="fw-bold mb-3">Các danh mục và sản phẩm thuộc {{ category.name }}</h3>
    </div>
    <div class="card-body">
        <h3>Bảng sản phẩm</h3>
        <div class="table-responsive">
            <table class="display table table-striped table-hover">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="products.length === 0">
                        <td colspan="5" class="text-center">{{ message }}</td>
                    </tr>
                    <tr v-for="(product, index) in products" :key="product.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ formatPrice(product.price) }}</td>
                        <td>{{ formatDate(category.created_at) }}</td>
                        <td>{{ formatDate(category.updated_at) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card-body">
            <h3>Bảng danh mục</h3>
            <div class="table-responsive">
                <table id="basic-datatables" class="display table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="cateChilds.length === 0">
                            <td colspan="4" class="text-center">{{ message }}</td>
                        </tr>
                        <tr v-for="(category, index) in cateChilds" :key="category.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ category.name }}</td>
                            <td>{{ formatDate(category.created_at) }}</td>
                            <td>{{ formatDate(category.updated_at) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <form @submit.prevent="updateCategory">
            <div class="mb-3">
                <label for="newCategory" class="form-label">Chọn danh mục khác</label>
                <select class="form-select" id="newCategory" v-model="newCategory">
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <!-- Buttons -->
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-danger me-2" @click="cancel">Hủy</button>
                <button type="submit" class="btn btn-primary" @click="updateProductCategoryAndParent()">Lưu</button>
            </div>
        </form>
    </div>
</template>

<script>
import { API_BASE_URL } from '../../../utils/config';
import axios from 'axios';
export default {
    data() {
        return {
            category: {
                id: null,
                name: "",
                parent_id: null,
            },
            categories: [],
            errorMessage: '',
            products: [],
            message: "Không tồn tại một dữ liệu nào",
            cateChilds: [],
            newCategory: null,

        };
    },
    computed: {
        idEncode() {
            return this.$route.params.idEncode;
        },
    },
    methods: {
        async fetchCategory() {
            try {
                const response = await axios.get(API_BASE_URL + `/category/${this.idEncode}`);
                this.category = response.data;
                this.getCategoryChilds();
                this.getProducts();
            } catch (error) {
                console.error("There was an error fetching the category:", error);
            }
        },
        async getCategories() {
            try {
                const response = await axios.get(API_BASE_URL + '/getAllCategories');
                this.categories = response.data;
                this.categories = this.categories.filter(category => category.id !== this.category.id);
            } catch (error) {
                console.error("There was an error fetching categories:", error);
            }
        },
        cancel() {
            this.$router.push({ name: 'list-categories' });
        },
        formatPrice(price) {
            return price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
        },
        async getCategoryChilds() {
            try {
                const response = await axios.get(API_BASE_URL + `/category-childs/${this.idEncode}`);
                this.cateChilds = response.data;
            } catch (error) {
                console.error("There was an error fetching products:", error);
            }
        },
        async getProducts() {
            try {
                const response = await axios.get(API_BASE_URL + `/products-category/${this.idEncode}`);
                this.products = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("There was an error fetching products:", error);
            }
        },
        formatDate(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            const seconds = String(d.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        async updateProductCategoryAndParent() {
            try {

                const productIds = this.products.length > 0 ? this.products.map(product => product.id) : [];
                const categoryIds = this.cateChilds.length > 0 ? this.cateChilds.map(category => category.id) : [];
               await axios.post(API_BASE_URL + '/update-product-category-and-parent', {
                    product_ids: productIds,
                    old_category_id: this.category.id,
                    new_category_id: this.newCategory,
                    category_ids: categoryIds
                });
                alert("Product categories and parent updated successfully!");
                this.$router.push({ name: 'list-categories' });
            } catch (error) {
                alert("Hãy chọn danh mục mới");
            }
        }
    },

    created() {
        this.fetchCategory();
        this.getCategories();
    },
};
</script>