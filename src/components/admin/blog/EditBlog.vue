<template>
    <div>
        <div class="page-header">
            <h3 class="fw-bold mb-3">Sửa Blog</h3>
        </div>
        <form @submit.prevent="updateBlog">
            <!-- Tiêu đề Blog -->
            <div class="mb-3">
                <label for="title" class="form-label">Tiêu đề Blog</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="blog.title"
                    placeholder="Nhập tiêu đề blog"
                    @input="validateTitle"
                    required
                />
                <div v-if="errorTitle" class="text-danger">{{ errorTitle }}</div>
            </div>

            <!-- Nội dung Blog -->
            <div class="mb-3">
                <label for="content" class="form-label">Nội dung</label>
                <textarea
                    class="form-control"
                    id="content"
                    v-model="blog.content"
                    rows="6"
                    placeholder="Nhập nội dung blog"
                    required
                ></textarea>
            </div>

            <!-- Hình thu nhỏ -->
            <div class="mb-3">
                <label for="thumbnail" class="form-label">Hình thu nhỏ</label>
                <input
                    type="file"
                    class="form-control"
                    id="thumbnail"
                    @change="handleFileUpload"
                    accept="image/*"
                />
            </div>

            <!-- Tác giả -->
            <div class="mb-3">
                <label for="user_id" class="form-label">Tác giả</label>
                <input
                    type="text"
                    class="form-control"
                    id="user_id"
                    v-model="blog.user_id"
                    placeholder="Nhập tên tác giả"
                    required
                />
            </div>

            <!-- Trạng thái -->
            <div class="mb-3">
                <label for="status" class="form-label">Trạng thái</label>
                <select class="form-select" id="status" v-model="blog.status" required>
                    <option :value="1">Công khai</option>
                    <option :value="0">Nháp</option>
                </select>
            </div>

            <!-- Buttons -->
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-danger me-2" @click="cancel">Hủy</button>
                <button type="submit" class="btn btn-primary" :disabled="errorTitle || !blog.content || !blog.user_id">Lưu</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            blog: {
                title: '',
                content: '',
                user_id: '',
                thumbnail: null
            },
            errorTitle: '',
        };
    },
    computed: {
        idEncode() {
            return this.$route.params.idEncode;
        },
    },
    methods: {
        validateTitle() {
            const regex = /^(?!\s)(?!.*\s{2,})[a-zA-ZÀ-ỹà-ỹ0-9\s_-]{1,255}$/;
            if (!regex.test(this.blog.title)) {
                this.errorTitle = 'Tiêu đề không được chứa ký tự đặc biệt và không quá 255 ký tự và không được bỏ trống!!!';
            } else {
                this.errorTitle = '';
            }
        },
        cancel() {
            this.$router.push({ name: 'list-blogs' }); // Đường dẫn đến danh sách blog
        },
        async fetchBlog() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/blogs/${this.idEncode}`);
                this.blog = response.data;
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy thông tin blog:", error);
            }
        },
        async updateBlog() {
            try {
                const formData = new FormData();
                formData.append('title', this.blog.title);
                formData.append('content', this.blog.content);
                formData.append('user_id', this.blog.user_id);
                if (this.blog.thumbnail) {
                    formData.append('thumbnail', this.blog.thumbnail);
                }

                const response = await axios.post('http://127.0.0.1:8000/api/update-blog', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 200) {
                    alert("Sửa blog thành công!!!");
                    this.$router.push({ name: 'list-blogs' }); // Đường dẫn đến danh sách blog
                }
            } catch (error) {
                console.error("Có lỗi xảy ra khi cập nhật blog:", error);
            }
        },
        handleFileUpload(event) {
            this.blog.thumbnail = event.target.files[0];
        }
    },
    created() {
        this.fetchBlog(); // Gọi phương thức để lấy thông tin blog khi component được khởi tạo
    },
};
</script>
