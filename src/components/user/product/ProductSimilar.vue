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
					<div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
						v-for="topProduct in displayedProducts" :key="topProduct.id">
						<div class="block2">
							<div class="block2-pic hov-img0">
								<img :src="topProduct.thumbnail" alt="IMG-PRODUCT" />
								<div @click="goToProductDetail(topProduct.id)"
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
										{{ avgRating(topProduct.ratings_avg_rating) ?? '0' }}
										<span v-for="n in 5" :key="n" class="star"
											:class="{ 'filled': n <= topProduct.ratings_avg_rating }">
											★
										</span>
										({{ topProduct.ratings_count }})
									</div>
									<span class="stext-105 cl3"> {{ topProduct.price }} VND </span>
								</div>
							</div>
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

			<!-- Load More Button -->
			<div class="text-center" v-if="hasMoreProducts">
				<button @click="loadMore" class="btn btn-primary">Load More</button>
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
			similarProducts: [],
			displayedCount: 4,  // Number of products displayed initially
		};
	},
	computed: {
		displayedProducts() {
			return this.similarProducts.slice(0, this.displayedCount);
		},
		hasMoreProducts() {
			return this.displayedCount < this.similarProducts.length;
		}
	},
	methods: {
		async fetchSimilarProducts() {
			this.productId = this.$route.params.id;
			const response = await axios.get(API_BASE_URL + '/products/similar/' + this.productId);
			this.similarProducts = [
				...response.data.original.similar,
				...response.data.original.catepro
			];
		},
		avgRating(rating) {
			return rating ? parseFloat(rating).toFixed(1) : 0;
		},
		async goToProductDetail(id) {
			const encryptResponse = await axios.get(`${API_BASE_URL}/encrypt/${id}`);
			this.$router.push({ name: 'product', params: { id: encryptResponse.data.encrypted_id } });
		},
		loadMore() {
			// Increase the displayed count by 4 (or whatever increment you prefer)
			this.displayedCount += 4;
		}
	},
	created() {
		this.fetchSimilarProducts();
	}
}
</script>

<style scoped>
.star {
	color: #ddd;
}

.star.filled {
	color: #ffcc00;
}
</style>