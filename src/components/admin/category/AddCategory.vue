<template> 
    <div>
        <div class="page-header">
            <h3 class="fw-bold mb-3">Thêm danh mục</h3>
        </div>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="categoryName" class="form-label">Tên danh mục</label>
                <input type="text" class="form-control" id="categoryName" v-model="categoryName"
                    placeholder="Nhập tên danh mục" @input="validateInput" />
                <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
            </div>

            <!-- Danh mục cha -->
            <div class="mb-3">
                <label for="parentCategory" class="form-label">Danh mục cha</label>
                <select class="form-select" id="parentCategory" v-model="categoryParentId">
                    <option value="" disabled selected>Chọn danh mục cha</option>
                    <option v-for="parent in parentCategories" :key="parent.id" :value="parent.id">
                        {{ parent.name }}
                    </option>
                </select>
            </div>

            <!-- Buttons -->
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-danger me-2" @click="cancel">Hủy</button>
                <button type="submit" class="btn btn-primary" :disabled="errorMessage">Lưu</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: [],       
            categoryName: '',     
            categoryParentId: '',  
            errorMessage: '',     
        };
    },
    computed: {
        parentCategories() {
            return this.categories.filter(parent => parent.parent_id === 0);
        }
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
        submitForm() {
            if (this.errorMessage) {
                alert("Vui lòng kiểm tra lại thông tin!");
                return;
            }
            alert("Danh mục đã được lưu!");
        },
        cancel() {
            this.$router.push({ name: 'list-categories' });
        },
    },
    created() {
    },
};

</script>