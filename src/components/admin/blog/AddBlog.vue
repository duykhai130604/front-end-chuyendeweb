<template>
    <div>
        <div class="page-header">
            <h3 class="fw-bold mb-3">Thêm Blog Mới</h3>
        </div>
        <form @submit.prevent="addBlog">
            <div class="mb-3">
                <label for="title" class="form-label">Tiêu đề Blog</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="title"
                    placeholder="Nhập tiêu đề blog"
                    @input="validateTitle"
                    required
                />
                <div v-if="errorTitle" class="text-danger">{{ errorTitle }}</div>
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Nội dung</label>
                <textarea
                    class="form-control"
                    id="content"
                    v-model="content"
                    rows="6"
                    placeholder="Nhập nội dung blog"
                    required
                ></textarea>
            </div>
            <div class="mb-3">
                <label for="thumbnail" class="form-label">Hình thu nhỏ</label>
                <input
                    type="file"
                    class="form-control"
                    id="thumbnail"
                    @change="handleFileUpload"
                    accept="image/*"
                    required
                />
            </div>
            <div class="mb-3">
                <label for="author" class="form-label">Tác giả</label>
                <input
                    type="text"
                    class="form-control"
                    id="author"
                    v-model="author"
                    placeholder="Nhập tên tác giả"
                    required
                />
            </div>
            <div class="mb-3">
                <label for="status" class="form-label">Trạng thái</label>
                <select class="form-select" id="status" v-model="status" required>
                    <option :value="1">Công khai</option>
                    <option :value="0">Nháp</option>
                </select>
            </div>

            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-danger me-2" @click="cancel">Hủy</button>
                <button type="submit" class="btn btn-primary" :disabled="errorTitle || !content || !author">Thêm</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            title: '',
            content: '',
            author: '',
            status: 1, // 1: Công khai, 0: Nháp
            errorTitle: '',
            thumbnail: null
        };
    },
    methods: {
        validateTitle() {
            const regex = /^(?!\s)(?!.*\s{2,})[a-zA-ZÀ-ỹà-ỹ0-9\s_-]{1,255}$/;
            if (!regex.test(this.title)) {
                this.errorTitle = 'Tiêu đề không được chứa ký tự đặc biệt và không quá 255 ký tự và không được bỏ trống!!!';
            } else {
                this.errorTitle = '';
            }
        },
        cancel() {
            this.$router.push({ name: 'list-blogs' }); // Đường dẫn đến danh sách blog
        },
        async addBlog() {
            try {
                if (!this.errorTitle && this.title && this.content && this.author) {
                    const formData = new FormData();
                    formData.append('title', this.title);
                    formData.append('content', this.content);
                    formData.append('thumbnail', this.thumbnail);
                    formData.append('author', this.author);
                    formData.append('status', this.status);
                    
                    const response = await axios.post('http://127.0.0.1:8000/api/add-blog', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if (response) {
                        alert("Blog đã được thêm thành công!");
                        this.$router.push({ name: 'list-blogs' }); // Đường dẫn đến danh sách blog
                    }
                }
            } catch (error) {
                console.error("Có lỗi xảy ra khi thêm blog mới:", error);
            }
        },
        handleFileUpload(event) {
            this.thumbnail = event.target.files[0];
        }
    }
};
</script>
