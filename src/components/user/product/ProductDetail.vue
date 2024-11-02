<template>
    <!-- Product Detail -->
    <section class="sec-product-detail bg0 p-t-65 p-b-60">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-lg-7 p-b-30">
                    <div class="p-l-25 p-r-30 p-lr-0-lg">
                        <div class="wrap-slick3 flex-sb flex-w">
                            <div class="wrap-slick3-dots"></div>
                            <div class="wrap-slick3-arrows flex-sb-m flex-w"></div>

                            <div class="slick3 gallery-lb">
                                <div class="item-slick3" data-thumb="images/product-detail-01.jpg">
                                    <div class="wrap-pic-w pos-relative">
                                        <img src="images/product-detail-01.jpg" alt="IMG-PRODUCT">

                                        <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                                            href="images/product-detail-01.jpg">
                                            <i class="fa fa-expand"></i>
                                        </a>
                                    </div>
                                </div>

                                <div class="item-slick3" data-thumb="images/product-detail-02.jpg">
                                    <div class="wrap-pic-w pos-relative">
                                        <img src="images/product-detail-02.jpg" alt="IMG-PRODUCT">

                                        <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                                            href="images/product-detail-02.jpg">
                                            <i class="fa fa-expand"></i>
                                        </a>
                                    </div>
                                </div>

                                <div class="item-slick3" data-thumb="images/product-detail-03.jpg">
                                    <div class="wrap-pic-w pos-relative">
                                        <img src="images/product-detail-03.jpg" alt="IMG-PRODUCT">

                                        <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                                            href="images/product-detail-03.jpg">
                                            <i class="fa fa-expand"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-5 p-b-30"   >
                    <div class="p-r-50 p-t-5 p-lr-0-lg">
                        <h4 id="product-name" class="mtext-105 cl2 js-name-detail p-b-14"></h4>
                        <span id="product-price" class="mtext-106 cl2"></span>
                        <h4 class="mtext-105 cl2 js-name-detail p-b-14">
                        </h4>

                        <span class="mtext-106 cl2">
                        </span>

                        <p class="stext-102 cl3 p-t-23">
                            Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare
                            feugiat.
                        </p>
                        <!--  -->
                        <div class="p-t-33">
                            <div class="flex-w flex-r-m p-b-10">
                                <div class="size-203 flex-c-m respon6">
                                    Size
                                </div>

                                <div class="size-204 respon6-next">
                                    <div class="rs1-select2 bor8 bg0">
                                        <select class="js-select2" name="time">
                                            <option>Choose an option</option>
                                            <option>Size S</option>
                                            <option>Size M</option>
                                            <option>Size L</option>
                                            <option>Size XL</option>
                                        </select>
                                        <div class="dropDownSelect2"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex-w flex-r-m p-b-10">
                                <div class="size-203 flex-c-m respon6">
                                    Color
                                </div>

                                <div class="size-204 respon6-next">
                                    <div class="rs1-select2 bor8 bg0">
                                        <select class="js-select2" name="time">
                                            <option>Choose an option</option>
                                            <option>Red</option>
                                            <option>Blue</option>
                                            <option>White</option>
                                            <option>Grey</option>
                                        </select>
                                        <div class="dropDownSelect2"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex-w flex-r-m p-b-10">
                                <div class="size-204 flex-w flex-m respon6-next">
                                    <div class="wrap-num-product flex-w m-r-20 m-tb-10">
                                        <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                            <i class="fs-16 zmdi zmdi-minus"></i>
                                        </div>

                                        <input class="mtext-104 cl3 txt-center num-product" type="number"
                                            name="num-product" value="1">

                                        <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                            <i class="fs-16 zmdi zmdi-plus"></i>
                                        </div>
                                    </div>

                                    <button
                                        class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!--  -->
                        <div class="flex-w flex-m p-l-100 p-t-40 respon7">
                            <div class="flex-m bor9 p-r-10 m-r-11">
                                <a href="#"
                                    class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                                    data-tooltip="Add to Wishlist">
                                    <i class="zmdi zmdi-favorite"></i>
                                </a>
                            </div>

                            <a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                                data-tooltip="Facebook">
                                <i class="fa fa-facebook"></i>
                            </a>

                            <a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                                data-tooltip="Twitter">
                                <i class="fa fa-twitter"></i>
                            </a>

                            <a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                                data-tooltip="Google Plus">
                                <i class="fa fa-google-plus"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bor10 m-t-50 p-t-43 p-b-40">
                <div class="tab01">
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item p-b-10">
                            <a class="nav-link" href="#description" data-tab="description">Description</a>
                        </li>
                        <li class="nav-item p-b-10">
                            <a class="nav-link" href="#information" data-tab="information">Additional information</a>
                        </li>
                        <li class="nav-item p-b-10">
                            <a class="nav-link" href="#reviews" data-tab="reviews">Reviews (1)</a>
                        </li>
                    </ul>

                    <div class="tab-content p-t-43">
                        <div class="tab-pane active" id="description">
                            <div class="how-pos2 p-lr-15-md">
								<p id="product-description"></p>
							</div>
                        </div>
                        <div class="tab-pane" id="information">
                            <!-- Nội dung tab Information -->
                        </div>
                        <div class="tab-pane" id="reviews">
                            <!-- Nội dung tab Reviews -->
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
            productId: null,
            product: {},
        };
    },
    methods: {
        async fetchSimilarProducts() {
            this.productId = this.$route.params.id;
            const response = await axios.get(API_BASE_URL + '/products/similar/'+this.productId);
            this.similarProducts = response.data
        }
    },
    created() {
        this.fetchSimilarProducts();
    }
};

</script>
<style scoped>
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
    padding-left: 0;
    list-style: none;
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

.stext-102 {
    font-size: 14px;
    color: #666;
}

.mtext-107 {
    font-size: 18px;
    color: #333;
    font-weight: bold;
}

.mtext-108 {
    font-size: 20px;
    color: #333;
    font-weight: bold;
}

.stext-101 {
    font-size: 15px;
    color: #fff;
}

.bg7 {
    background-color: #333;
}

.hov-btn3:hover {
    background-color: #555;
    cursor: pointer;
}

.trans-04 {
    transition: all 0.4s ease;
}

.size-110 {
    width: 100%;
    height: auto;
}

.bor8 {
    border-radius: 8px;
}

.bor11 {
    border-radius: 11px;
}
</style>

<script>
const productId = new URLSearchParams(window.location.search).get('id');
console.log(productId);

if (productId) {
    // Fetch product details using the product ID
    fetch(`http://localhost:8000/api/getProductbyID/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Use the fetched data to display product details on the page
            document.getElementById('product-name').textContent = data.name || 'N/A';
            document.getElementById('product-price').textContent = `$${data.price.toFixed(2)}` || 'N/A';
            document.getElementById('product-description').textContent = data.desc || 'No description available.';
        })
        .catch(error => console.error('Error fetching product:', error));
} else {
    console.error('Product ID not found in the URL.');
}
</script>