<script setup>
import { ref } from 'vue'
import PhaserGame from './game/PhaserGame.vue'

const phaserRef = ref()

//  This event is emitted from the PhaserGame component:
const currentScene = (scene) => {
  console.log(scene.scene.key)
}
</script>

<template>
  <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
</template>

