<template>
  <div class="wrapper">
    <SideBarComponent />
    <div class="main-panel">
      <div class="main-header">
        <HeaderComponent />
        <NavbarComponent />
      </div>
      <div class="container">
        <div class="page-inner">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <div class="card-title">Edit Variant</div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="form-group">
                    <div class="row pt3">
                      <div class="col-6">
                        <label class="form-label">Color</label>
                        <div class="row gutters-xs">
                          <div class="col-auto" v-for="color in colors" :key="color.id">
                            <label class="colorinput">
                              <input type="radio" v-model="variantData.color_id" :value="color.id"
                                class="colorinput-input" />
                              <span class="colorinput-color" :style="{ backgroundColor: color.name }"></span>
                            </label>
                          </div>
                        </div>
                        <ErrorMessage :errorMessage="errors.color_id" />
                      </div>
                      <div class="col-6">
                        <label class="form-label">Size</label>
                        <div class="selectgroup w-100">
                          <label class="selectgroup-item" v-for="size in sizes" :key="size.id">
                            <input type="radio" name="size" v-model="variantData.size_id" :value="size.id"
                              class="selectgroup-input" />
                            <span class="selectgroup-button">{{ size.name }}</span>
                          </label>
                        </div>
                        <ErrorMessage :errorMessage="errors.size_id" />
                      </div>
                    </div>
                    <div class="row pt-3">
                      <div class="col-6">
                        <label class="form-label">Quantity</label>
                        <input type="number" class="form-control" id="quantity" v-model="variantData.quantity"
                          placeholder="Enter quantity" />
                        <ErrorMessage :errorMessage="errors.quantity" />
                      </div>
                      <div class="col-6">
                        <label class="pt-3" for="imageUpload">Images</label><br />
                        <input type="file" class="form-control-file" id="imageUpload" multiple
                          @change="handleFileUpload" />
                        <ErrorMessage :errorMessage="errors.images" />
                      </div>
                    </div>
                    <div class="row pt-3">
                      <div class="col-6">
                        <label class="pt-3">Old Images</label><br />
                        <div class="custom-slider-container me-auto">
                          <div class="custom-slider-wrapper">
                            <div class="custom-slide" v-for="(image, index) in oldImages" :key="index">
                              <img :src="image" alt="variant image" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-action">
                    <button class="btn btn-success" @click="saveChanges">Save Changes</button>
                    <button class="btn btn-danger" @click="goBack">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
      <LoadingOverlay :isLoading="isLoading" />

    </div>
  </div>
</template>

<script>
import SideBarComponent from "../SideBarComponent.vue";
import NavbarComponent from "../NavbarComponent.vue";
import HeaderComponent from "../HeaderComponent.vue";
import FooterComponent from "../FooterComponent.vue";
import LoadingOverlay from '@/components/common/LoadingOverlayComponent.vue';
import axios from "axios";
import { useToast } from "vue-toastification";
import { API_BASE_URL } from '@/utils/config';

export default {
  name: "EditVariant",
  components: {
    SideBarComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    LoadingOverlay,
  },
  data() {
    return {
      sizes: [],
      colors: [],
      variantData: {
        id: this.$route.query.variant_id,
        color_id: '',
        size_id: '',
        quantity: '',
        images: [],
      },
      oldImages: [],
      errors: {},
      isLoading: true,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    this.loadSizes();
    this.loadColors();
    this.loadVariantData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loadVariantData() {
      axios.get(`${API_BASE_URL}/getVariantByVariantId?variant_id=${this.$route.params.id}`)
        .then(response => {
          if (response.data.status === "error") {
            this.toast.error(response.data.message || "Product variant not found.");
            this.goBack();
            return;
          }
          const data = response.data.variant;
          this.variantData = {
            id: data.id,
            color_id: data.color_id,
            size_id: data.size_id,
            quantity: data.quantity,
            images: [],
          };
          this.oldImages = data.images;
        })
        .catch(error => {
          console.error(error);
          this.toast.error('Failed to load variant data');
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    loadSizes() {
      axios.get(`${API_BASE_URL}/getAllSizes`)
        .then(response => {
          this.sizes = response.data.sizes;
        })
        .catch(error => {
          console.error(error);
          this.toast.error('Failed to load sizes');
        });
    },
    loadColors() {
      axios.get(`${API_BASE_URL}/getAllColors`)
        .then(response => {
          this.colors = response.data.colors;
        })
        .catch(error => {
          console.error(error);
          this.toast.error('Failed to load colors');
        });
    },
    saveChanges() {
      const formData = new FormData();
      formData.append('variant_id', this.variantData.id);
      formData.append('color_id', this.variantData.color_id);
      formData.append('size_id', this.variantData.size_id);
      formData.append('quantity', this.variantData.quantity);
      formData.append('status', 1);
      this.isLoading = true;
      if (this.variantData.images.length > 0) {
        this.variantData.images.forEach((image) => {
          formData.append('images[]', image);
        });
      }
      axios.post(`${API_BASE_URL}/admin/editProductVariant`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then((response) => {
          if (response.data.status === "success") {
            this.toast.success(response.data.message);
            this.goBack();
          } else {
            this.errors = response.data.errors;
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 409) {
              this.toast.error(error.response.data.message);
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleFileUpload(event) {
      const files = event.target.files;
      this.variantData.images = Array.from(files);
    }
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

.custom-slider-container {
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px 0;
  width: 350px;
  height: 140px;
  top: 10px;
  right: 10px;
}

.custom-slider-wrapper {
  display: flex;
  gap: 10px;
}

.custom-slide {
  display: inline-block;
  flex-shrink: 0;
}

.custom-slide img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}
</style>
