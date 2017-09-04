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
                <input class="input" placeholder="Filter" v-model="filter" @keyup="updateFilter()">
                <span class="icon is-left">
                    <i class="fa fa-search"></i>
                </span>
            </div>
        </div>

        <div class="field" v-if="auth.loggedIn">
            <button class="button is-primary is-outlined is-fullwidth" @click="addBeverage()">
                Add beverage
            </button>
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
                <tr v-for="beverage in beverages" :key="beverage.id" @click="showBeverage(beverage)">
                    <td>{{ beverage.name }}</td>
                    <td>{{ beverage.brewery }}</td>
                    <td>{{ beverage.percentage || '?' }}%</td>
                    <td>{{ beverage.country }}</td>
                    <td>{{ beverage.style }}</td>
                    <td>{{ beverage.sscore }}</td>
                    <td>{{ beverage.oscore }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <beverage-modal ref="beverageModal"></beverage-modal>
    </div>
</template>

<script>
    import Spinner from '../Spinner.vue'
    import BeverageModal from './BeverageModal.vue'
    import modal from '../../services/modal.js'
    import auth from '../../services/auth.js'

    // noinspection JSUnusedGlobalSymbols
    export default {
        components: {
            BeverageModal,
            Spinner},
        name: 'beverages',
        data () {
            return {
                auth: auth,
                category: 0,
                tabs: [
                    { name: 'Beer', category: 0 },
                    { name: 'Sake', category: 2 },
                    { name: 'Wine', category: 1 },
                    { name: 'Whiskey', category: 3 }
                ],
                beverages: [],
                beveragesBackup: [],
                filter: undefined,
                sortBy: 'name',
                ascending: true,
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
                this.beverages = this.beveragesBackup.filter(beverage => {
                    if (!this.filter) {
                        return true
                    }
                    return (beverage.name && beverage.name.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1) ||
                        (beverage.brewery && beverage.brewery.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1) ||
                        (beverage.country && beverage.country.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1) ||
                        (beverage.style && beverage.style.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1)
                })
            },
            loadBeverages: function (category) {
                this.loadingData = true
                this.$http.get(`/api/beverages?category=${category}`)
                    .then(data => {
                        this.beveragesBackup = data.body
                        this.sort()
                        this.updateFilter()
                        this.loadingData = false
                    })
                    .catch(error => modal.httpError(error))
            },
            sort: function (sortBy) {
                if (sortBy === this.sortBy) {
                    this.ascending = !this.ascending
                } else if (sortBy) {
                    this.sortBy = sortBy
                    this.ascending = true
                }
                sortBy = this.sortBy

                this.beveragesBackup.sort(function (a, b) {
                    const aKey = a[sortBy] ? a[sortBy] : ''
                    const bKey = b[sortBy] ? b[sortBy] : ''

                    if (typeof aKey === 'string') {
                        return aKey.localeCompare(bKey)
                    } else {
                        return aKey - bKey
                    }
                })
                if (!this.ascending) {
                    this.beveragesBackup = this.beveragesBackup.reverse()
                }
                this.updateFilter()
            },
            showBeverage: function (beverage) {
                this.$refs.beverageModal.show(beverage)
            },
            addBeverage: function () {
                this.$refs.beverageModal.show({ category: this.category })
                this.$refs.beverageModal.editing = true
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