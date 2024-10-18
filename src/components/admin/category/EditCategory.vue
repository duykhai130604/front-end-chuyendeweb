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
                <select class="form-select" id="parentCategory" v-model="parentCategory">
                    <option value="0">Chọn danh mục cha</option>
                    <option v-for="parent in parentCategories" :key="parent.id" :value="parent.id"
                        :selected="parent.id === parentCategory">
                        {{ parent.name }}
                    </option>
                </select>
            </div>
            <!-- Buttons -->
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-danger me-2" @click="cancel">Hủy</button>
                <button type="submit" class="btn btn-primary"
                    :disabled="errorMessage != '' || category.name== '' || parentCategory == null">Lưu</button>
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
            parentCategory: null
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
                this.parentCategories = this.categories.filter(category => {
                    return category.parent_id === 0 && (this.category && category.id != this.category.id);
                });
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
        cancel() {
            this.$router.push({ name: 'list-categories' });
        },
        async updateCategory() {
            try {
                const payload = {
                    id: this.idEncode,
                    parent_id: this.parentCategory,
                    name: this.category.name,
                    status: 1
                };
                const response = await axios.post('http://127.0.0.1:8000/api/update-category', payload);
                if (response.status === 200) {
                    alert("Sửa danh mục thành công!!!");
                    this.$router.push({ name: 'list-categories' });
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    console.log('Invalid data provided.', { type: 'error' });
                } else if (error.response && error.response.status === 404) {
                    console.log('Category not found.', { type: 'error' });
                } else {
                    console.log('An unexpected error occurred.', { type: 'error' });
                }
                console.error(error);
            }
        }
    },
    created() {
        this.fetchCategory();
        this.getCategoriesByPage();
    },
};
</script>