<template>
    <label :for="htmlFor" class="form-label">
      {{ text }}
    </label>
  </template>
  
  <script>
  export default {
    name: 'LabelComponent',
    props: {
      text: {
        type: String,
        required: true,
      },
      htmlFor: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .form-label {
    font-weight: bold;
  }
  </style>
  