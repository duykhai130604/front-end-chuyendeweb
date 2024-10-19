<template>
    <div style="height: auto;">
        <ckeditor :editor="editor" v-model="editorData" @ready="onReady" />
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
    name: 'CKEditorComponent',
    data() {
        return {
            editor: ClassicEditor,
            editorData: ''
        };
    },
    methods: {
        onReady(editor) {
            console.log('Editor is ready!', editor);
        }
    }
};
</script>

<style>
/* Bạn có thể thêm style cho CKEditor ở đây */
</style>
