<template>
    <div>
        <div class="container">
            <div class="page-inner">
                <div class="page-header">
                    <h3 class="fw-bold mb-3">Danh mục</h3>
                    <a href="addcategory.html">
                        <div class="btn btn-success mx-5">Add new</div>
                    </a>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Basic</h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table id="basic-datatables" class="display table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Parent</th>
                                                <th>Created at</th>
                                                <th>Updated at</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(category, index) in categories" :key="category.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ category.name }}</td>
                                                <td>{{ category.parent_id }}</td>
                                                <td>{{ formatDate(category.created_at) }}</td>
                                                <td>{{ formatDate(category.updated_at) }}</td>
                                                <td>
                                                    <a @click="getEncrypt(category.id)"
                                                        class="btn btn-primary btn-sm">Edit</a>
                                                    <a href="#" class="btn btn-danger btn-sm">Delete</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            categories: [],
            idEncode: 0
        };
    },
    methods: {
        async getCategoriesByPage() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories');
                this.categories = response.data.data;

            } catch (error) {
                console.error("There was an error fetching categories:", error);
            }
        },
        formatDate(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');

            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            const seconds = String(d.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        async getEncrypt(id) {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/encrypt/' + id);
                this.idEncode = response.data.encrypted_id;
                this.$router.push({
                    name: 'edit-category',
                    params: { idEncode: this.idEncode }, 
                    query: { categories: JSON.stringify(this.categories) } 
                });
            } catch (error) {
                console.error("There was an error fetching categories:", error);
            }
        }
    },
    created() {
        this.getCategoriesByPage();
        
    }
};
</script>
