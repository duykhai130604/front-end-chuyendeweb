<template>
    <nav aria-label="pagination">
        <ul class="pagination">
            <li v-if="currentPage > 1">
                <a href="" @click.prevent="changePage(currentPage - 1)" aria-hidden="true">
                    « <span class="visuallyhidden">Previous</span>
                </a>
            </li>
            <li v-for="page in totalPages" :key="page">
                <a href="" @click.prevent="changePage(page)"
                    :class="{ 'active': currentPage === page }"
                    :aria-current="currentPage === page ? 'page' : undefined">
                    <span class="visuallyhidden">Page </span>{{ page }}
                </a>
            </li>
            <li v-if="currentPage < totalPages">
                <a href="" @click.prevent="changePage(currentPage + 1)" aria-hidden="true">
                    <span class="visuallyhidden">Next</span> »
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'PaginationComponent',
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        changePage: {
            type: Function,
            required: true
        }
    }
};
</script>

<style scoped>
.visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: auto;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
}

nav {
    display: flex;
    justify-content: center;
    border-top: 1px solid #eee;
    margin-top: 1em;
    padding-top: 0.5em;
}

.pagination {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.pagination li {
    margin: 0 1px;
}

.pagination a {
    display: block;
    padding: 0.5em 1em;
    border: 1px solid #999;
    border-radius: 0.2em;
    text-decoration: none;
}

.pagination a[aria-current="page"] {
    background-color: #333;
    color: #fff;
}
</style>
