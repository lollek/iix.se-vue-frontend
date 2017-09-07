<template>
    <div class="modal" :class="{ 'is-active': visible }">
        <div class="modal-background" @click="hide()"></div>
        <div class="modal-content">
            <div class="box">
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
                            <textarea class="textarea" v-model="beverage.comment"></textarea>
                        </div>
                        <p v-if="!editing">
                            {{ beverage.comment }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <button class="modal-close is-large" @click="hide()"></button>
    </div>
</template>

<script>
    import auth from '../../services/auth.js'
    import modal from '../../services/modal.js'
    import BeverageService from './BeverageService'

    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'beverage-modal',
        data () {
            return {
                auth: auth,
                visible: false,
                editing: false,
                beverage: {},
                backup: undefined,
                show: function (beverage) {
                    this.beverage = beverage
                    this.backup = Object.assign({}, beverage)
                    this.editing = false
                    this.visible = true
                },
                hide: function () {
                    this.visible = false
                },
                save: function () {
                    BeverageService.save(this, this.beverage, next => {
                        this.beverage = next
                        this.backup = Object.assign({}, this.beverage)
                        this.editing = false
                    }, error => modal.httpError(error))
                },
                cancel: function () {
                    this.editing = false
                    this.beverage = this.backup
                },
                remove: function () {
                    BeverageService.remove(this, this.beverage, _ => {
                        this.visible = false
                    }, error => modal.httpError(error))
                }
            }
        }
    }
</script>

<style>
    .top-icon {
        margin: 0 15px 0;
    }
</style>
