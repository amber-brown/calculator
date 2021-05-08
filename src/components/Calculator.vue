<template>
    <div class="calculator">
      <div class="calculator__display">
        <p class="calculator__display-text">{{ input }}</p>
      </div>
      <div class="calculator__buttons-wrapper">
        <div v-for="(buttonRow, index) in buttons" :key="index" class="calculator__button-row">
          <button
            v-for="button in buttonRow"
            @click="onButtonPress(button)"
            :key="button"
            class="calculator__button"
          >
              {{button}}
          </button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      buttons: [
        ['7', '8', '9', '+'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '*'],
        ['0', 'c', '=', '/'],
      ],
      input: '',
    };
  },
  methods: {
    onButtonPress(button) {
      this.input = `${this.input}${button}`;
    },
    onEquate() {
      console.log(this.input);
    },
  },
};
</script>

<style>
.calculator {
  padding: 8px;
}

.calculator__display {
  border: 1px solid grey;
  border-radius: 6px;
  margin: 6px;
  padding: 6px 12px;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.calculator__display-text {
  display: inline;
  font-size: 18px;
  margin: 0;
}

.calculator__button-row {
  display: flex;
}

.calculator__button {
  margin: 6px;
  padding: 6px;
  border-radius: 6px;
  border: none;
  outline: none;
  width: 100%;
  height: 50px;
}
</style>
