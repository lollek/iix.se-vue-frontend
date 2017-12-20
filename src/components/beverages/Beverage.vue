<template>
    <div>
        <div class="field" v-if="auth.loggedIn">
            <span class="top-icon icon has-text-info is-medium" v-if="!editing" @click="editing = true">
                <i class="fa fa-pencil"></i>
            </span>
            <span class="top-icon icon has-text-success is-medium" v-if="editing" @click="save()">
                <i class="fa fa-check"></i>
            </span>
            <span class="top-icon icon has-text-warning is-medium" v-if="editing" @click="cancel()">
                <i class="fa fa-times"></i>
            </span>
            <span class="top-icon icon has-text-danger is-medium" @click="remove()">
                <i class="fa fa-trash"></i>
            </span>
        </div>

        <div class="field">
            <div class="label has-text-primary">Name</div>
            <div class="control" v-if="editing">
                <input class="input" v-model="beverage.name">
            </div>
            <p v-if="!editing">
                {{ beverage.name }}
            </p>
        </div>

        <div class="field">
            <div class="label has-text-primary">Brewery</div>
            <div class="control" v-if="editing">
                <input class="input" v-model="beverage.brewery">
            </div>
            <p v-if="!editing">
                {{ beverage.brewery }}
            </p>
        </div>

        <div class="field">
            <div class="label has-text-primary">Percentage</div>
            <div class="control" v-if="editing">
                <input class="input" type="number" v-model="beverage.percentage">
            </div>
            <p v-if="!editing">
                {{ beverage.percentage }}
            </p>
        </div>

        <div class="field">
            <div class="label has-text-primary">Country</div>
            <div class="control" v-if="editing">
                <input class="input" v-model="beverage.country">
            </div>
            <p v-if="!editing">
                {{ beverage.country }}
            </p>
        </div>

        <div class="field">
            <div class="label has-text-primary">Style</div>
            <div class="control" v-if="editing">
                <input class="input" v-model="beverage.style">
            </div>
            <p v-if="!editing">
                {{ beverage.style }}
            </p>
        </div>

        <div class="field">
            <div class="label has-text-primary">S Score</div>
            <div class="control" v-if="editing">
                <input class="input" type="number" min="1" max="5" v-model="beverage.sscore">
            </div>
            <p v-if="!editing">
                {{ beverage.sscore }}
            </p>
        </div>

        <div class="field">
            <div class="label has-text-primary">O Score</div>
            <div class="control" v-if="editing">
                <input class="input" type="number" min="1" max="5" v-model="beverage.oscore">
            </div>
            <p v-if="!editing">
                {{ beverage.oscore }}
            </p>
        </div>

        <div class="field">
            <div class="label has-text-primary">Comment</div>
            <div class="control" v-if="editing">
                <textarea class="textarea" rows="10" v-model="beverage.comment"></textarea>
            </div>
            <p v-if="!editing">
                {{ beverage.comment }}
            </p>
        </div>
    </div>
</template>

<script>
    import auth from '../../services/auth.js'
    import modal from '../../services/modal.js'
    import BeverageService from './BeverageService'

    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'beverage',
        props: [ 'id' ],
        data () {
            return {
                modal: modal,
                auth: auth,
                visible: false,
                editing: false,
                beverage: {},
                loadingData: false
            }
        },
        methods: {
            load: function (id) {
                this.loadingData = true
                this.$http
                    .get(`/api/beverages/${id}`)
                    .then(data => {
                        this.beverage = data.body
                        this.loadingData = false
                    })
                    .catch(error => modal.httpError(error))
            },
            save: function () {
                BeverageService.save(this, this.beverage, next => {
                    this.beverage = next
                    this.cancel()
                }, error => modal.httpError(error))
            },
            cancel: function () {
                this.editing = false
                if (this.id === 'new') {
                    this.$router.push({ name: 'beverages' })
                } else {
                    this.load(this.beverage.id)
                }
            },
            remove: function () {
                if (!this.beverage.id) {
                    this.visible = false
                    return
                }

                BeverageService.remove(this, this.beverage, _ => {
                    this.visible = false
                    this.$router.push({ name: 'beverages' })
                }, error => modal.httpError(error))
            }
        },
        beforeMount () {
            if (this.id === 'new') {
                this.beverage = {
                    name: undefined,
                    brewery: undefined,
                    percentage: undefined,
                    country: undefined,
                    style: undefined,
                    sscore: undefined,
                    oscore: undefined,
                    category: undefined
                }
                this.editing = true
            } else {
                this.load(this.id)
            }
        }
    }
</script>

<style>
    .top-icon {
        margin: 0 15px 0;
    }
</style>
