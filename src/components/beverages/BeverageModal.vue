<template>
    <div class="modal" :class="{ 'is-active': visible }">
        <div class="modal-background" @click="hide()"></div>
        <div class="modal-content">
            <div class="box">
                <div>
                    <div class="field">
                        <div class="label">Name</div>
                        {{ beverage.name }}
                    </div>
                    <div class="field">
                        <div class="label">Brewery</div>
                        {{ beverage.brewery }}
                    </div>
                    <div class="field">
                        <div class="label">Percentage</div>
                        {{ beverage.percentage }}
                    </div>
                    <div class="field">
                        <div class="label">Country</div>
                        {{ beverage.country }}
                    </div>
                    <div class="field">
                        <div class="label">Style</div>
                        {{ beverage.style }}
                    </div>
                    <div class="field">
                        <div class="label">S Score</div>
                        {{ beverage.sscore }}
                    </div>
                    <div class="field">
                        <div class="label">O Score</div>
                        {{ beverage.oscore }}
                    </div>
                </div>
            </div>
        </div>
        <button class="modal-close is-large" @click="hide()"></button>
    </div>
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'beverage-modal',
        data () {
            return {
                visible: false,
                isEditing: false,
                beverage: {
                    name: undefined,
                    brewery: undefined,
                    percentage: undefined,
                    country: undefined,
                    style: undefined,
                    sscore: undefined,
                    oscore: undefined
                },
                show: function (beverage) {
                    this.beverage = beverage
                    this.visible = true
                },
                hide: function () {
                    this.visible = false
                }
            }
        }
    }
</script>

<style>
</style>
