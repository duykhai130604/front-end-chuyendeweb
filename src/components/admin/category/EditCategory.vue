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
                    placeholder="Nhập tên danh mục" />
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
        };
    },
    computed: {
        idEncode() {
            return this.$route.params.idEncode;
        },
        parentCategories() {
            return this.categories.filter(parent => parent.parent_id === 0);
        }
    },
    methods: {
        async fetchCategory() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/category/${this.idEncode}`);
                this.category = response.data;
                console.log(this.categories);

            } catch (error) {
                console.error("There was an error fetching the category:", error);
            }
        },
    },
    created() {
        this.fetchCategory();
        const categories = this.$route.query.categories;
        if (categories) {
            try {
                this.categories = JSON.parse(categories);
            } catch (error) {
                console.error("Error parsing categories from query:", error);
            }
        }
    },
};
</script>