<template>
    <div>
        <div class="container">
            <div class="page-inner">
                <div class="page-header">
                    <h3 class="fw-bold mb-3">Danh sách Blog</h3>
                    <div class="btn btn-success mx-5" @click="goToAddBlog()">Thêm Blog Mới</div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Danh sách Blog</h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table id="basic-datatables" class="display table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tiêu đề</th>
                                                <th>Tác giả</th>
                                                <th>Ngày tạo</th>
                                                <th>Ngày cập nhật</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="blogs.length === 0">
                                                <td colspan="7" class="text-center">{{ message }}</td>
                                            </tr>
                                            <tr v-for="(blog, index) in blogs" :key="blog.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ blog.title }}</td>
                                                <td>{{ getName(blog.user_id) }}</td>
                                                <td>{{ formatDate(blog.created_at) }}</td>
                                                <td>{{ formatDate(blog.updated_at) }}</td>
                                                <td>
                                                    <a @click="getEncrypt(blog.id)"
                                                        class="btn btn-primary btn-sm">Sửa</a>
                                                    <a @click.prevent="deleteBlog(blog.id)"
                                                        class="btn btn-danger btn-sm">Xóa</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <ul class="pagination">
                                    <li v-if="currentPage > 1">
                                        <a href="" @click.prevent="changePage(currentPage - 1)" aria-hidden="true">
                                            « 
                                        </a>
                                    </li>
                                    <li v-for="page in totalPages" :key="page">
                                        <a href="" @click.prevent="changePage(page)"
                                            :class="{ 'active': currentPage === page }"
                                            :aria-current="currentPage === page ? 'page' : undefined">
                                            {{ page }}
                                        </a>
                                    </li>
                                    <li v-if="currentPage < totalPages">
                                        <a href="" @click.prevent="changePage(currentPage + 1)" aria-hidden="true">
                                             »
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            blogs: [],
            idEncode: 0,
            users: {},
            currentPage: 1,
            totalPages: 0,
            message: "Không tồn tại một dữ liệu nào",
        };
    },
    methods: {
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.getBlogsbypage(page);
        },
        async getBlogsbypage(page) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/blogs?page=${page}`);
                this.blogs = response.data.data.filter(blog => blog.status !== -1);
                this.totalPages = response.data.last_page;
                this.currentPage = response.data.current_page;
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy danh sách blog:", error);
            }
        },
        // async getBlogs() {
        //     try {
        //         const response = await axios.get('http://127.0.0.1:8000/api/blogs');
        //         this.blogs = response.data.data.filter(blog => blog.status !== -1);
        //     } catch (error) {
        //         console.error("Có lỗi xảy ra khi lấy danh sách blog:", error);
        //     }
        // },
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
                const response = await axios.get(`http://127.0.0.1:8000/api/encrypt/${id}`);
                this.idEncode = response.data.encrypted_id;
                this.$router.push({
                    name: 'edit-blog',
                    params: { idEncode: this.idEncode }
                });
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy mã hóa:", error);
            }
        },
        async deleteBlog(id) {
            const idEncrypt = await axios.get(`http://127.0.0.1:8000/api/encrypt/${id}`);
            const idEncode = idEncrypt.data.encrypted_id;
            if (confirm("Bạn có chắc chắn muốn xóa blog này?")) {
                try {
                    await axios.delete(`http://127.0.0.1:8000/api/delete-blog/${idEncode}`);
                    alert("Xóa blog thành công!");
                    this.getBlogs();
                } catch (error) {
                    console.error("Có lỗi xảy ra khi xóa blog:", error);
                }
            }
        },
        async getNameAuthor() {
            const ids = this.blogs.map(blog => blog.user_id).filter(user_id => user_id !== null);
            if (ids.length) {
                const response = await axios.get(`http://127.0.0.1:8000/api/get-authorname?ids=${ids.join(',')}`);
                response.data.forEach(element => {
                    this.users[element.id] = element.name; // Gán tên tác giả cho user
                });
            }
        },
        getName(id) {
            return this.users[id] || "Unknown"; // Nếu không có tên thì trả về "Unknown"
        },
        goToAddBlog() {
            this.$router.push({ name: 'add-blog' });
        },
    },
    changePage(page) {
        if (page < 1 || page > this.totalPages) return;
        this.getBlogsbypage(page);
    },
    async created() {
        await this.getBlogsbypage();
        await this.getNameAuthor();
    }
};
</script>
<style scoped>
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