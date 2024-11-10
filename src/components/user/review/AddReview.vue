<template>
    <div class="rating">
        <h2>Đánh giá sản phẩm</h2>
        <div class="stars">
            <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= selectedRating }"
                @click="selectRating(n)">
                ★
            </span>
        </div>

        <div>
            <textarea v-model="reviewText" placeholder="Nhập nội dung đánh giá..." rows="4" cols="50"></textarea>
        </div>

        <div>
            <button @click="submitReview">Gửi đánh giá</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
export default {
    data() {
        return {
            selectedRating: 0,
            reviewText: '',
            submitted: false,
            productId: null,
            variantId: null,
            order: null,
        };
    },
    methods: {
        selectRating(rating) {
            this.selectedRating = rating;
        },
        submitReview() {
            if (this.selectedRating === 0 || this.reviewText.trim() === '') {
                alert("Vui lòng chọn số sao và nhập nội dung đánh giá.");
                return;
            }
            const reviewData = {
                rating: this.selectedRating,
                content: this.reviewText,
                product_id: this.productId,
                variant: this.variantId,
                order: this.order,
            };
            axios.post(API_BASE_URL + '/add-review', reviewData, {
                withCredentials: true
            })
                .then(response => {
                    console.log('Review submitted', response);
                    alert("Đánh giá thành công!");
                    this.submitted = true;
                    this.$router.push('/history'); 

                })
                .catch(error => {
                    console.error('Error submitting review', error);
                });
            this.submitted = true;
        },
        updateParams() {
            this.productId = this.$route.params.id;
            this.variantId = this.$route.params.variant;
            this.order = this.$route.params.order;
        },

    },
    watch: {
        '$route.params': 'updateParams'
    },
    created() {
        this.updateParams();
    },
};
</script>

<style scoped>
.rating {
    margin: 90px auto;
    max-width: 1080px;
}

.stars {
    font-size: 30px;
    color: #ccc;
}

.star.filled {
    color: #ff9800;
    cursor: pointer;
}

textarea {
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

p {
    font-size: 16px;
    color: #333;
}

div {
    margin-bottom: 20px;
}
</style>