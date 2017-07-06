let PIXI = require('pixi.js')
let Config = require('./config')
import Piece from './piece'

let renderer = PIXI.autoDetectRenderer(
  Config.BOARD_WIDTH * Config.TILE_SIZE,
  Config.BOARD_HEIGHT * Config.TILE_SIZE,
  {
    antialias: true,
    autoResize: true,
    resolution: window.devicePixelRatio
  }
)

renderer.view.style.position = 'absolute'
renderer.view.style.top = '0px'
renderer.view.style.left = '0px'

let stage = new PIXI.Container()
stage.interactive = true


function drawBoard () {
  let boardGraphics = new PIXI.Graphics()

  for (let i = 0; i < Config.BOARD_WIDTH; ++i) {
    for (let j = 0; j < Config.BOARD_HEIGHT; ++j) {
      if (i % 2 == 0 && j % 2 == 0) {
        boardGraphics.beginFill(0xFFFFFF)
      } else if (i % 2 != 0 && j % 2 == 0) {
        boardGraphics.beginFill(0x999999)
      } else if (i % 2 != 0 && j % 2 != 0) {
        boardGraphics.beginFill(0xFFFFFF)
      } else {
        boardGraphics.beginFill(0x999999)
      }

      boardGraphics.drawRect(
        i * Config.TILE_SIZE,
        j * Config.TILE_SIZE,
        Config.TILE_SIZE,
        Config.TILE_SIZE
      )
    }
  }
  stage.addChild(boardGraphics)
}

function placePieces() {
  let pieces = []
  pieces.push(new Piece('rook', 'black', 0, 0))
  pieces.push(new Piece('knight', 'black', 1, 0))
  pieces.push(new Piece('bishop', 'black', 2, 0))
  pieces.push(new Piece('king', 'black', 3, 0))
  pieces.push(new Piece('queen', 'black', 4, 0))
  pieces.push(new Piece('bishop', 'black', 5, 0))
  pieces.push(new Piece('knight', 'black', 6, 0))
  pieces.push(new Piece('rook', 'black', 7, 0))
  pieces.push(new Piece('pawn', 'black', 0, 1))
  pieces.push(new Piece('pawn', 'black', 1, 1))
  pieces.push(new Piece('pawn', 'black', 2, 1))
  pieces.push(new Piece('pawn', 'black', 3, 1))
  pieces.push(new Piece('pawn', 'black', 4, 1))
  pieces.push(new Piece('pawn', 'black', 5, 1))
  pieces.push(new Piece('pawn', 'black', 6, 1))
  pieces.push(new Piece('pawn', 'black', 7, 1))

  pieces.forEach(function(piece) {
    stage.addChild(piece)
  })
}

function animate() {
  renderer.render(stage)
  window.requestAnimationFrame(animate)
}

drawBoard()
placePieces()
document.body.appendChild(renderer.view)
animate()
