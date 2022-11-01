/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '💣',
    'I': '🎁',
    'PLAYER': '🐵',
    'BOMB_COLLISION': '💥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
  };
  
  const maps = [];
  maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
    maps.push(`
    XXXXXXXXXI
    XX----XXX-
    X--XX-XXX-
    X-XXX-----
    X-XXXXXXXX
    X----XXXXX
    XXXX-XXXXX
    XXXX-XXXXX
    XXXX---OXX
    XXXXXXXXXX
    `);
    maps.push(`
    XXX---XXXO
    XXX-X-XXX-
    X---X-XXX-
    X-XXX-----
    X-XXXXXXXX
    X--XXXXXXX
    XX-XX----X
    XX-XX-XX-X
    XX----XI-X
    XXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `)