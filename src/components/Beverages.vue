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

        <div class="table-scrollable">
            <table class="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Brewery</th>
                    <th><abbr title="Percentage">%</abbr></th>
                    <th>Country</th>
                    <th>Type</th>
                    <th><abbr title="S Score">S</abbr></th>
                    <th><abbr title="O Score">O</abbr></th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="beverage in beverages">
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
    </div>
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'beverages',
        data () {
            return {
                category: 0,
                tabs: [
                    { name: 'Beer', category: 0 },
                    { name: 'Sake', category: 2 },
                    { name: 'Wine', category: 1 },
                    { name: 'Whiskey', category: 3 }
                ],
                beverages: [],
                beveragesBackup: [],
                filter: undefined
            }
        },
        methods: {
            setCategory (category) {
                this.category = category
                this.loadBeverages(category)
            },
            updateFilter: function () {
                this.beverages = this.beveragesBackup.filter(beverage => {
                    if (!this.filter) {
                        return true
                    }
                    if (!beverage.name || !beverage.brewery || !beverage.country || !beverage.style) {
                        return false
                    }
                    return beverage.name.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1 ||
                        beverage.brewery.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1 ||
                        beverage.country.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1 ||
                        beverage.style.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1
                })
            },
            loadBeverages: function (category) {
                this.$http.get(`http://localhost:8002/api/beverages?category=${category}`)
                    .then(data => {
                        data.body.sort(function (a, b) {
                            return a.name.localeCompare(b.name)
                        })
                        this.beveragesBackup = data.body
                        this.updateFilter()
                    })
                    .catch(error => console.log(error))
            }
        },
        beforeMount () {
            this.loadBeverages(this.category)
        }
    }
</script>

<style>
    .table-scrollable {
        overflow-x: scroll;
    }
</style>
