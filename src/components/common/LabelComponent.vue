<template>
    <label :for="htmlFor" class="form-label pt-3">
      {{ text }}
    </label>
  </template>
  
  <script>
  export default {
    name: 'LabelComponent',
    props: {
      text: {
        type: String,
        required: false,
        default: '',
      },
      htmlFor: {
        type: String,
        required: false,
        default: '',
      },
    },
  };
  </script>
  
  <style scoped>
  .form-label {
    font-weight: bold;
  }
  </style>
  