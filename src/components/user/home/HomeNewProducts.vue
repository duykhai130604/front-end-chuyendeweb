<template>
  <!-- Product -->
  <section class="bg0 p-t-23 p-b-140">
    <div class="container">
      <div class="p-b-10">
        <h3 class="ltext-103 cl5">New Products</h3>
      </div>

      <div class="row isotope-grid">
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
              <router-link
                :to="{ path: '/product/ProductDetail', query: { id: product.id } }"
                class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
              >
                {{ product.name || 'N/A' }}
              </router-link>
            <div class="block2-txt flex-w flex-t p-t-14">
              <div class="block2-txt-child1 flex-col-l">
                <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                  {{ product.name || 'N/A' }}
                </a>
                <span class="stext-105 cl3">
                  {{ product.price ? product.price.toFixed(2) : '0.00' }}VND
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
      <!-- Load more -->
      <div class="flex-c-m flex-w w-full p-t-45">
        <a href="#" class="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
          Load More
        </a>
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
    };
  },
  async created() {
    await this.fetchNewProducts();
  },
  methods: {
    async fetchNewProducts() {
      try {
        const response = await axios.get(API_BASE_URL + '/products/top');
        this.products = response.data;
        console.log('Danh sách sản phẩm:', this.products);
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
      }
    },
    async goToProductDetail(id) {
      const encryptResponse = await axios.get(`${API_BASE_URL}/encrypt/${id}`);
      this.$router.push({ name: 'product', params: { id: encryptResponse.data.encrypted_id } });
    },
  }
};
</script>