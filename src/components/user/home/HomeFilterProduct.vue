<template>
    <div class="container my-5">
        <div class="p-b-10">
            <h3 class="ltext-103 cl5">Product Overview</h3>
        </div>
        <div class="filter-container my-3">
            <button class="btn btn-custom" @click="toggleFilters">
                <font-awesome-icon icon="filter" /> {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
            </button>
            <div class="filter">
                <div v-if="showFilters" class="filter-content">
                    <button class="filter-option" data-filter="all">All Products</button>
                    <button class="filter-option" data-filter="women">Women</button>
                    <button class="filter-option" data-filter="men">Men</button>
                    <button class="filter-option" data-filter="bag">Bag</button>
                    <button class="filter-option" data-filter="shoes">Shoes</button>
                    <button class="filter-option" data-filter="watches">Watches</button>
                    <div class="sort-container">
                        <label class="star-label">Select Star Rating:</label>
                        <div class="star-rating">
                            <span v-for="star in 5" :key="star" :class="['star', { selected: star <= selectedRating }]"
                                @click="selectRating(star)">
                                <font-awesome-icon icon="star" />
                            </span>
                        </div>
                        <p class="selected-rating">
                            Selected Rating: {{ selectedRating }} Star{{ selectedRating > 1 ? 's' : '' }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row isotope-grid">
            <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" v-for="product in products"
                v-bind:key="product.id">
                <div class="block2">
                    <div class="block2-pic hov-img0">
                        <img :src="product.thumbnail" alt="IMG-PRODUCT" />
                        <div @click=" goToProductDetail(product.id)"
                            class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                            Quick View
                        </div>
                    </div>

                    <div class="block2-txt flex-w flex-t p-t-14">
                        <div class="block2-txt-child1 flex-col-l">
                            <a href="#" @click.prevent="goToProductDetail(product.id)"
                                class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                {{ product.name }}
                            </a>
                            <div v-if="product.ratings_count !== 0" class="stars">
                                {{ avgRating(product.ratings_avg_rating) ?? '0' }} <span v-for="n in 5" :key="n"
                                    class="star" :class="{ 'filled': n <= product.ratings_avg_rating }">
                                    ★
                                </span>({{ product.ratings_count
                                }})
                            </div>
                            <span class="stext-105 cl3"> {{ product.price }} VND </span>
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
            <div class="pagination">
                <button @click="changePage(page)" v-for="page in pages" :key="page" :disabled="page === currentPage">
                    {{ page }}
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
library.add(faStar);
export default {
  components: { FontAwesomeIcon },
  data() {
    return {
      showFilters: false,
      selectedRating: 0,
      products: [],
      currentPage: 1,
      lastPage: 1,
    };
  },
  computed: {
    pages() {
      let pages = [];
      for (let i = 1; i <= this.lastPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    avgRating(rating) {
      return rating ? parseFloat(rating).toFixed(1) : 0;
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    async selectRating(star) {
      this.selectedRating = star;
      this.currentPage = 1; 

      try {
        const response = await axios.get(`${API_BASE_URL}/get-product-rating-range/${star}?page=${this.currentPage}`);
        this.products = response.data.data;
        this.lastPage = response.data.last_page; 
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products by rating:', error);
      }
    },
    async changePage(page) {
      this.currentPage = page;
      try {
        const response = await axios.get(`${API_BASE_URL}/get-product-rating-range/${this.selectedRating}?page=${this.currentPage}`);
        this.products = response.data.data;
      } catch (error) {
        console.error('Error fetching products for page ' + page, error);
      }
    },
  },
  created() {
    this.selectRating(this.selectedRating);
  },
};

</script>
<style>
.pagination button {
  margin: 5px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: 1px solid #b3b3b3;
  border-radius: 50%;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.star {
    color: #ddd;
}

.star.filled {
    color: #ffcc00;
}

.filter {
    overflow: hidden;
    padding-right: 28px;
    padding-bottom: 8px;
}

.filter-content {
    margin: 20px 0;
    background-color: #f2f2f2;
    padding: 50px 20px;
    border-radius: 10px;
    animation: moveOn .5s ease-in-out forwards;
    box-shadow: 15px 15px 15px #ddd;
}

.filter-option {
    display: inline-block;
    margin: 10px;
    padding: 10px 15px;
    background-color: #ffffff;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    transition: all .3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.filter-option:hover {
    background-color: #ddd;
    color: #333;
}

.filter-option:active {
    border: 5px solid #ffffff;
    border-radius: 5px;
    margin: 0;
}

.btn-custom {
    background: #ffffff;
    border: 1px solid #ddd;
}

@keyframes moveOn {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(0);
    }
}

.sort-container {
    margin: 20px 0;
}

.star-label {
    font-weight: bold;
    margin-right: 10px;
}

.star-rating {
    display: flex;
    align-items: center;
}

.star {
    font-size: 24px;
    color: #ccc;
    cursor: pointer;
    transition: color 0.2s;
}

.star.selected {
    color: #f39c12;
}

.selected-rating {
    margin-top: 10px;
    font-style: italic;
}
</style>