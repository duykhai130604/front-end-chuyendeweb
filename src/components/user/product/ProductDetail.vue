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
                                <div class="item-slick3" v-for="image in product.images" :key="image"
                                    :data-thumb="image">
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
                        <span class="mtext-106 cl2">{{ product.price ? `$${product.price.toFixed(2)}` : 'N/A' }}</span>
                        <p class="stext-102 cl3 p-t-23"></p>
                        <!-- Product options like size and color, and add to cart button -->
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
                        <div v-if="activeTab === 'description'" class="tab-pane active">
                            <div class="how-pos2 p-lr-15-md">
                                <p id="product-description" v-html="product.desc"></p>
                            </div>
                        </div>
                        <div v-if="activeTab === 'information'" class="tab-pane">
                            <p>Additional information content here.</p>
                        </div>
                        <div v-if="activeTab === 'reviews'" class="tab-pane">
                            <p>Reviews content here.</p>
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

export default {
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
        };
    },
    methods: {
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
                console.log(response.data);

            } catch (error) {
                console.error('Error fetching product:', error);
            }
        },
        setActiveTab(tabId) {
            this.activeTab = tabId;
        }

    },
    created() {
        this.fetchProductDetails();
    }
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
</style>
