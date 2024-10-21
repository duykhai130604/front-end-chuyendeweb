<template>
    <div class="loading-overlay" v-if="isLoading">
        <div class="progress">
            <div class="progress-bar" :style="{ width: loadingPercentage + '%' }"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingOverlay',
    props: {
        isLoading: {
            type: Boolean,
            required: true
        },
        loadingPercentage: {
            type: Number,
            required: true
        }
    }
}
</script>

<style>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.progress {
    width: 134.4px;
    height: 24.6px;
    border-radius: 22.4px;
    border: 2.2px solid #474bff;
    position: relative;
    background-color: rgba(255, 255, 255, 0.1);
}

.progress-bar {
    height: 100%;
    border-radius: inherit;
    background: #474bff;
    transition: width 0.2s ease;
}
</style>
