<template>
  <div id="app">
    <div class="calculator-container">
    <Calculator />
    </div>
  </div>
</template>

<script>
import Calculator from '@/components/Calculator.vue';

export default {
  name: 'App',
  components: {
    Calculator,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.calculator-container {
  max-width: 700px;
  margin: 0 auto;
}
</style>
