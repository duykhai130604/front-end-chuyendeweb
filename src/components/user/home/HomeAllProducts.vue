<template>
  <!-- Product -->
  <section class="bg0 p-t-23 p-b-140">
    <div class="container">
      <div class="isotope-grid">
        <div class="p-b-10" v-if="topProducts.length != 0">
          <h3 style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-weight: bold; margin: 30px 0;" class="cl5">
            Dành cho bạn</h3>
          <!-- Block2 -->
          <div class="row">
            <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" v-for="topProduct in topProducts"
              v-bind:key="topProduct.id">
              <div class="block2">
                <div class="block2-pic hov-img0">
                  <img :src="topProduct.thumbnail" alt="IMG-PRODUCT" />
                  <div @click=" goToProductDetail(topProduct.id)"
                    class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                    Quick View
                  </div>
                </div>

                <div class="block2-txt flex-w flex-t p-t-14">
                  <div class="block2-txt-child1 flex-col-l">
                    <a href="#" @click.prevent="goToProductDetail(topProduct.id)"
                      class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                      {{ topProduct.name }}
                    </a>
                    <div v-if="topProduct.ratings_count !== 0" class="stars">
                      {{ avgRating(topProduct.ratings_avg_rating) ?? '0' }} <span v-for="n in 5" :key="n" class="star"
                        :class="{ 'filled': n <= topProduct.ratings_avg_rating }">
                        ★
                      </span>({{ topProduct.ratings_count
                      }})
                    </div>
                    <span class="stext-105 cl3"> {{ topProduct.price }} VND </span>
                  </div>
                </div>
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
          <!-- Load more -->
          <div id="app">
            <div v-for="product in products" :key="product.id" class="product-item">
              <!-- Hiển thị thông tin sản phẩm -->
              <p>{{ product.name }}</p>
            </div>
          </div>

          <div class="flex-c-m flex-w w-full p-t-45" v-if="hasMoreProducts">
            <button @click="loadMore" class="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
              Load More
            </button>
          </div>
          <div v-if="loading">Loading...</div>
        </div>

      </div>
      <div class="p-b-10 my-5" v-if="sps.length != 0">
        <h3 style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-weight: bold;" class="cl5">Có thể bạn sẽ cần
        </h3>
      </div>
      <div v-if="sps" class="row isotope-grid">
        <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" v-for="topProduct in sps"
          v-bind:key="topProduct.id">
          <div class="block2">
            <div class="block2-pic hov-img0">
              <img :src="topProduct.thumbnail" alt="IMG-PRODUCT" />
              <div @click=" goToProductDetail(topProduct.id)"
                class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                Quick View
              </div>
            </div>

            <div class="block2-txt flex-w flex-t p-t-14">
              <div class="block2-txt-child1 flex-col-l">
                <a href="#" @click.prevent="goToProductDetail(topProduct.id)"
                  class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                  {{ topProduct.name }}
                </a>
                <div v-if="topProduct.ratings_count !== 0" class="stars">
                  {{ avgRating(topProduct.ratings_avg_rating) ?? '0' }} <span v-for="n in 5" :key="n" class="star"
                    :class="{ 'filled': n <= topProduct.ratings_avg_rating }">
                    ★
                  </span>({{ topProduct.ratings_count
                  }})
                </div>
                <span class="stext-105 cl3"> {{ topProduct.price }} VND </span>
              </div>
            </div>
          </div>

          <div class="block2-txt-child2 flex-r p-t-3">
            <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
              <img class="icon-heart1 dis-block trans-04" src="../../../assets/images/icons/icon-heart-01.png"
                alt="ICON" />
              <img class="icon-heart2 dis-block trans-04 ab-t-l" src="../../../assets/images/icons/icon-heart-02.png"
                alt="ICON" />
            </a>
          </div>
        </div>
        <div class="flex-c-m flex-w w-full p-t-45" v-if="hasMoreSProducts && !loadingS">
          <button v-if="userAuth" @click="loadMoreS" class="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
            Load More
          </button>
        </div>
        <!-- Loading Indicator -->
        <div v-if="loading && userAuth">Loading...</div>
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
      topProducts: [],
      user: null,
      currentPage: 1,
      loading: false,
      loadingS: false,
      hasMoreProducts: true,
      hasMoreSProducts: true,
      sps: [],
      page: 1,
      userAuth: null,
    };
  },
  methods: {
    async fetchTopProducts() {
      try {
        const response = await axios.get(`${API_BASE_URL}/top-products`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        this.topProducts = response.data.data;
      } catch (error) {
        console.error('Error fetching top products:', error);
      }
    },
    avgRating(rating) {
      return rating ? parseFloat(rating).toFixed(1) : 0;
    },
    async fetchSProducts() {
      try {
        this.loadingS = true;
        const response = await axios.get(
          `${API_BASE_URL}/top-products-user-not`,
          {
            params: { page: this.page },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
            }
          }
        );

        const newProducts = response.data.data;
        if (newProducts.length < 4) {
          this.hasMoreSProducts = false;
        }

        this.sps = [...this.sps, ...newProducts];
      } catch (error) {
        console.error('Error fetching top products:', error);
      } finally {
        this.loadingS = false;
      }
    },
    async fetchProductsByUser() {
      try {
        const response = await axios.get(`${API_BASE_URL}/user-top-products?page=1`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        console.log('có user');
        this.topProducts = response.data.data;
      } catch (error) {
        console.error('Error fetching products by user:', error);
      }
    },
    async loadMore() {
      this.loading = true;
      try {
        let response;

        if (this.userAuth) {
          response = await axios.get(`${API_BASE_URL}/user-top-products?page=${this.currentPage + 1}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          });
        } else {
          response = await axios.get(`${API_BASE_URL}/top-products?page=${this.currentPage + 1}`);
        }

        if (response.data.data.length > 0) {
          const existingProductIds = new Set(this.topProducts.map(product => product.id));
          response.data.data.forEach(product => {
            if (!existingProductIds.has(product.id)) {
              this.topProducts.push(product);
            }
          });

          this.currentPage++;
        } else {
          this.hasMoreProducts = false;
        }
      } catch (error) {
        console.error('Error loading more products:', error);
      } finally {
        this.loading = false;
      }
    },
    async goToProductDetail(id) {
      const encryptResponse = await axios.get(`${API_BASE_URL}/encrypt/${id}`);
      this.$router.push({ name: 'product', params: { id: encryptResponse.data.encrypted_id } });
    },
    checkUser() {
      this.userAuth = localStorage.getItem('authToken');
      if (this.userAuth) {
        this.fetchProductsByUser();
        this.fetchSProducts();
      } else {
        this.fetchTopProducts();
      }
    },
    loadMoreS() {
      this.page += 1;
      this.fetchSProducts();
    }
  },
  created() {
    this.checkUser();
  },
  watch: {
    userAuth(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkUser();
      }
    }
  }
};

</script>
<style scoped>
.star {
  color: #ddd;
}

.star.filled {
  color: #ffcc00;
}
</style>