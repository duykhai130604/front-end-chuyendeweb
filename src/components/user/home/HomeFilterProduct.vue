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
            <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                <!-- Block2 -->
                <div class="block2">
                    <div class="block2-pic hov-img0">
                        <img src="../../../assets/images/product-01.jpg" alt="IMG-PRODUCT" />

                        <a href="#"
                            class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                            Quick View
                        </a>
                    </div>
                    <div class="block2-txt flex-w flex-t p-t-14">
                        <div class="block2-txt-child1 flex-col-l">
                            <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                Esprit Ruffle Shirt
                            </a>

                            <span class="stext-105 cl3"> $16.64 </span>
                        </div>
                        <div class="block2-txt-child2 flex-r p-t-3">
                            <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                <img class="icon-heart1 dis-block trans-04"
                                    src="../../../assets/images/icons/icon-heart-01.png" alt="ICON" />
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
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faStar);
export default {
    components: { FontAwesomeIcon },
    data() {
        return {
            showFilters: false,
            selectedRating: 0,
        };
    },
    methods: {
        toggleFilters() {
            this.showFilters = !this.showFilters;
        },
        selectRating(star) {
            this.selectedRating = star;
            console.log(`Rating selected: ${this.selectedRating} stars`);
        },
    },
};
</script>
<style>
.filter {
    overflow: hidden;
    padding-right: 28px;
    padding-bottom:8px ;
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