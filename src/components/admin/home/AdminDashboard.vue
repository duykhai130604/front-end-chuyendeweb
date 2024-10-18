<template>
    <div class="wrapper">
        <SideBarComponent />
        <div class="main-panel">
            <div class="main-header">
                <HeaderComponent/>
                <NavbarComponent/>
            </div>
            <div class="container">
                <div class="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header">
                                    <div class="d-flex align-items-center">
                                        <h4 class="card-title">Product list</h4>
                                        <a href="./addNewProduct.html" class="ms-auto"><button
                                                class="btn btn-primary btn-round ms-auto" data-bs-toggle="modal"
                                                data-bs-target="#addRowModal">
                                                <i class="fa fa-plus"></i>
                                                Add new product
                                            </button></a>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th style="width: 10%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>#4</td>
                                                    <td>Áo sơ mi nam Tommy Hilfiger</td>
                                                    <td>1,800,000</td>
                                                    <td>
                                                        <div class="form-button-action">
                                                            <button type="button" data-bs-toggle="tooltip"
                                                                title="Edit Task"
                                                                class="btn btn-link btn-primary btn-lg">
                                                                <i class="fa fa-edit"></i>
                                                            </button>
                                                            <button type="button" data-bs-toggle="tooltip"
                                                                title="Remove" class="btn btn-link btn-danger">
                                                                <i class="fa fa-times"></i>
                                                            </button>
                                                            <!-- Variants Button -->
                                                            <button type="button" data-bs-toggle="tooltip"
                                                                title="Manage Variants" class="btn btn-link btn-info">
                                                                <i class="fa fa-list"></i>
                                                            </button>
                                                        </div>
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
            <FooterComponent/>
        </div>
    </div>
</template>
<script>
import SideBarComponent from '../SideBarComponent.vue';
import NavbarComponent from '../NavbarComponent.vue';
import HeaderComponent from '../HeaderComponent.vue';
import FooterComponent from '../FooterComponent.vue';
export default {
    name: 'AdminDashboard',
    components: {
        SideBarComponent, NavbarComponent, HeaderComponent,FooterComponent
    },
}
</script>
