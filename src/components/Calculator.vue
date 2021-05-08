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
import * as calculator from '@/utils/calculator';

export default {
  name: 'Calculator',
  data() {
    return {
      buttons: [
        ['7', '8', '9', '+'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '*'],
        ['c', '0', '=', '/'],
      ],
      input: '',
    };
  },
  computed: {
    tokens() {
      return calculator.tokenizer(this.input);
    },
    lastToken() {
      return this.tokens[this.tokens.length - 1];
    },
  },
  methods: {
    onButtonPress(button) {
      if (button === 'c') {
        this.input = '';
        return;
      }

      if (button === '=') {
        if (this.lastToken?.type === 'Operator') {
          this.input = this.input.slice(0, -1);
          // TODO : test
        }
        this.onEquate();
        return;
      }

      if (!this.input.length && calculator.isOperator(button)) {
        return;
      }

      if (calculator.isDigit(button) && this.lastToken?.value === '0') {
        this.input = `${this.input.slice(0, -1)}${button}`;
        return;
      }

      if (calculator.isOperator(button) && this.lastToken?.type === 'Operator') {
        this.input = `${this.input.slice(0, -1)}${button}`;
        return;
      }
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
