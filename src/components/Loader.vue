<template>
    <div class="loader">
  <div class="symbol">
    <div class="symbol__triangle"></div>
  </div>
  <div class="symbol">
    <div class="symbol__circle"></div>
  </div>
  <div class="symbol">
    <div class="symbol__cross"></div>
  </div>
  <div class="symbol">
    <div class="symbol__square"></div>
  </div>
</div>
</template>

<script>
export default {
    data () {
        return {}
    }
}
</script>

<style scoped>

.loader {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.symbol {
  margin: 0 5px;
  transform: scale(0, 0) rotate(180deg);
  -webkit-animation: loading 2s ease infinite;
          animation: loading 2s ease infinite;
}
.symbol:nth-child(2) {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
}
.symbol:nth-child(3) {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
}
.symbol:nth-child(4) {
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s;
}
.symbol__triangle {
  position: relative;
  width: 0;
  border-bottom: solid 41.6px #40e2a0;
  border-right: solid 24px transparent;
  border-left: solid 24px transparent;
}
.symbol__triangle::after {
  content: "";
  position: absolute;
  top: 14px;
  left: -12px;
  width: 0;
  border-bottom: solid 20.8px #A1ACB4;
  border-right: solid 12px transparent;
  border-left: solid 12px transparent;
}
.symbol__circle {
  height: 25px;
  width: 25px;
  border-width: 8px;
  border-color: #ff6666;
  border-style: solid;
  border-radius: 50%;
}
.symbol__cross {
  background: #7cb2e8;
  height: 48px;
  position: relative;
  width: 8px;
  margin: 0 22px;
  transform: rotate(45deg);
}
.symbol__cross:after {
  content: "";
  background: #7cb2e8;
  height: 8px;
  left: -20px;
  position: absolute;
  top: 20px;
  width: 48px;
}
.symbol__square {
  height: 25px;
  width: 25px;
  border-width: 8px;
  border-color: #ff69f8;
  border-style: solid;
}

@-webkit-keyframes loading {
  0% {
    transform: scale(0, 0) rotateZ(-90deg);
    opacity: 0;
  }
  30% {
    transform: scale(1, 1) rotateZ(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1, 1) rotateZ(0deg);
    opacity: 1;
  }
  80% {
    transform: scale(0, 0) rotateZ(90deg);
    opacity: 0;
  }
}

@keyframes loading {
  0% {
    transform: scale(0, 0) rotateZ(-90deg);
    opacity: 0;
  }
  30% {
    transform: scale(1, 1) rotateZ(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1, 1) rotateZ(0deg);
    opacity: 1;
  }
  80% {
    transform: scale(0, 0) rotateZ(90deg);
    opacity: 0;
  }
}

</style>