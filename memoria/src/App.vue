<template>
  <div id="app" class="game">
    <h1 class="title">Jogo da Memória do Omar</h1>
    <div v-if="memory.isFinished" class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__content">
        <p class="modal__title">Parabéns!</p>
        <img
          width="500"
          height="380"
          alt="Bob Esponja Celebrando"
          class="modal__image"
          src="https://i.giphy.com/media/nDSlfqf0gn5g4/giphy.webp"
        />
        <button @click="start" class="button">Jogar novamente</button>
      </div>
    </div>

    <section class="board">
      <div
        @click="flip(index)"
        v-for="(card, index) in memory.board"
        :key="card.$key"
        :class="{
               card: card.state === 'initial',
               'card--flipped': card.state === 'flipped',
               'card--match': card.state === 'match'
            }"
        :style="{ 'background-position': card.position }"
      ></div>
    </section>
  </div>
</template>

<script type="ts">
import Vue from 'vue';
import SpongeBobCharset from './charset/SpongeBobCharset';
import MemoryGame from './modules/MemoryGame';

export default Vue.extend({
  created() {
    this.start();
  },
  data() {
    return {
      memory: {},
    };
  },
  methods: {
    start() {
      this.memory = new MemoryGame(
        SpongeBobCharset.characters.sort(() => Math.random() - Math.random()).slice(0, 4),
      );
    },
    flip(index) {
      this.memory.flip(index);
    },
  },
});
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
:root {
  --spongebob-charset-url: url("https://i.ibb.co/L94KbM7/spongebob-charset.jpg");
}
html,
body {
  margin: 0;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}
.title {
  position: relative;
  z-index: 2;
  color: #fff;
  font-size: 2.2em;
  text-shadow: 0px 0px 3px #0093e9;
}
.game {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  padding: 100px 0;
  background-image: url("https://image.winudf.com/v2/image1/Y29tLmhnLmJmYmJfc2NyZWVuXzBfMTYxNjAyMTg1NV8wMDM/screen-0.jpg?fakeurl=1&type=.jpg");
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
}
.game::after {
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  opacity: 0.85;
  background-color: #0093e9;
  background-image: linear-gradient(0deg, #0093e9 0%, #80d0c7 60%);
  position: absolute;
}

.board {
  margin-top: 50px;
  display: grid;
  grid-template-rows: repeat(4, 150px);
  grid-template-columns: repeat(2, 150px);
  gap: 15px;
  z-index: 2;
}
@media (min-width: 768px) {
  .board {
    grid-template-columns: repeat(4, 150px);
    grid-template-rows: repeat(2, 150px);
  }
}
.card,
.card--flipped,
.card--match {
  position: relative;
  background-image: var(--spongebob-charset-url);
  width: 150px;
  height: 150px;
  background-size: calc(300% + 15px);
  border-radius: 8px;
  box-shadow: 0 0 5px #0074b8;
  overflow: hidden;
}
.card {
  cursor: pointer;
}
.card::after {
  content: "";
  position: absolute;
  z-index: 3;
  background-image: url("https://i.pinimg.com/736x/44/83/70/448370d8b3549c61e7110a365c71ebcb.jpg");
  left: 0;
  width: 100%;
  height: 100%;
}
.modal {
  position: fixed;
  z-index: 3;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
}

.modal__content {
  z-index: 2;
  position: relative;
  padding: 15px;
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 40px);
}

.modal__title {
  font-size: 30px;
  margin: 10px 0;
  font-weight: 600;
}
.modal__image {
  margin-bottom: 10px;
  max-width: 100%;
  height: auto;
}

.button {
  color: #2c3e50;
  background: none;
  border: solid 1px #2c3e50;
  border-radius: 2em;
  font: inherit;
  padding: 0.75em 2em;
  cursor: pointer;
}
</style>
