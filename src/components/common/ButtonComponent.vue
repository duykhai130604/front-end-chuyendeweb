<template>
    <button
      :class="['btn', btnClass]"
      :disabled="disabled"
    >
      <i v-if="icon" :class="icon"></i>
      <span v-if="icon && label">{{ label }}</span>
      <span v-else-if="label">{{ label }}</span>
    </button>
</template>

<script>
export default {
    name: 'ButtonComponent',
    props: {
        label: {
            type: String,
            required: true,
        },
        btnClass: {
            type: String,
            default: 'btn-primary',
        },
        icon: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
.btn {
    margin: 0.5rem;
}
</style>
