<template>
    <div>
        <h1 class="title">Guide to Moria Adventuring</h1>
        <h3 class="subtitle">(or How To Slay Your Balrog)</h3>
        <p>
            The information on this page comes from Beej's moria page, 30 minutes of UMoria,
            investigating the source code, and simply playing the game.
            If there's something you want to know that I don't mention, it's likely
            mentioned in one of the links.
        </p>
        <h2 class="title is-4">Links</h2>
        <p>
            <a href="https://beej.us/moria/">Beej's Moria Page</a><br>
            <a href="https://www.youtube.com/user/30minutesofUMoria/videos?sort=da&view=0&flow=grid">30 minutes of UMoria (walkthrough)</a><br>
            <a href="https://packages.debian.org/stable/moria">Debian moria package</a><br>
            <a href="https://www.beej.us/moria/mmspoilers/index.html">The Moria Spoilers (data sheets)</a><br>
        </p>
        <h2>Table of Content</h2>
        <p>
            <router-link :to="{ name: 'moria-general' }">General Tips</router-link><br>
            <router-link :to="{ name: 'moria-wocm' }">Farming with a wand of clone monster</router-link><br>
            <router-link :to="{ name: 'moria-mage' }">Winning Moria with a Mage</router-link><br>
        </p>
    </div>
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'moria'
    }
</script>

<style>
</style>
