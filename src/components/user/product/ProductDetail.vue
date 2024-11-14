<template>
    <section class="sec-product-detail bg0 p-t-65 p-b-60">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-lg-7 p-b-30">
                    <div class="p-l-25 p-r-30 p-lr-0-lg">
                        <div class="wrap-slick3 flex-sb flex-w">
                            <div class="wrap-slick3-dots"></div>
                            <div class="wrap-slick3-arrows flex-sb-m flex-w"></div>
                            <div class="slick3 gallery-lb">
                                <div class="item-slick3" v-for="image in imgs" :key="image" :data-thumb="image">
                                    <div class="wrap-pic-w pos-relative">
                                        <img :src="image" alt="IMG-PRODUCT">
                                        <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                                            :href="image">
                                            <i class="fa fa-expand"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-5 p-b-30">
                    <div class="p-r-50 p-t-5 p-lr-0-lg">
                        <h4 class="mtext-105 cl2 js-name-detail p-b-14">{{ product.name || 'N/A' }}</h4>
                        <div v-if="rating">
                            <div class="stars">
                                <span v-for="n in 5" :key="n" class="star"
                                    :class="{ 'filled': n <= rating.avg_rating }">
                                    ★
                                </span>
                            </div>
                            <p><strong>Điểm trung bình:</strong> {{ avgRating(rating.avg_rating) }} / 5</p>
                            <p><strong>Số lượng đánh giá:</strong> {{ rating.review_count }}</p>
                        </div>
                        <div v-else>
                            <p>Đang tải thông tin đánh giá...</p>
                        </div>
                        <span class="mtext-106 cl2" :class="{ 'old-price': product.discount > 0 }">{{ product.price ?
                            `${product.price.toFixed(2)}` : 'N/A'
                            }}VND</span>
                        <div class="discount" v-if="product.discount > 0"> <span>-{{ product.discount }}%</span></div>
                        <p class="mtext-105 cl2 p-t-23">{{ primaryPrice }} VND</p>
                        <div id="product-options">
                            <!-- Chọn màu sắc -->
                            <div>
                                <label for="color">Chọn màu sắc:</label>
                                <div id="color-options">
                                    <button v-for="color in colors" :key="color" class="color-button"
                                        :class="{ selected: selectedColor === color }" @click="selectColor(color)"
                                        :style="{ background: color }">
                                    </button>
                                </div>
                            </div>
                            <!-- Chọn kích cỡ -->
                            <div>
                                <label for="size">Chọn kích cỡ:</label>
                                <div id="size-options">
                                    <button v-for="size in sizes" :key="size" class="size-button"
                                        :class="{ selected: selectedSize === size }" @click="selectSize(size)">
                                        {{ size }}
                                    </button>
                                </div>
                            </div>
                            <div id="remaining-products">
                                <span>Số lượng: {{ quantity }}</span>

                            </div>

                        </div>
                        <ButtonComponent @click="handleAddToCart" label="Add to cart" />
                    </div>
                </div>
            </div>
            <div class="bor10 m-t-50 p-t-43 p-b-40">
                <div class="tab01">
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item p-b-10" v-for="(tab, index) in tabs" :key="index">
                            <a class="nav-link" :class="{ active: activeTab === tab.id }" href="#"
                                @click.prevent="setActiveTab(tab.id)">
                                {{ tab.name }}
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content p-t-43">
                        <div :class="['tab-pane', { active: activeTab === 'description' }]"
                            v-show="activeTab === 'description'">
                            <div class="how-pos2 p-lr-15-md">
                                <p id="product-description" v-html="product.desc"></p>
                            </div>
                        </div>
                        <div :class="['tab-pane', { active: activeTab === 'information' }]"
                            v-show="activeTab === 'information'">
                            <p>Additional information content here.</p>
                        </div>
                        <div :class="['tab-pane', { active: activeTab === 'reviews' }]"
                            v-show="activeTab === 'reviews'">
                            <h3 class="reviews-heading">User Reviews</h3>
                            <div @click="setForAllReviews" class="btn btn-primary my-3">
                                Tất cả đánh giá
                            </div>
                            <div style="margin-left: 70%;" class="stars">
                                <h5 style="color: black;">Lọc theo sao</h5>
                                <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= selectedRating }"
                                    @click="filterReviewsByRating(n)">
                                    ★
                                </span>
                            </div>
                            <div class="pagination">
                                <button class="mx-2" @click="changePage(currentPage - 1)"
                                    :disabled="currentPage === 1">Pre</button>
                                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                                <button class="mx-2" @click="changePage(currentPage + 1)"
                                    :disabled="currentPage === totalPages">Next</button>
                            </div>
                            <div v-if="filteredReviews.length > 0" class="review-list">
                                <div v-for="review in filteredReviews" :key="review.id" class="review-item">
                                    <div class="review-header">
                                        <strong class="reviewer-name">{{ review.user }} </strong>
                                        <span>size: {{ review.size }}<div class="color-button"
                                                :style="{ background: review.color }"></div></span>

                                        <span class="review-date">{{ formatDate(review.created_at) }}</span>
                                    </div>
                                    <div class="review-rating">
                                        <span v-for="n in 5" :key="n" class="star"
                                            :class="{ 'filled': n <= review.rating }">★</span>
                                    </div>
                                    <div class="review-body">
                                        <p class="review-text">{{ review.content }}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="no-reviews">
                                <p>No reviews available for this product.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import { useToast } from 'vue-toastification';

export default {
    components: { ButtonComponent },
    setup() {
        const toast = useToast();
        return { toast };
    },
    name: 'ProductPage',
    data() {
        return {
            activeTab: 'description',
            tabs: [
                { id: 'description', name: 'Description' },
                { id: 'information', name: 'Additional information' },
                { id: 'reviews', name: 'Reviews' }
            ],
            productId: null,
            product: {},
            similarProducts: [],
            sizes: [],
            colors: [],
            imgs: [],
            variants: [],
            selectedSize: null,
            selectedColor: null,
            quantity: null,
            primaryPrice: null,
            reviews: [],
            rating: [],
            selectedRating: 0,
            filteredReviews: [],
            currentPage: 1,
            totalPages: 1,
            paginatedReviews: [],
            variant: null,
        };
    },

    methods: {
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            this.fecthReviews();
        },
        setForAllReviews() {
            this.filteredReviews = this.reviews
        },
        filterReviewsByRating(rating) {
            this.selectedRating = rating;
            if (rating === 0) {
                this.filteredReviews = this.reviews;
            } else {
                this.filteredReviews = this.reviews.filter(
                    (review) => review.rating === rating
                );
            }
        },
        async fetchProductDetails() {
            this.productId = this.$route.params.id;
            try {
                const response = await axios.get(`${API_BASE_URL}/getProductbyID/${this.productId}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.product = response.data;
                if (response.data.discount != 0) {
                    this.primaryPrice = response.data.price - (response.data.price * response.data.discount) / 100;
                }
                const variants = await axios.get(`${API_BASE_URL}/product/variants/${this.productId}`);
                this.variants = variants.data;
                this.sizes = [...new Set(variants.data.map(variant => variant.size))];
                this.colors = [...new Set(variants.data.map(variant => variant.color))];
                this.imgs = variants.data.map(variant => variant.url);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        },
        fetchRating() {
            axios.get(`${API_BASE_URL}/product/${this.productId}/rating`)
                .then(response => {
                    this.rating = response.data;
                })
                .catch(error => {
                    console.error('Có lỗi khi tải thông tin đánh giá:', error);
                });
        },
        setActiveTab(tabId) {
            this.activeTab = tabId;
        },
        selectSize(size) {
            if (this.selectedSize === size) {
                this.selectedSize = null;
                console.log("Kích cỡ đã hủy chọn");
                this.quantity = null;
                this.variant = null;
            } else {
                this.selectedSize = size;
                console.log("Kích cỡ đã chọn:", this.selectedSize);
                this.updateQuantity();
            }
        },
        selectColor(color) {
            if (this.selectedColor === color) {
                this.selectedColor = null;
                console.log("Màu sắc đã hủy chọn");
                this.quantity = null;
                this.variant = null;
            } else {
                this.selectedColor = color;
                console.log("Màu sắc đã chọn:", this.selectedColor);
                this.updateQuantity();
            }
        },
        updateQuantity() {
            const selectedVariant = this.variants.find(variant =>
                variant.size === this.selectedSize && variant.color === this.selectedColor
            );
            this.quantity = selectedVariant ? selectedVariant.quantity : 'hết hàng';
            this.variant = selectedVariant ? selectedVariant.id : null;
            console.log('variant id', this.variant);
            console.log("Số lượng hiện tại:", this.quantity);
        },
        async fecthReviews() {
            try {
                const response = await axios.get(`${API_BASE_URL}/reviews/${this.productId}?page=${this.currentPage}`);
                this.reviews = response.data.data;
                this.filteredReviews = this.reviews;
                this.totalPages = response.data.last_page;
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            return date.toLocaleDateString('vi-VN', options);
        },
        avgRating(rating) {
            return rating ? parseFloat(rating).toFixed(1) : 0;
        },
        handleAddToCart() {
            if (this.variant == null) {
                this.toast.error("Please select size and color")
                return;
            }
            const config = {
                method: 'post',
                url: API_BASE_URL + '/addToCart',
                withCredentials: true,
                data: {
                    product_variant_id: this.variant,
                }
            };
            axios.request(config)
                .then((response) => {
                    // Kiểm tra phản hồi từ server
                    this.toast.success(response.data.message);
                })
                .catch((error) => {
                    const errorMessage = error.response && error.response.data ? error.response.data.message : 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
                    this.toast.error(errorMessage);
                    console.error(error);
                });
        }
    },
    created() {
        this.fetchProductDetails();
        this.fecthReviews();
        this.fetchRating();
    },
};



</script>

<style scoped>
/* Styles for the product details */
.bor10 {
    border-radius: 10px;
    background-color: #f9f9f9;
    padding: 40px;
    margin-top: 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-tabs {
    display: flex;
    border-bottom: 2px solid #ddd;
    margin-bottom: 20px;
}

.nav-item {
    margin-right: 15px;
}

.nav-link {
    display: inline-block;
    padding: 10px 20px;
    color: #333;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    background-color: transparent;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.nav-link:hover {
    background-color: #e0e0e0;
}

.nav-link.active {
    background-color: #333;
    color: #fff;
    border-color: #333;
}

.tab-content {
    padding-top: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
}

.tab-pane {
    display: none;
    padding: 20px;
}

.tab-pane.active {
    display: block;
}

.size-button {
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.size-button.selected {
    background-color: #007bff;
    color: #fff;
}

.color-button {
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: box-shadow 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);

}

.color-button.selected {
    color: #fff;
    border: 2px solid rgba(53, 242, 255, 0.5);
    border-radius: 5px;
    box-shadow: 0 0 10px rgb(2, 69, 239);
}

.old-price {
    text-decoration: line-through;
}

.discount {
    display: inline-flex;
    width: 50px;
    height: 50px;
    background-color: red;
    color: yellow;
    border-radius: 50%;
    margin: auto 0;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    margin: 0 15px;
}

.reviews-tab {
    padding: 16px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.reviews-heading {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
}

.review-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.review-item {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 16px;
}

.review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.reviewer-name {
    font-weight: bold;
    color: #333;
}

.review-date {
    font-size: 0.9rem;
    color: #888;
}

.review-rating {
    margin-bottom: 8px;
    font-size: 1.2rem;
}

.star {
    color: #ddd;
}

.star.filled {
    color: #ffcc00;
}

.review-body .review-text {
    color: #555;
    font-size: 1rem;
    line-height: 1.5;
}

.no-reviews {
    text-align: center;
    color: #777;
    font-size: 1rem;
    padding: 16px;
}

.stars {
    display: inline-block;
    font-size: 24px;
    color: #ccc;
}

.star {
    cursor: pointer;
    transition: color 0.3s;
}

.product-rating p {
    margin: 5px 0;
}

.product-rating h3 {
    font-size: 24px;
    font-weight: bold;
}
</style>
