let Config = require('./config')

module.exports = {
  tileToPixelPosition: (x, y) => {
    return [
      (x * Config.TILE_SIZE) + (Config.TILE_SIZE / 2),
      (y * Config.TILE_SIZE) + (Config.TILE_SIZE / 2)
    ]
  },
  pixelToTilePosition: (x, y) => {
    return [
      Math.floor(x / Config.TILE_SIZE),
      Math.floor(y / Config.TILE_SIZE)
    ]
  },
  cardinalToTilePosition: (direction) => {
    let directions = {
      N: [-1, 0],
      NE: [-1, 1],
      E: [1, 0],
      SE: [1, 1],
      S: [0, 1],
      SW: [1, -1],
      W: [0, -1],
      NW: [-1, -1]
    }
    return directions[direction]
  },

  tilePositionToCardinal: (position) => {
    let directions = {
      N: [-1, 0],
      NE: [-1, 1],
      E: [1, 0],
      SE: [1, 1],
      S: [0, 1],
      SW: [1, -1],
      W: [0, -1],
      NW: [-1, -1]
    }

    for (let k in directions) {
      if (position[0] == directions[k][0] && position[1] == directions[k][1]) {
        return k
      }
    }
  }
}

