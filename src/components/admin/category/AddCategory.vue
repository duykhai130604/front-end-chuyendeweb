<template>
    <div>
        <div class="page-header">
            <h3 class="fw-bold mb-3">Thêm danh mục</h3>
        </div>
        <form @submit.prevent="addCategory">
            <div class="mb-3">
                <label for="categoryName" class="form-label">Tên danh mục</label>
                <input type="text" class="form-control" id="categoryName" v-model="categoryName"
                    placeholder="Nhập tên danh mục" @input="validateInput" />
                <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
            </div>
            <!-- Danh mục cha -->
            <div class="mb-3">
                <label for="parentCategory" class="form-label">Danh mục cha</label>
                <select class="form-select" id="parentCategory" v-model="parentCategory">
                    <option :value="0">Không có cha</option>
                    <option v-for="parent in parentCategories" :key="parent.id" :value="parent.id">
                        {{ parent.name }}
                    </option>
                </select>
            </div>
            <!-- Buttons -->
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-danger me-2" @click="cancel">Hủy</button>
                <button type="submit" class="btn btn-primary"
                    :disabled="errorMessage != '' || categoryName == '' || parentCategory == null">Lưu</button>
            </div>
        </form>
    </div>
</template>

<script>
import { API_BASE_URL } from '../../../utils/config';
import axios from "axios"
export default {
    data() {
        return {
            categories: [],
            parentCategories: [],
            categoryName: '',
            errorMessage: '',
            parentCategory: ''
        };
    },
    methods: {
        validateInput() {
            const regex = /^(?!\s)(?!.*\s{2,})[a-zA-ZÀ-ỹà-ỹ0-9\s_-]{1,255}$/;
            if (!regex.test(this.categoryName)) {
                this.errorMessage = 'Tên danh mục không được chứa ký tự đặc biệt và không quá 255 ký tự và không được bỏ trống!!!';
            } else {
                this.errorMessage = '';
            }
        },
        cancel() {
            this.$router.push({ name: 'list-categories' });
        },
        async getCategoriesByPage() {
            try {
                const response = await axios.get(API_BASE_URL+'/categories');
                this.categories = response.data.data;
                this.parentCategories = this.categories.filter(category => category.parent_id === 0)
            } catch (error) {
                console.error("There was an error fetching categories:", error);
            }
        },
        async addCategory() {
            try {
                const regex = /^(?!\s)(?!.*\s{2,})[a-zA-ZÀ-ỹà-ỹ0-9\s_-]{1,255}$/;
                if (regex.test(this.categoryName)) {
                    const response = await axios.post(API_BASE_URL+'/add-category', {
                        name: this.categoryName,
                        parent_id: this.parentCategory,
                        status: 1
                    });
                    if (response.data ==0) {
                        alert("Danh mục bị trùng!!!")
                    }if (response.data ==1) {
                    alert("Danh mục đã được thêm!");
                    this.$router.push({ name: 'list-categories' });
                    }
                }
            } catch (error) {
                console.error("There was an error adding a new category:", error);
            }
        }
    },
    created() {
        this.getCategoriesByPage();
    },
};

</script>