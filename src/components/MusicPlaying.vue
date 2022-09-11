<script lang="ts" setup></script>

<template>
  <div class="overlay-box">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
</template>

<style scoped>
.overlay-box {
  display: flex;
  align-items: center;
  width: 23px;
}
.bar {
  width: 2px;
  height: 10px;
  background: linear-gradient(to bottom, #ed634a, #b8c1d3, #8165c9);
  margin: 1px;
  border-radius: 6px;
  animation: bar 1400ms infinite;
}

.bar:nth-child(1),
.bar:nth-child(5) {
  animation-delay: 200ms;
}
.bar:nth-child(2) {
  animation-delay: 700ms;
}
.bar:nth-child(3) {
  animation-delay: 400ms;
}

@keyframes bar {
  0% {
    height: 10px;
  }
  50% {
    height: 15px;
  }
  100% {
    height: 10px;
  }
}
</style>
