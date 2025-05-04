<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
     <form/>
  </div>
</template>

<script>
import prof from './components/prof.vue'
import form from './components/formulaire.vue'

export default {
  name: 'App',
  components: {
    prof,
    form
  }
}
</script>

<style>
#app {
 
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>