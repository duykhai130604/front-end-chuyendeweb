<template>
    <div>
        <div class="page-header">
            <h3 class="fw-bold mb-3">Sửa danh mục</h3>
        </div>
        <form @submit.prevent="updateCategory">
            <!-- Tên danh mục -->
            <div class="mb-3">
                <label for="categoryName" class="form-label">Tên danh mục</label>
                    <input type="text" class="form-control" id="categoryName" v-model="category.name"
                    placeholder="Nhập tên danh mục" @input="validateInput()" />
                <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
            </div>
            <!-- Danh mục cha -->
            <div class="mb-3">
                <label for="parentCategory" class="form-label">Danh mục cha</label>
                <select class="form-select" id="parentCategory">
                    <option selected>Chọn danh mục cha</option>
                    <option v-for="parent in parentCategories" :key="parent.id" :value="parent.id">
                        {{ parent.name }}
                    </option>
                </select>
            </div>
            <!-- Buttons -->
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-danger me-2">Hủy</button>
                <button type="submit" class="btn btn-primary">Lưu</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            category: {
                name: "",
                parent_id: null,
            },
            categories: [],
            parentCategories: [],
            errorMessage: '', 
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
                const response = await axios.get(`http://127.0.0.1:8000/api/category/${this.idEncode}`);
                this.category = response.data;

            } catch (error) {
                console.error("There was an error fetching the category:", error);
            }
        },
        async getCategoriesByPage() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories');
                this.categories = response.data.data;
                this.parentCategories = this.categories.filter(category => category.parent_id === 0)
            } catch (error) {
                console.error("There was an error fetching categories:", error);
            }
        },
        validateInput() {
            const regex = /^(?!\s)(?!.*\s{2,})[a-zA-ZÀ-ỹà-ỹ0-9\s_-]{1,255}$/;
            if (!regex.test(this.category.name)) {
                this.errorMessage = 'Tên danh mục không được chứa ký tự đặc biệt và không quá 255 ký tự và không được bỏ trống!!!';
            } else {
                this.errorMessage = '';
            }
        },
    },
    created() {
        this.fetchCategory();
        this.getCategoriesByPage();
    },
};
</script>