import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

import { debugDraw } from '../utils/debugs'

export class Game extends Scene {
  constructor() {
    super('Game')
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    // 맵  정의
    const map = this.make.tilemap({ key: 'dungeon' })
    const tileset = map.addTilesetImage('dungeon', 'tiles')

    map.createLayer('Ground', tileset)
    const wallsLayer = map.createLayer('Walls', tileset)

    wallsLayer.setCollisionByProperty({ collides: true })

    // 디버그
    debugDraw(wallsLayer, this)

    // 캐릭터 정의
    this.faune = this.physics.add.sprite(128, 128, 'faune', 'walk-down-3.png')
    this.faune.body.setSize(this.faune.width * 0.5, this.faune.height * 0.8)
    this.anims.create({
      key: 'faune-idle-down',
      frames: [{ key: 'faune', frame: 'walk-down-3.png' }]
    })
    this.anims.create({
      key: 'faune-idle-up',
      frames: [{ key: 'faune', frame: 'walk-up-3.png' }]
    })
    this.anims.create({
      key: 'faune-idle-side',
      frames: [{ key: 'faune', frame: 'walk-side-3.png' }]
    })

    // 움직이는 애니메이션 정의
    this.anims.create({
      key: 'faune-run-down',
      frames: this.anims.generateFrameNames('faune', {
        start: 1,
        end: 8,
        prefix: 'run-down-',
        suffix: '.png'
      }),
      repeat: -1,
      frameRate: 15
    })

    this.anims.create({
      key: 'faune-run-up',
      frames: this.anims.generateFrameNames('faune', {
        start: 1,
        end: 8,
        prefix: 'run-up-',
        suffix: '.png'
      }),
      repeat: -1,
      frameRate: 15
    })

    this.anims.create({
      key: 'faune-run-side',
      frames: this.anims.generateFrameNames('faune', {
        start: 1,
        end: 8,
        prefix: 'run-side-',
        suffix: '.png'
      }),
      repeat: -1,
      frameRate: 15
    })

    this.faune.anims.play('faune-idle-down')
    this.physics.add.collider(this.faune, wallsLayer)
    this.cameras.main.startFollow(this.faune, true)

    EventBus.emit('current-scene-ready', this)
  }

  update(t, dt) {
    if (!this.cursors || !this.faune) {
      return
    }

    const speed = 100

    if (this.cursors.left?.isDown) {
      this.faune.anims.play('faune-run-side', true)
      this.faune.setVelocity(-speed, 0)
      this.faune.scaleX = -1
      this.faune.body.offset.x = 24
    } else if (this.cursors.right?.isDown) {
      this.faune.anims.play('faune-run-side', true)
      this.faune.setVelocity(speed, 0)
      this.faune.scaleX = 1
      this.faune.body.offset.x = 8
    } else if (this.cursors.up?.isDown) {
      this.faune.anims.play('faune-run-up', true)
      this.partspartsfaune.setVelocity(0, -speed)
    } else if (this.cursors.down?.isDown) {
      this.faune.anims.play('faune-run-down', true)
      this.faune.setVelocity(0, speed)
    } else {
      const parts = this.faune.anims.currentAnim.key.split('-')
      parts[1] = 'idle'
      this.faune.anims.play(parts.join('-'))
      this.faune.setVelocity(0, 0)
    }
  }
}

