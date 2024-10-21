<template>
    <LabelComponent :text="label" :for="id" />
    <input :type="type" :id="id" class="form-control" v-model="localValue" @input="updateValue"
        :placeholder="placeholder" />
    <ErrorMessage v-if="errorMessage" :errorMessage="errorMessage" />
</template>

<script>
import LabelComponent from './LabelComponent.vue';
import ErrorMessage from '../common/ErrorMessageComponent.vue';

export default {
    name: 'InputComponent',
    components: {
        LabelComponent,
        ErrorMessage,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        modelValue: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        placeholder: {
            type: String,
            default: '',
        },
        errorMessage: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            localValue: this.modelValue,
        };
    },
    watch: {
        modelValue(newValue) {
            this.localValue = newValue;
        }
    },
    methods: {
        updateValue() {
            this.$emit('update:modelValue', this.localValue);
        }
    }
};
</script>

