<template>
    <div class="wrapper">
        <SideBarComponent />
        <div class="main-panel">
            <div class="main-header">
                <HeaderComponent />
                <NavbarComponent />
            </div>
            <div class="container">
                <div class="page-inner">
                    <div class="page-header">
                        <h3 class="fw-bold mb-3">Add New Product Variant</h3>
                        <ul class="breadcrumbs mb-3">
                            <li class="nav-home">
                                <a href="#">
                                    <i class="icon-home"></i>
                                </a>
                            </li>
                            <li class="separator">
                                <i class="icon-arrow-right"></i>
                            </li>
                            <li class="nav-item">
                                <a href="#">Product List</a>
                            </li>
                            <li class="separator">
                                <i class="icon-arrow-right"></i>
                            </li>
                            <li class="nav-item">
                                <a href="#">Manage Product Variants</a>
                            </li>
                            <li class="separator">
                                <i class="icon-arrow-right"></i>
                            </li>
                            <li class="nav-item">
                                <a href="#">Add new Variants</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">Add new Variant</div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="form-group">
                                        <div class="row pt3">
                                            <div class="col-6">
                                                <label class="form-label">Color</label>
                                                <div class="row gutters-xs">
                                                    <div class="col-auto">
                                                        <label class="colorinput">
                                                            <input name="color" type="checkbox" value="dark"
                                                                class="colorinput-input" />
                                                            <span class="colorinput-color bg-black"></span>
                                                        </label>
                                                    </div>
                                                    <div class="col-auto">
                                                        <label class="colorinput">
                                                            <input name="color" type="checkbox" value="primary"
                                                                class="colorinput-input" />
                                                            <span class="colorinput-color bg-primary"></span>
                                                        </label>
                                                    </div>
                                                    <div class="col-auto">
                                                        <label class="colorinput">
                                                            <input name="color" type="checkbox" value="secondary"
                                                                class="colorinput-input" />
                                                            <span class="colorinput-color bg-secondary"></span>
                                                        </label>
                                                    </div>
                                                    <div class="col-auto">
                                                        <label class="colorinput">
                                                            <input name="color" type="checkbox" value="info"
                                                                class="colorinput-input" />
                                                            <span class="colorinput-color bg-info"></span>
                                                        </label>
                                                    </div>
                                                    <div class="col-auto">
                                                        <label class="colorinput">
                                                            <input name="color" type="checkbox" value="success"
                                                                class="colorinput-input" />
                                                            <span class="colorinput-color bg-success"></span>
                                                        </label>
                                                    </div>
                                                    <div class="col-auto">
                                                        <label class="colorinput">
                                                            <input name="color" type="checkbox" value="danger"
                                                                class="colorinput-input" />
                                                            <span class="colorinput-color bg-danger"></span>
                                                        </label>
                                                    </div>
                                                    <div class="col-auto">
                                                        <label class="colorinput">
                                                            <input name="color" type="checkbox" value="warning"
                                                                class="colorinput-input" />
                                                            <span class="colorinput-color bg-warning"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Size</label>
                                                <div class="selectgroup w-100">
                                                    <label class="selectgroup-item">
                                                        <input type="radio" name="value" value="50"
                                                            class="selectgroup-input" checked="" />
                                                        <span class="selectgroup-button">S</span>
                                                    </label>
                                                    <label class="selectgroup-item">
                                                        <input type="radio" name="value" value="100"
                                                            class="selectgroup-input" />
                                                        <span class="selectgroup-button">M</span>
                                                    </label>
                                                    <label class="selectgroup-item">
                                                        <input type="radio" name="value" value="150"
                                                            class="selectgroup-input" />
                                                        <span class="selectgroup-button">L</span>
                                                    </label>
                                                    <label class="selectgroup-item">
                                                        <input type="radio" name="value" value="200"
                                                            class="selectgroup-input" />
                                                        <span class="selectgroup-button">XL</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label for="email2">Quantity</label>
                                                <input type="number" class="form-control" id="email2"
                                                    placeholder="Enter quantity" />
                                            </div>
                                            <div class="col-6">
                                                <label class="pt-3" for="exampleFormControlFile1">Images</label><br>
                                                <input type="file" class="form-control-file"
                                                    id="exampleFormControlFile1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-action">
                                        <button class="btn btn-success">Submit</button>
                                        <button class="btn btn-danger">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </div>
    </div>
</template>
<script>


import SideBarComponent from '../SideBarComponent.vue';
import NavbarComponent from '../NavbarComponent.vue';
import HeaderComponent from '../HeaderComponent.vue';
import FooterComponent from '../FooterComponent.vue';
export default {
    name: 'ProductList',
    components: {
        SideBarComponent, NavbarComponent, HeaderComponent, FooterComponent
    },
}
</script>
<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
</style>