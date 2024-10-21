
<template>
    <div v-if="errorMessage" class="text-danger">
      {{ errorMessage }}
    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorMessage',
    props: {
      errorMessage: {
        type: String,
        default: ''
      }
    }
  }
  </script>
  
  <style scoped>
  .text-danger {
    color: red;
  }
  </style>
  