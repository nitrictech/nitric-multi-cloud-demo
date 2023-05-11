//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
  global: true,
  fullscreen: true,
  scale: 1.4,
  debug: true,
  clearColor: [0, 0, 1, 1],
})

// Speeds
const MOVE_SPEED = 120
const SLICER_SPEED = 100
const STALFOS_SPEED = 60

// Game Logic
loadRoot('sprites/')
loadSprite('link', 'link.png', {
  sliceX: 3,
  sliceY: 4,
  anims: {
    idled: {
      from: 0,
      to: 0
    },
    rund: {
      from: 0,
      to: 2, 
      loop: true,
    },
    idlel: {
      from: 4,
      to: 4
    },
    runl:  {
      from: 3,
      to: 5,
      loop: true,
    },
    idler: {
      from: 7,
      to: 7
    },
    runr: {
      from: 6,
      to: 8,
      loop: true,
    },
    idleu: {
      from: 10,
      to: 10
    },
    runu: {
      from: 9,
      to: 11,
      loop: true,
    }
  },
})
loadSprite('left-wall', 'left-wall.png')
loadSprite('top-wall', 'top-wall.png')
loadSprite('bottom-wall', 'bottom-wall.png')
loadSprite('right-wall', 'right-wall.png')
loadSprite('bottom-left-wall', 'bottom-left-wall.png')
loadSprite('bottom-right-wall', 'bottom-right-wall.png')
loadSprite('top-left-wall', 'top-left-wall.png')
loadSprite('top-right-wall', 'top-right-wall.jpg')
loadSprite('top-door', 'top-door.png')
loadSprite('bottom-door', 'bottom-door.png')
loadSprite('fire-pot', 'fire-pot.png')
loadSprite('left-door', 'left-door.png')
loadSprite('right-door', 'right-door.png')
loadSprite('lanterns', 'lanterns.png')
loadSprite('slicer', 'slicer.png')
loadSprite('stalfos', 'stalfos.png', {
  sliceX: 1,
  sliceY: 2,
  anims: {
    moving: {
      from: 0,
      to: 1,
      loop: true,
      // animSpeed: 1,
    }
  },
})
loadSprite('kaboom', 'kaboom.png')
loadSprite('sword-up', 'sword-up.png')
loadSprite('sword-down', 'sword-down.png')
loadSprite('sword-left', 'sword-left.png')
loadSprite('sword-right', 'sword-right.png')
loadSprite('stairs', 'stairs.png')
loadSprite('bg', 'bg.png')
loadSprite('title', 'title.png')

scene('game', async ({ enter }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  enter = enter || 'left';

  const response = await fetch(`/room?enter=${enter}`);

  // get the cloud header and add a powered by message

  const cloud = response.headers.get('cloud');

  const map = await response.json();

  on("add", "stalfos", (s, b) => {
    s.play("moving");
  });

  const levelCfg = {
    width: 48,
    height: 48,
    a: [sprite('left-wall'), solid(), 'enemy-block'],
    b: [sprite('right-wall'), solid(), 'enemy-b1lock'],
    c: [sprite('top-wall'), solid(), 'enemy-block'],
    d: [sprite('bottom-wall'), solid(), 'enemy-block'],
    w: [sprite('top-right-wall'), solid(), 'enemy-block'],
    x: [sprite('bottom-left-wall'), solid(), 'enemy-block'],
    y: [sprite('top-left-wall'), solid(), 'enemy-block'],
    z: [sprite('bottom-right-wall'), solid(), 'wall'],
    '<': [sprite('left-door'), {enter: 'right'}, 'enemy-block', 'next-level'],
    '>': [sprite('right-door'), {enter: 'left'}, 'enemy-block', 'next-level'],
    '^': [sprite('top-door'), {enter: 'bottom'}, 'enemy-block', 'next-level'],
    v: [sprite('bottom-door'), {enter: 'top'}, 'enemy-block', 'next-level'],
    $: [sprite('stairs'), 'next-level'],
    '*': [sprite('slicer'), 'slicer', 'enemy-block', { dir: -1 }, 'dangerous'],
    '}': [sprite('stalfos'), 'enemy-block', 'dangerous', 'stalfos', { animSpeed: 0.5, dir: -1, timer: 0 }],
    ')': [sprite('lanterns'), solid()],
    '(': [sprite('fire-pot'), solid(), 'enemy-block'],
    '$': [rect(1,1), 'next-level']
  }
  addLevel(map, levelCfg)

  add([sprite('bg'), layer('bg')])

  add([text(`powered by ${cloud}`), pos(100,485), scale(2)])

  const StaringPositions = {
    left: pos(5, 190),
    right: pos(400, 190),
    top: pos(190, 5),
    bottom: pos(190, 400),
  }

  const player = add([
    sprite('link'),
    
    StaringPositions[enter],
    {
      // right by default
      dir: vec2(1, 0),
    },
  ])

  player.play('idler');

  player.action(() => {
    player.resolve()
  })

  player.overlaps('next-level', (s) => {
    go('game', { enter: s.enter })
  })

  keyDown('left', () => {
    ["runu", "rund", "runl"].includes(player.curAnim()) || player.play('runl');
    player.move(-MOVE_SPEED, 0)
    player.dir = vec2(-1, 0)
  })

  keyRelease('left', () => {
    player.play('idlel');
  })

  keyDown('right', () => {
    ["runu", "rund", "runr"].includes(player.curAnim()) || player.play('runr');
    player.move(MOVE_SPEED, 0)
    player.dir = vec2(1, 0)
  })

  keyRelease('right', () => {
    player.play('idler');
  })

  keyDown('up', () => {
    ["runu", "runl", "runr"].includes(player.curAnim()) || player.play('runu');
    player.move(0, -MOVE_SPEED)
    player.dir = vec2(0, -1)
  })

  keyRelease('up', () => {
    player.play('idleu');
  })

  keyDown('down', () => {
    ["rund", "runl", "runr"].includes(player.curAnim()) || player.play('rund');
    player.move(0, MOVE_SPEED)
    player.dir = vec2(0, 1)
  })

  keyRelease('down', () => {
    player.play('idled');
  })

  function spawnSword(p) {
    let s = sprite('sword-right');

    if (player.curAnim().endsWith('d')) {
      s = sprite('sword-down')
    } else if (player.curAnim().endsWith('u')) {
      s = sprite('sword-up')
    } else if (player.curAnim().endsWith('l')) {
      s = sprite('sword-left')
    }

    const obj = add([s, pos(p), 'sword'])

    wait(0.2, () => {
      destroy(obj)
    })
  }

  keyPress('space', () => {
    spawnSword(player.pos.add(player.dir.scale(48)))
  })

  // player.collides('door', (d) => {
  //   destroy(d)
  // })

  collides('sword', 'stalfos', (k,s) => {
    camShake(4)
    wait(1, () => {
      destroy(k)
    })
    destroy(s)
  })

  action('slicer', (s) => {
    s.move(s.dir * SLICER_SPEED, 0)
  })

  collides('slicer', 'enemy-block', (s) => {
    s.dir = -s.dir
  })

  action('stalfos', (s) => {
    s.move(0, s.dir * STALFOS_SPEED)
    s.timer -= dt()
    if (s.timer <= 0) {
      s.dir = -s.dir
      s.timer = rand(5)
    }
  })

  collides('stalfos', 'enemy-block', (s) => {
    s.dir = -s.dir
  })

  player.overlaps('dangerous', () => {
    go('lose', {  })
  })
})

scene('title', () => {
  layers(['bg', 'obj', 'ui'], 'obj')

  add([sprite('title'), layer('bg')])

  add([text('The Legend of Pulumi \n\nPulumipus\' Adventure \n\n(Press \"space\" to play)', 32), origin('center'), pos(width() / 2, height() / 2)])

  keyPress('space', () => {
    go('game', { })
  })
})

scene('lose', ({ score }) => {
  keyPress('space', () => {
    go('game', { })
  })

  add([text('You died!!!\n press space to restart', 32), origin('center'), pos(width() / 2, height() / 2)])
})

start('title', { })