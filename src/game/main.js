import Phaser from 'phaser'

import { Game } from './scenes/Game.js'
import { Preloader } from './scenes/Preloader.js'

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 250,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: [Preloader, Game],
  scale: {
    zoom: 2
  }
}

const StartGame = (parent) => {
  return new Phaser.Game({ ...config, parent: parent })
}

export default StartGame

