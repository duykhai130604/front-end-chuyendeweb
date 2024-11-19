<template>
  <header>
    <!-- Header desktop -->
    <div class="container-menu-desktop">
      <!-- Topbar -->
      <div class="top-bar">
        <div class="content-topbar flex-sb-m h-full container">
          <div class="left-top-bar">
            Free shipping for standard order over $100
          </div>

          <div class="right-top-bar flex-w h-full">
            <a href="#" class="flex-c-m trans-04 p-lr-25"> Help & FAQs </a>
            <a href="#" class="flex-c-m trans-04 p-lr-25"> EN </a>
            <a href="#" class="flex-c-m trans-04 p-lr-25"> USD </a>
            <button style="color: aliceblue;" class="flex-c-m trans-04 p-lr-25" v-if="userAuth"
              @click="logout">Logout</button>
            <router-link to="/login" class="flex-c-m p-lr-10 trans-04" v-else>Log in</router-link>
            <a href="#" class="flex-c-m trans-04 p-lr-25" v-if="userAuth">{{ userAuth.name }} </a>
          </div>
        </div>
      </div>



      <div class="wrap-menu-desktop">
        <nav class="limiter-menu-desktop container">
          <!-- Logo desktop -->
          <router-link to="/" class="logo">
            <img src="../../assets/images/icons/logo-01.png" alt="IMG-LOGO" />
          </router-link>

          <!-- Menu desktop -->
          <div class="menu-desktop">
            <ul class="main-menu">
              <li>
                <router-link to="/">Home</router-link>
              </li>

              <li>
                <router-link v-if="userAuth" to="/history">Sản phẩm đã mua</router-link>
              </li>

              <li class="label1" data-label1="hot">
                <router-link v-if="userAuth" to="/blogs">Blog</router-link>
              </li>
              <li>
                <router-link v-if="userAuth" to="/followed">Đã theo dõi</router-link>
              </li>

              <li>
                <a href="contact.html">Contact</a>
              </li>
            </ul>
          </div>

          <!-- Icon header -->
          <div class="wrap-icon-header flex-w flex-r-m">
            <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
              <i class="zmdi zmdi-search"></i>
            </div>

            <router-link to="/cart">
              <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                data-notify="2">
                <i class="zmdi zmdi-shopping-cart"></i>
              </div>
            </router-link>

            <a href="#" class="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
              data-notify="0">
              <i class="zmdi zmdi-favorite-outline"></i>
            </a>
          </div>
        </nav>
      </div>
    </div>

    <!-- Header Mobile -->
    <div class="wrap-header-mobile">
      <!-- Logo moblie -->
      <div class="logo-mobile">
        <a href="index.html"><img src="../../assets/images/icons/logo-01.png" alt="IMG-LOGO" /></a>
      </div>

      <!-- Icon header -->
      <div class="wrap-icon-header flex-w flex-r-m m-r-15">
        <div class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
          <i class="zmdi zmdi-search"></i>
        </div>

        <div class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify="2">
          <i class="zmdi zmdi-shopping-cart"></i>
        </div>

        <a href="#" class="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
          data-notify="0">
          <i class="zmdi zmdi-favorite-outline"></i>
        </a>
      </div>

      <!-- Button show menu -->
      <div class="btn-show-menu-mobile hamburger hamburger--squeeze">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </div>
    </div>

    <!-- Menu Mobile -->
    <div class="menu-mobile">
      <ul class="topbar-mobile">
        <li>
          <div class="left-top-bar">
            Free shipping for standard order over $100
          </div>
        </li>

        <li>
          <div class="right-top-bar flex-w h-full">
            <a href="#" class="flex-c-m p-lr-10 trans-04"> Help & FAQs </a>

            <a href="#" class="flex-c-m p-lr-10 trans-04"> My Account </a>

            <a href="#" class="flex-c-m p-lr-10 trans-04" v-if="userAuth">Log out</a>
            <a href="#" class="flex-c-m p-lr-10 trans-04" v-else>Log in</a>

            <a href="#" class="flex-c-m p-lr-10 trans-04" v-if="userAuth">{{ userAuth.name }} </a>

            <a href="#" class="flex-c-m p-lr-10 trans-04"> EN </a>

            <a href="#" class="flex-c-m p-lr-10 trans-04"> USD </a>
          </div>
        </li>
      </ul>

      <ul class="main-menu-m">
        <li>
          <router-link to="/">Home</router-link>
          <span class="arrow-main-menu-m">
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </span>
        </li>

        <li>
          <a href="product.html">Shop</a>
        </li>

        <li>
          <a href="shoping-cart.html" class="label1 rs1" data-label1="hot">Features</a>
        </li>

        <li>
          <a href="blog.html">Blog</a>
        </li>

        <li>
          <a href="about.html">About</a>
        </li>

        <li>
          <a href="contact.html">Contact</a>
        </li>
      </ul>
    </div>

    <!-- Modal Search -->
    <div class="modal-search-header flex-c-m trans-04 js-hide-modal-search">
      <div class="container-search-header">
        <button class="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
          <img src="../../assets/images/icons/icon-close2.png" alt="CLOSE" />
        </button>

        <form class="wrap-search-header flex-w p-l-15">
          <button class="flex-c-m trans-04">
            <i class="zmdi zmdi-search"></i>
          </button>
          <input class="plh3" type="text" name="search" placeholder="Search..." />
        </form>
      </div>
    </div>
  </header>
</template>
<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
export default { 
  data() {
    return {
      userAuth: null
    };
  },
  methods: {
    async logout() {
      const confirmLogout = window.confirm('Bạn có muốn thoát không?');
      if (!confirmLogout) {
        return;
      }

      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.log('No token found, user is already logged out');
          return;
        }
        await axios.post(`${API_BASE_URL}/logout`, null, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
        });
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        //this.$store.commit('setUserRole', null);
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.error('Error during logout:', error.response ? error.response.data : error.message);
      }
    },

    async fetchUser() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.log('No token found, user is not authenticated');
          return;
        }

        const response = await axios.get(API_BASE_URL + '/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        this.userAuth = response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Token expired or invalid');
          localStorage.removeItem('authToken');
          localStorage.removeItem('userRole');
          this.$router.push({ name: 'login' });
        } else {
          console.log('Error fetching user:', error);
        }
      }
    }
  },
  created() {
    this.fetchUser();
    this.$store.watch(
      (state) => state.userRole,
      (newUserRole) => {
        this.userAuth = newUserRole;
      }
    );
  }
};

</script>