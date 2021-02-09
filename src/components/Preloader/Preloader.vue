<template lang="pug">
  div.preloader
    img(:src="require('@/assets/img/preloader.gif')")
</template>

<script>
export default {
name: "Preloader"
}
</script>

<style lang="sass">
.preloader
  width: 100vw
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
</style>
