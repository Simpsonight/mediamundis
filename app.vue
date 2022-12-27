<script setup>
useHead({
  title: 'Simon Kemmerling',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'Simon Kemmerling. Full Stack Developer and Consultant.' }
  ],
  bodyAttrs: {
    class: 'app-view'
  }
})
</script>

<template>
  <div id="app">
    <Intro />
  </div>
</template>

<style>
.app-view {
  background: #fff url(~/assets/img/muster_bg4.gif) top left;
}

img {max-width: 100%;}

#app {
  height: 160px;
  background: #fff;
  text-align: left;
  padding: 140px 20px 0 20px;
}

</style>
