let PIXI = require('pixi.js')
let Utils = require('./utils')
let Textures = require('./textures')
let Rules = require('./rules')

export default class Piece {
  constructor(unit, color, x, y) {
    let sprite = new PIXI.Sprite(Textures[color][unit])
    sprite.color = color
    sprite.unit = unit
    sprite.anchor.set(0.5);
    [sprite.position.x, sprite.position.y] = Utils.tileToPixelPosition(x, y)
    sprite.interactive = true

    sprite.on('mousedown', this.onDragStart)
    sprite.on('mouseup', this.onDragEnd)
    sprite.on('mousemove', this.onDragMove)

    sprite.possibleMove = this.possibleMove

    return sprite
  }

  possibleMove(start, end) {
    let direction = Utils.tilePositionToCardinal([end[0] - start[0], end[1] - start[1]])
    let result
    Rules[this.color][this.unit]['moves'].forEach(function(move) {
      if (direction == move) {
        result = true
      }
    })
    return result
  }

  onDragStart(event) {
    this.data = event.data
    this.alpha = 0.5
    this.dragging = true
    let position = this.data.getLocalPosition(this.parent)
    let tilePosition = Utils.pixelToTilePosition(position.x, position.y)
    this.startPosition = tilePosition
  }

  onDragEnd() {
    this.alpha = 1
    this.dragging = false

    let position = this.data.getLocalPosition(this.parent)
    let tilePosition = Utils.pixelToTilePosition(position.x, position.y);

    if (this.possibleMove(this.startPosition, tilePosition)) {
      [this.position.x, this.position.y] = Utils.tileToPixelPosition(...tilePosition)
    } else {
      [this.position.x, this.position.y] = Utils.tileToPixelPosition(...this.startPosition)
    }
    this.data = null
    this.startPosition = null
  }

  onDragMove() {
    if (this.dragging) {
      var newPosition = this.data.getLocalPosition(this.parent)
      this.position.x = newPosition.x
      this.position.y = newPosition.y
    }
  }

}
