import auth from '../../services/auth'

export default {
    allBeverages: [],
    filteredBeverages: [],
    filter: undefined,
    sortBy: 'name',
    ascending: true,

    loadBeverages: function (context, category, onSuccess, onError) {
        this.loadingData = true
        context.$http.get(`/api/beverages?category=${category}`)
            .then(data => {
                this.allBeverages = data.body
                this.sortBeverages(undefined)
                return data.body
            })
            .then(onSuccess)
            .catch(onError)
    },

    sortBeverages: function (sortBy) {
        if (sortBy === this.sortBy) {
            this.ascending = !this.ascending
        } else if (sortBy) {
            this.sortBy = sortBy
            this.ascending = true
        }
        sortBy = this.sortBy

        this.allBeverages.sort(function (a, b) {
            const aKey = a[sortBy] ? a[sortBy] : ''
            const bKey = b[sortBy] ? b[sortBy] : ''

            if (typeof aKey === 'string') {
                return aKey.localeCompare(bKey)
            } else {
                return aKey - bKey
            }
        })
        if (!this.ascending) {
            this.allBeverages = this.allBeverages.reverse()
        }
        this.updateFilter(this.filter)
    },

    updateFilter: function (filter) {
        this.filteredBeverages = this.allBeverages.filter(beverage => {
            if (!filter) {
                return true
            }
            return (beverage.name && beverage.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1) ||
                (beverage.brewery && beverage.brewery.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1) ||
                (beverage.country && beverage.country.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1) ||
                (beverage.style && beverage.style.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1)
        })
    },

    save: function (context, beverage, onSuccess, onError) {
        if (beverage.id) {
            context.$http
                .put(`/api/beverages/${beverage.id}`, beverage, {
                    headers: {
                        Authorization: auth.getAuthHeader()
                    }
                })
                .then(data => {
                    this.sortBeverages(undefined)
                    return data
                })
                .then(data => onSuccess(data.body))
                .catch(onError)
        } else {
            context.$http
                .post('/api/beverages', beverage, {
                    headers: {
                        Authorization: auth.getAuthHeader()
                    }
                })
                .then(data => {
                    this.allBeverages.push(data.body)
                    this.sortBeverages(undefined)
                    return data
                })
                .then(data => onSuccess(data.body))
                .catch(onError)
        }
    },

    remove: function (context, beverage, onSuccess, onError) {
        context.$http
            .delete(`/api/beverages/${beverage.id}`, {
                headers: {
                    Authorization: auth.getAuthHeader()
                }
            })
            .then(_ => {
                this.allBeverages = this.allBeverages.filter(it => it.id !== beverage.id)
                this.sortBeverages(undefined)
            })
            .then(onSuccess)
            .catch(onError)
    }
}
