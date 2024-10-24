<template>
    <div>
        <div class="container">
            <div class="page-inner">
                <div class="page-header">
                    <h3 class="fw-bold mb-3">Danh mục</h3>
                    <div class="btn btn-success mx-5" @click="goToAddCategory()">Add new</div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Basic</h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table id="basic-datatables" class="display table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Name</th>
                                                <th>Parent</th>
                                                <th>Created at</th>
                                                <th>Updated at</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="categories.length === 0">
                                                <td colspan="5" class="text-center">{{ message }}</td>
                                            </tr>
                                            <tr v-for="(category, index) in categories" :key="category.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ category.name }}</td>
                                                <td>{{ getParentCategoryName(category.parent_id) }}</td>
                                                <td>{{ formatDate(category.created_at) }}</td>
                                                <td>{{ formatDate(category.updated_at) }}</td>
                                                <td>
                                                    <a @click="getEncrypt(category.id)"
                                                        class="btn btn-primary btn-sm">Edit</a>
                                                    <a @click="checkCategoryAsset(category.id)"
                                                        class="btn btn-danger btn-sm">Delete</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav aria-label="pagination">
                    <ul class="pagination">
                        <li v-if="currentPage > 1">
                            <a href="" @click.prevent="changePage(currentPage - 1)" aria-hidden="true">
                                « <span class="visuallyhidden">Previous set of pages</span>
                            </a>
                        </li>
                        <li v-for="page in totalPages" :key="page">
                            <a href="" @click.prevent="changePage(page)" :class="{ 'active': currentPage === page }"
                                :aria-current="currentPage === page ? 'page' : undefined">
                                <span class="visuallyhidden">Page </span>{{ page }}
                            </a>
                        </li>
                        <li v-if="currentPage < totalPages">
                            <a href="" @click.prevent="changePage(currentPage + 1)" aria-hidden="true">
                                <span class="visuallyhidden">Next set of pages</span> »
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import { API_BASE_URL } from '../../../utils/config';
import axios from 'axios';
export default {
    data() {
        return {
            categories: [],
            parentCategories: {}, // Thêm một đối tượng để lưu tên danh mục cha
            idEncode: 0,
            currentPage: 1,
            totalPages: 0,
            message: "Không tồn tại một dữ liệu nào",
        };
    },
    methods: {
        async getCategoriesByPage(page) {
            try {
                const response = await axios.get(`${API_BASE_URL}/categories?page=${page}`);
                this.categories = response.data.data;
                this.totalPages = response.data.last_page;
                this.currentPage = response.data.current_page;

                // Lấy tên danh mục cha cho tất cả danh mục
                await this.fetchParentCategories();
            } catch (error) {
                console.error("There was an error fetching categories:", error);
            }
        },
        async fetchParentCategories() {
            try {
                const parentIds = this.categories.map(category => category.parent_id).filter(id => id !== null);
                const response = await axios.get(`${API_BASE_URL}/categories/parent?ids=${parentIds.join(',')}`);
                response.data.forEach(parent => {
                    this.parentCategories[parent.id] = parent.name;
                });
            } catch (error) {
                console.error("There was an error fetching parent categories:", error);
            }
        },
        getParentCategoryName(parentId) {
            return this.parentCategories[parentId] || 'No Parent';
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
        async getEncrypt(id) {
            try {
                const response = await axios.get(`${API_BASE_URL}/encrypt/${id}`);
                this.idEncode = response.data.encrypted_id;
                this.$router.push({
                    name: 'edit-category',
                    params: { idEncode: this.idEncode }
                });
            } catch (error) {
                console.error("There was an error fetching categories:", error);
            }
        },
        goToAddCategory() {
            this.$router.push({ name: 'add-category' });
        },
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.getCategoriesByPage(page);
        },
        async checkCategoryAsset(id) {
            try {
                const response = await axios.post(`${API_BASE_URL}/category/check-assets`, {
                    id: id,
                });

                if (response.status === 200) {
                    // Category can be deleted
                    if (confirm('Bạn có chắc muốn xóa?')) {
                        const encryptResponse = await axios.get(`${API_BASE_URL}/encrypt/${id}`);
                        const deleteId = encryptResponse.data.encrypted_id;
                        const deleteResponse = await axios.delete(`${API_BASE_URL}/delete-category/${deleteId}`);

                        if (deleteResponse.status === 204) {
                            alert('Xóa thành công!');
                            this.getCategoriesByPage(this.currentPage);
                        } else {
                            alert('Lỗi khi xóa danh mục!');
                        }
                    }
                } else if (response.status === 201) {
                    // Category has child categories or products
                    alert('Danh mục này tồn tại các danh mục con và các sản phẩm thuộc nó. Bạn phải chuyển sang một danh mục khác trước khi xóa!');

                    // Redirect to the category-assets page
                    const encryptResponse = await axios.get(`${API_BASE_URL}/encrypt/${id}`);
                    this.idEncode = encryptResponse.data.encrypted_id;
                    this.$router.push({
                        name: 'category-assets',
                        params: { idEncode: this.idEncode }
                    });
                } else {
                    alert('Không thể kiểm tra tài sản danh mục. Vui lòng thử lại sau.');
                }
            } catch (error) {
                console.error("There was an error checking category assets:", error.response);
                alert("Đã xảy ra lỗi khi kiểm tra tài sản danh mục!");
            }
        }

    },
    created() {
        this.getCategoriesByPage(this.currentPage);
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