<template>
    <div>
        <section class="bg0 p-t-62 p-b-60">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-lg-9 p-b-80">
                        <div class="p-r-45 p-r-0-lg">
                            <!-- item blog -->
                            <div v-for="blog in filteredBlogs" :key="blog.id" class="p-b-63 blog-item">
                                <!-- Hình ảnh blog -->
                                <a href="blog-detail.html" class="hov-img0 how-pos5-parent">
                                    <img :src="blog.thumbnail" class="img" alt="IMG-BLOG">
                                    <div class="flex-col-c-m size-123 bg9 how-pos5">
                                        <!-- Ngày tạo blog -->
                                        <span class="ltext-107 cl2 txt-center">
                                            {{ getDay(blog.created_at) }}
                                        </span>
                                        <span class="stext-109 cl3 txt-center">
                                            {{ getMonthYear(blog.created_at) }}
                                        </span>
                                    </div>
                                </a>

                                <!-- Tiêu đề và nội dung blog -->
                                <div class="p-t-32">
                                    <h4 class="p-b-15">
                                        <a href="blog-detail.html" class="fs-40 cl2 hov-cl1 trans-04">
                                            {{ blog.title }}
                                        </a>
                                    </h4>
                                    <!-- Thông tin thêm và liên kết -->
                                    <div class="flex-w flex-sb-m p-t-18">
                                        <span class="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10">
                                            <span>
                                                <span class="cl4">By</span> Admin
                                                <span class="cl12 m-l-4 m-r-6">|</span>
                                            </span>
                                            <span>
                                                StreetStyle, Fashion, Couple
                                                <span class="cl12 m-l-4 m-r-6">|</span>
                                            </span>
                                            <span>
                                                8 Comments
                                            </span>
                                            <span class="cl12 m-l-4 m-r-6">|</span>
                                            <span>
                                                Đăng vào {{ formatDate(blog.created_at) }}
                                            </span>
                                        </span>
                                        <a href="blog-detail.html"
                                            class="readmore stext-101 cl2 hov-cl1 trans-04 m-tb-10">
                                            Continue Reading
                                            <i class="fa fa-long-arrow-right m-l-9"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <!-- Pagination -->
                            <div class="flex-l-m flex-w w-full p-t-10 m-lr--7">
                                <!-- Nút trang trước -->
                                <a v-if="currentPage > 1" href="#" class="flex-c-m how-pagination1 trans-04 m-all-7"
                                    @click.prevent="changePage(currentPage - 1)">
                                    «
                                </a>

                                <!-- Các nút phân trang -->
                                <a v-for="page in totalPages" :key="page" href="#"
                                    class="flex-c-m how-pagination1 trans-04 m-all-7"
                                    :class="{ 'active-pagination1': currentPage === page }"
                                    @click.prevent="changePage(page)">
                                    {{ page }}
                                </a>

                                <!-- Nút trang tiếp theo -->
                                <a v-if="currentPage < totalPages" href="#"
                                    class="flex-c-m how-pagination1 trans-04 m-all-7"
                                    @click.prevent="changePage(currentPage + 1)">
                                    »
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-3 p-b-80">
                        <div class="side-menu">
                            <div class="bor17 of-hidden pos-relative">
                                <input class="stext-103 cl2 plh4 size-116 p-l-28 p-r-55" type="text" name="search"
                                    placeholder="Search">

                                <button class="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04">
                                    <i class="zmdi zmdi-search"></i>
                                </button>
                            </div>

                            <div class="p-t-55">
                                <h4 class="authors p-b-33">
                                    Các tác giả nổi bật
                                </h4>
                                <ul>
                                    <div @click="fetchBlogs()"
                                           :active="txt-color" :class="{'text-color': selectedAuthorId === null, 'dis-block': true}">
                                          <h3> Tất cả</h3>
                                           
                                        </div>
                                    <li class="bor18" v-for="author in authors" :key="author.id">
                                        <div @click="getBlogsByAuthor(author.id)"
                                           :active="txt-color" :class="{'text-color': selectedAuthorId === author.id, 'dis-block': true, 'stext-115': true, 'cl6': true, 'hov-cl1': true, 'trans-04': true, 'p-tb-8': true, 'p-lr-4': true}">
                                           >
                                            {{ author.name }} ({{ author.blog_count }})
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="p-t-65">
                                <h4 class="mtext-112 cl2 p-b-33">
                                    Featured Products
                                </h4>

                                <ul>
                                    <li class="flex-w flex-t p-b-30">
                                        <a href="#" class="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                                            <img src="images/product-min-01.jpg" alt="PRODUCT">
                                        </a>

                                        <div class="size-215 flex-col-t p-t-8">
                                            <a href="#" class="stext-116 cl8 hov-cl1 trans-04">
                                                White Shirt With Pleat Detail Back
                                            </a>

                                            <span class="stext-116 cl6 p-t-20">
                                                $19.00
                                            </span>
                                        </div>
                                    </li>

                                    <li class="flex-w flex-t p-b-30">
                                        <a href="#" class="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                                            <img src="images/product-min-02.jpg" alt="PRODUCT">
                                        </a>

                                        <div class="size-215 flex-col-t p-t-8">
                                            <a href="#" class="stext-116 cl8 hov-cl1 trans-04">
                                                Converse All Star Hi Black Canvas
                                            </a>

                                            <span class="stext-116 cl6 p-t-20">
                                                $39.00
                                            </span>
                                        </div>
                                    </li>

                                    <li class="flex-w flex-t p-b-30">
                                        <a href="#" class="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                                            <img src="images/product-min-03.jpg" alt="PRODUCT">
                                        </a>

                                        <div class="size-215 flex-col-t p-t-8">
                                            <a href="#" class="stext-116 cl8 hov-cl1 trans-04">
                                                Nixon Porter Leather Watch In Tan
                                            </a>

                                            <span class="stext-116 cl6 p-t-20">
                                                $17.00
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="p-t-55">
                                <h4 class="mtext-112 cl2 p-b-20">
                                    Archive
                                </h4>

                                <ul>
                                    <li class="p-b-7">
                                        <a href="#" class="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                            <span>
                                                July 2018
                                            </span>

                                            <span>
                                                (9)
                                            </span>
                                        </a>
                                    </li>

                                    <li class="p-b-7">
                                        <a href="#" class="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                            <span>
                                                June 2018
                                            </span>

                                            <span>
                                                (39)
                                            </span>
                                        </a>
                                    </li>

                                    <li class="p-b-7">
                                        <a href="#" class="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                            <span>
                                                May 2018
                                            </span>

                                            <span>
                                                (29)
                                            </span>
                                        </a>
                                    </li>

                                    <li class="p-b-7">
                                        <a href="#" class="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                            <span>
                                                April 2018
                                            </span>

                                            <span>
                                                (35)
                                            </span>
                                        </a>
                                    </li>

                                    <li class="p-b-7">
                                        <a href="#" class="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                            <span>
                                                March 2018
                                            </span>

                                            <span>
                                                (22)
                                            </span>
                                        </a>
                                    </li>

                                    <li class="p-b-7">
                                        <a href="#" class="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                            <span>
                                                February 2018
                                            </span>

                                            <span>
                                                (32)
                                            </span>
                                        </a>
                                    </li>

                                    <li class="p-b-7">
                                        <a href="#" class="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                            <span>
                                                January 2018
                                            </span>

                                            <span>
                                                (21)
                                            </span>
                                        </a>
                                    </li>

                                    <li class="p-b-7">
                                        <a href="#" class="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                            <span>
                                                December 2017
                                            </span>

                                            <span>
                                                (26)
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="p-t-50">
                                <h4 class="mtext-112 cl2 p-b-27">
                                    Tags
                                </h4>

                                <div class="flex-w m-r--5">
                                    <a href="#"
                                        class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                        Fashion
                                    </a>

                                    <a href="#"
                                        class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                        Lifestyle
                                    </a>

                                    <a href="#"
                                        class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                        Denim
                                    </a>

                                    <a href="#"
                                        class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                        Streetstyle
                                    </a>

                                    <a href="#"
                                        class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                        Crafts
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
export default {
    data() {
        return {
            blogs: [],
            currentPage: 1,
            totalPages: 0,
            authors: [],
            selectedAuthorId: null,

        };
    },
    computed: {
        filteredBlogs() {
            return this.blogs.filter(blog => blog.status === 1);
        }
    },
    methods: {
        async fetchBlogs(page = 1) {
            try {
                this.selectedAuthorId=null;
                const response = await axios.get(API_BASE_URL + '/user-blogs?page=' + page);
                this.blogs = response.data.data.filter(blog => blog.status === 1);
                this.totalPages = response.data.last_page;
                this.currentPage = response.data.current_page;
            } catch (error) {
                console.error('Lỗi khi lấy blogs:', error);
            }
        },
        async fetchAuthors() {
            try {
                const response = await axios.get(API_BASE_URL + '/authors-count-blog');

                this.authors = response.data;

            } catch (error) {
                console.error('Lỗi khi lấy blogs:', error);
            }
        },
        getDay(createdAt) {
            const date = new Date(createdAt);
            return date.getDate();
        },
        getMonthYear(createdAt) {
            const date = new Date(createdAt);
            const options = { month: 'short', year: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        },
        changePage(page) {
            if (page !== this.currentPage) {
                this.fetchBlogs(page);
            }
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
        async getBlogsByAuthor(id) {
            try {
                this.selectedAuthorId = id;
                const encryptResponse = await axios.get(`${API_BASE_URL}/encrypt/${id}`);
                const idCrypt = encryptResponse.data.encrypted_id;
                const response = await axios.get(API_BASE_URL + '/get-blog-by-author/'+idCrypt);
                this.blogs = response.data.data.filter(blog => blog.status === 1);
                this.totalPages = response.data.last_page;
                this.currentPage = response.data.current_page;                
            } catch (error) {
                console.error('Lỗi khi lấy blogs:', error);
            }
        }

    },
    mounted() {
        this.fetchBlogs();
        this.fetchAuthors();
    },
};
</script>
<style scoped>
.img {
    width: 70%;
}

.blog-item {
    margin: 20px 0;
    border-bottom: 1px solid black;
    position: relative;
}

.readmore {
    position: absolute;
    left: 0;
    bottom: 0;
}

.authors {
    color: black;
    font-weight: bold;
}
.text-color{
    color: aqua;
}
</style>