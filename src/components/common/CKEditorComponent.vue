<template>
    <div style="height: auto;">
        <ckeditor :editor="editor" v-model="localData" @ready="onReady" />
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
    name: 'CKEditorComponent',
    props: {
        modelValue: String
    },
    data() {
        return {
            editor: ClassicEditor,
            localData: this.modelValue || ''
        };
    },
    watch: {
        localData(newValue) {
            this.$emit('update:modelValue', newValue);
        },
        modelValue(newValue) {
            this.localData = newValue;
        }
    },
    methods: {
        onReady(editor) {
            console.log('Editor is ready!', editor);
        }
    }
};
</script>
