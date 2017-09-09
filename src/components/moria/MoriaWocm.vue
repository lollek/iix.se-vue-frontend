MoriaGeneral.vue<template>
    <div>
        <h1 class="title">Farming with Wand of Clone Monster</h1>
        <p>To farm with a wand of clone monster, you need the following:</p>
        <p>
            A wand of clone monster<br>
            A monster with good drops<br>
            (optional) A way to refresh your wand<br>
        </p>
        <p>As always in moria, things can go wrong. It would be stupid to not carry an
            escape mechanism like a scroll of teleportation.</p>

        <h3 class="title is-5">Wand of Clone Monster</h3>
        <p>
            The wand begins dropping on 750ft, and is therefore best aquired there. It’s not
            that rare though, so you will probably find a few every once in a while.
        </p>

        <h3 class="title is-5">A monster with good drops</h3>
        <p>
            <b>Gelatinous Cube</b><br>
            Starts spawning at 800ft<br>
            Drops 2-6 items<br>
            Moves erratically at half speed (basically not dangerous)<br>
            Ruins your armor on hit<br>
            Destroys items it steps on<br>
            Can merge with other cubes, which wastes your wand charges<br>
        </p>
        <p>
            <b>Guardian Naga</b><br>
            Starts spawning at 750ft<br>
            Drops 1-3 items<br>
            Moves semi-erratically at normal speed (not dangerous if you are careful)<br>
            Destroys items it steps on<br>
        </p>

        <h3 class="title is-5">A way to refresh your wand</h3>
        <p>
            Mages (and classes with mage spells) can recharge wands through spells. It’s
            also possible to buy scrolls or recharging from the shop.
        </p>

        <hr />

        <h3 class="title is-5">Farming with a wand of clone monster</h3>
        <p>
            The safest way to farm is by using pillars. Either find a appropriate pillar or
            create one with stone-to-mud. A good example is something like this
        </p>
        <div>
            <pre>
<code>
#............#
#.....@......#
#.##########.#
#............#
............##
</code>
            </pre>
        </div>
        <p>
            It is preferable to have it at least 4-5 tiles long, so you can move a little
            bit without baiting monsters. You will want to get a monster to the edge of the
            pillar, clone it, then move to the middle. This will cause one monster to follow
            you, and another to become stuck on the opposite side of the wall. Example:
        </p>
        <div>
            <pre>
<code>
Position monster  Clone it          Bait it&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
#............#    #............#    #............#
#............#    #n...........#    #....n.......#
#n##########.# -&gt; #n##########.# -&gt; #.##########.#
#.@..........#    #.@..........#    #....n@......#
............##    ............##    ............##
</code>
            </pre>
        </div>
        <p>
            Then you kill the monster and repeat. Don’t forget to recharge wands, rest and eat.
        </p>
    </div>
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'moria-general'
    }
</script>

<style>
</style>
