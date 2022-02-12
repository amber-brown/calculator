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
        <div class="calculator__button-row">
          <button @click="onNumberPress(7)" class="calculator__button">7</button>
          <button @click="onNumberPress(8)" class="calculator__button">8</button>
          <button @click="onNumberPress(9)" class="calculator__button">9</button>
          <button
            @click="onOperatorPress('+')"
            class="calculator__button calculator__button--operator">
            +
        </button>
        </div>
        <div class="calculator__button-row">
          <button @click="onNumberPress(4)" class="calculator__button">4</button>
          <button @click="onNumberPress(5)" class="calculator__button">5</button>
          <button @click="onNumberPress(6)" class="calculator__button">6</button>
          <button
            @click="onOperatorPress('-')"
            class="calculator__button calculator__button--operator">
            -
          </button>
        </div>
        <div class="calculator__button-row">
          <button @click="onNumberPress(1)" class="calculator__button">1</button>
          <button @click="onNumberPress(2)" class="calculator__button">2</button>
          <button @click="onNumberPress(3)" class="calculator__button">3</button>
          <button
            @click="onOperatorPress('*')"
            class="calculator__button calculator__button--operator">
            *
          </button>
        </div>
        <div class="calculator__button-row">
          <button
            @click="onCancel()"
            class="calculator__button calculator__button--cancel">
            c
          </button>
          <button @click="onNumberPress(0)" class="calculator__button">0</button>
          <button
            @click="onCalculate()"
            class="calculator__button calculator__button--calculate">
            =
          </button>
          <button
            @click="onOperatorPress('/')"
            class="calculator__button calculator__button--operator" >
            /
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
    onCancel() {
      this.input = '';
      this.result = '';
    },
    onNumberPress(button) {
      if (this.result !== '') {
        this.onCancel();
      }

      if (this.lastToken?.value === '0') {
        this.input = `${this.input.slice(0, -1)}${button}`;
        return;
      }

      this.input = `${this.input}${button}`;
    },
    onOperatorPress(button) {
      if (this.result !== '') {
        this.input = `${this.result}${button}`;
        this.result = '';
      }

      if (!this.input.length) {
        return;
      }

      if (this.lastToken?.type === 'Operator') {
        this.input = `${this.input.slice(0, -1)}${button}`;
        return;
      }
      this.input = `${this.input}${button}`;
    },
    onCalculate() {
      if (this.lastToken?.type === 'Operator') {
        this.input = this.input.slice(0, -1);
      }

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
