<template>
  <!-- Product -->
  <section class="bg0 p-t-23 p-b-140">
    <div class="container">
      <div class="p-b-10">
        <h3 class="ltext-103 cl5">New Products</h3>
      </div>

      <!-- Loading Spinner -->
      <div v-if="loading" class="loading-spinner">
         <div class="spinner"></div> 
      </div>
      <div class="row isotope-grid" v-if="!loading">
        <div v-for="(product, index) in products" :key="index"
          class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
          <!-- Block2 -->
          <div class="block2">
            <div class="block2-pic hov-img0" @click="goToProductDetail(product.id)">
              <img
                :src="product.thumbnail || 'https://res.cloudinary.com/dkfedhd63/image/upload/f_auto,q_auto/hnheswi26rfspgkmkrqe'"
                alt="IMG-PRODUCT" />

              <a href="#"
                class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                Quick View
              </a>
            </div>

            <div class="block2-txt flex-w flex-t p-t-14">
              <div class="block2-txt-child1 flex-col-l">
                <span @click="goToProductDetail(product.id)" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                  {{ product.name || 'N/A' }}
                </span>
                <div v-if="product.ratings_count !== 0" class="stars">
                  {{ avgRating(product.ratings_avg_rating) ?? '0' }}
                  <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= product.ratings_avg_rating }">
                    ★
                  </span>({{ product.ratings_count }})
                </div>
                <div class="block2-txt flex-w flex-t p-t-14">
                  <div class="block2-txt-child1 flex-col-l">
                    <span class="stext-105 cl3">
                      {{ product.price ? product.price.toFixed(2) : '0.00' }} VND
                    </span>
                  </div>

                  <div class="block2-txt-child2 flex-r p-t-3">
                    <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                      <img class="icon-heart1 dis-block trans-04" src="../../../assets/images/icons/icon-heart-01.png"
                        alt="ICON" />
                      <img class="icon-heart2 dis-block trans-04 ab-t-l"
                        src="../../../assets/images/icons/icon-heart-02.png" alt="ICON" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More button -->
        <div v-if="showLoadMore" class="flex-c-m flex-w w-full p-t-45">
          <a href="#" class="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
            @click.prevent="loadMore">
            Load More
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/config';

export default {
  data() {
    return {
      products: [],
      currentPage: 1,
      showLoadMore: true,
      loading: false,  // Biến để theo dõi trạng thái loading
    };
  },
  async created() {
    await this.fetchNewProducts();
  },
  methods: {
    // Lấy sản phẩm từ API với phân trang
    async fetchNewProducts() {
      this.loading = true;  // Bắt đầu loading
      try {
        const response = await axios.get(`${API_BASE_URL}/products/top`, {
          params: {
            page: this.currentPage
          }
        });

        if (response.data.data.length === 0) {
          this.showLoadMore = false;
        } else {
          this.products = [...this.products, ...response.data.data];
          this.currentPage++;
        }
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
      } finally {
        this.loading = false;  // Kết thúc loading
      }
    },

    // Hàm load thêm sản phẩm khi nhấn "Load More"
    async loadMore() {
      await this.fetchNewProducts();
    },

    // Chuyển đến trang chi tiết sản phẩm
    async goToProductDetail(id) {
      const encryptResponse = await axios.get(`${API_BASE_URL}/encrypt/${id}`);
      this.$router.push({ name: 'product', params: { id: encryptResponse.data.encrypted_id } });
    },

    // Tính toán rating trung bình
    avgRating(rating) {
      return rating ? parseFloat(rating).toFixed(1) : 0;
    },
  }
};
</script>
<style scoped>
.loading-spinner {
  text-align: center;
  font-size: 20px;
  color: #555;
}
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
