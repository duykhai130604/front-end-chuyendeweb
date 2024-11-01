<template>
	<!-- Related Products -->
	<section class="sec-relate-product bg0 p-t-45 p-b-105">
		<div class="container">
			<div class="p-b-45">
				<h3 class="ltext-106 cl5 txt-center">
					Related Products
				</h3>
			</div>
			<!-- Slide2 -->
			<div class="wrap-slick2">
				<div class="slick2 row">
					<div class="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15 col-md-3"
						v-for="(product, index) in similarProducts" :key="index">
						<!-- Block2 -->
						<div class="block2">
							<div class="block2-pic hov-img0">
								<img :src="product.thumbnail" alt="IMG-PRODUCT">

								<a href="#"
									class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
									Quick View
								</a>
							</div>

							<div class="block2-txt flex-w flex-t p-t-14">
								<div class="block2-txt-child1 flex-col-l ">
									<a href="product-detail.html"
										class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">{{ product.name }}</a>

									<span class="stext-105 cl3">
										{{ product.price }}VND
									</span>
								</div>

								<div class="block2-txt-child2 flex-r p-t-3">
									<a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">

									</a>
								</div>
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
export default {
	name: 'RelatedProducts',
	data() {
		return {
			similarProducts: []
		}
	},
	mounted() {

	},
	methods: {
		async fetchSimilarProducts() {
			this.productId = this.$route.params.id;
			const response = await axios.get(API_BASE_URL + '/products/similar/' + this.productId);
			this.similarProducts = [
				...response.data.original.similar,
				...response.data.original.catepro
			];
		}
	},
	created() {
		this.fetchSimilarProducts();
	}
}
</script>