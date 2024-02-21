import { Scene } from 'phaser'

export class Preloader extends Scene {
  constructor() {
    super('Preloader')
  }

  preload() {
    this.load.setPath('assets/dungeon/')
    this.load.image('tiles', 'tiles/dungeon_tiles.png')
    this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon-01.json')

    this.load.atlas('faune', 'character/fauna.png', 'character/fauna.json')
  }

  create() {
    this.scene.start('Game')
  }
}

