<template>
    <div>
        <div class="tabs is-centered">
            <ul>
                <li v-for="tab in tabs"
                    :class="{ 'is-active': category === tab.category }">
                    <a @click="setCategory(tab.category)">{{ tab.name }}</a>
                </li>
            </ul>
        </div>

        <div class="field">
            <div class="control has-icons-left">
                <input class="input" placeholder="Filter" v-model="service.filter" @keyup="updateFilter()">
                <span class="icon is-left">
                    <i class="fa fa-search"></i>
                </span>
            </div>
        </div>

        <div class="field" v-if="auth.loggedIn">
            <router-link :to="{ name: 'beverage', params: { id: 'new' } }">
                <button class="button is-primary is-outlined is-fullwidth">
                    Add beverage
                </button>
            </router-link>
        </div>

        <spinner v-if="loadingData"></spinner>
        <div class="table-scrollable" v-if="!loadingData">
            <table class="table">
                <thead>
                <tr>
                    <th><a @click="sort('name')">Name</a></th>
                    <th><a @click="sort('brewery')">Brewery</a></th>
                    <th><a @click="sort('percentage')"><abbr title="Percentage">%</abbr></a></th>
                    <th><a @click="sort('country')">Country</a></th>
                    <th><a @click="sort('style')">Type</a></th>
                    <th><a @click="sort('sscore')"><abbr title="S Score">S</abbr></a></th>
                    <th><a @click="sort('oscore')"><abbr title="O Score">O</abbr></a></th>
                </tr>
                </thead>

                <tbody>
                <router-link :to="{ name: 'beverage', params: { id: beverage.id } }" tag="tr"
                    v-for="beverage in service.filteredBeverages" :key="beverage.id">
                    <td>{{ beverage.name }}</td>
                    <td>{{ beverage.brewery }}</td>
                    <td>{{ beverage.percentage || '?' }}%</td>
                    <td>{{ beverage.country }}</td>
                    <td>{{ beverage.style }}</td>
                    <td>{{ beverage.sscore }}</td>
                    <td>{{ beverage.oscore }}</td>
                </router-link>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Spinner from '../Spinner.vue'
    import modal from '../../services/modal.js'
    import auth from '../../services/auth.js'
    import BeverageService from './BeverageService'

    // noinspection JSUnusedGlobalSymbols
    export default {
        components: {Spinner},
        name: 'beverages',
        data () {
            return {
                auth: auth,
                service: BeverageService,
                category: 0,
                tabs: [
                    { name: 'Beer', category: 0 },
                    { name: 'Sake', category: 2 },
                    { name: 'Wine', category: 1 },
                    { name: 'Whiskey', category: 3 }
                ],
                modal: modal,
                loadingData: false
            }
        },
        methods: {
            setCategory (category) {
                this.category = category
                this.sortBy = 'name'
                this.ascending = true
                this.loadBeverages(category)
            },
            updateFilter: function () {
                BeverageService.updateFilter(BeverageService.filter)
            },
            loadBeverages: function (category) {
                this.loadingData = true
                BeverageService.loadBeverages(this, category, _ => {
                    this.loadingData = false
                }, error => modal.httpError(error))
            },
            sort: function (sortBy) {
                BeverageService.sortBeverages(sortBy)
            }
        },
        beforeMount () {
            this.loadBeverages(this.category)
        }
    }
</script>

<style scoped>
    .table {
        width: 100%;
    }
    .table-scrollable {
        overflow-x: scroll;
    }
</style>
