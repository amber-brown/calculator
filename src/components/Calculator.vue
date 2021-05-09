<template>
    <div class="calculator">
      <div class="calculator__display">
        <p
          class="calculator__display-text"
          :class="{'calculator__display-text--answer-visible': result }"
        >
          {{ input }}
        </p>
        <p class="calculator__display-text calculator__display-text-answer">{{ result }}</p>
      </div>
      <div class="calculator__buttons-wrapper">
        <div v-for="(buttonRow, index) in buttons" :key="index" class="calculator__button-row">
          <button
            v-for="button in buttonRow"
            @click="onButtonPress(button)"
            :key="button"
            class="calculator__button"
            :class="{
              'calculator__button--cancel': button === 'c',
              'calculator__button--calculate': button === '=',
              'calculator__button--operator': isButtonOperator(button),
            }"
          >
            {{ button }}
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
      result: '',
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
      if (this.result !== '') {
        if (calculator.isOperator(button)) {
          this.input = `${this.result}${button}`;
        }
        if (calculator.isDigit(button)) {
          this.input = '';
        }
        this.result = '';
      }

      if (button === 'c') {
        this.input = '';
        return;
      }

      if (button === '=') {
        if (this.lastToken?.type === 'Operator') {
          this.input = this.input.slice(0, -1);
        }
        this.calculate();
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
    calculate() {
      const reversePolishNotaion = calculator.shuntingYardAlgorithm(this.tokens);
      this.result = calculator.calculate(reversePolishNotaion);
    },
    isButtonOperator(button) {
      return calculator.isOperator(button);
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
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
}

.calculator__display-text {
  display: inline;
  font-size: 20px;
  margin: 0;
}

.calculator__display-text--answer-visible {
  font-size: 16px;
  color: grey;
}

.calculator__display-text-answer {
  font-size: 24px;
  font-weight: bold;
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

.calculator__button--cancel {
  background-color: rgb(184, 78, 78);
}

.calculator__button--calculate {
  background-color: rgb(126, 172, 126)
}

.calculator__button--operator {
  background-color: rgb(168, 167, 167);
}
</style>
