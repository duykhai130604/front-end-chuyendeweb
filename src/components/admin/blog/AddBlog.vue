<template>
    <div>
        <div class="page-header">
            <h3 class="fw-bold mb-3">Thêm Blog Mới</h3>
        </div>
        <form @submit.prevent="addBlog">
            <!-- Tiêu đề Blog -->
            <div class="mb-3">
                <label for="title" class="form-label">Tiêu đề Blog</label>
                <input type="text" class="form-control" id="title" v-model="title" placeholder="Nhập tiêu đề blog"
                    @input="validateInput" />
                <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
            </div>
            <!-- Nội dung -->
            <div class="mb-3">
                <label for="content" class="form-label">Nội dung</label>
                <div style="height: auto;">
                    <ckeditor  rows="6"  class="form-control" required id="content"  placeholder="Nhập nội dung blog" :editor="editor" v-model="content" @ready="onReady" />
                </div>
            </div>
            <!-- Hình thu nhỏ -->
            <div class="mb-3">
                <label for="thumbnail" class="form-label">Hình ảnh</label>
                <input type="file" class="form-control" id="thumbnail" @change="handleFileUpload" accept="image/*" />
            </div>
            <div class="mb-3">
                <label for="status" class="form-label">Trạng thái</label>
                <select class="form-select" id="status" v-model="status" required>
                    <option :value="1">Công khai</option>
                    <option :value="0">Nháp</option>
                </select>
            </div>
            <!-- Buttons -->
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-danger me-2" @click="cancel">Hủy</button>
                <button type="submit" class="btn btn-primary"
                    :disabled="errorMessage || !title || !content || !user_id">
                    Thêm
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    data() {
        return {
            title: '',
            content: '',
            user_id: 1,
            errorMessage: '',
            thumbnail: null,
            editor: ClassicEditor,
            status:0

        };
    },
    methods: {
        validateInput() {
            const regex = /^[\p{L}\p{N}\s_-]{1,255}$/u;
            if (!regex.test(this.title)) {
                this.errorMessage = 'Tiêu đề không được chứa ký tự đặc biệt và không quá 255 ký tự!';
            } else {
                this.errorMessage = '';
            }

        },
        cancel() {
            this.$router.push({ name: 'list-blogs' });
        },
        async addBlog() {
            try {
                if (!this.errorMessage && this.title && this.content && this.user_id) {
                    const formData = new FormData();
                    formData.append('title', this.title);
                    formData.append('content', this.content);
                    formData.append('thumbnail', this.thumbnail);
                    formData.append('user_id', this.user_id);
                    formData.append('status', this.status);
                    const response = await axios.post('http://127.0.0.1:8000/api/add-blog', formData);
                    if (response) {
                        alert("Blog đã được thêm thành công!");
                        this.$router.push({ name: 'list-blogs' });
                    }
                }
            } catch (error) {
                console.error("Có lỗi xảy ra khi thêm blog mới:", error);
                alert("Đã xảy ra lỗi trong quá trình thêm blog. Vui lòng thử lại!");
            }
        },
        handleFileUpload(event) {
            this.thumbnail = event.target.files[0];
        }
    }
};
</script>
