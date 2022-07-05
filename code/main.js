
import kaboom from "kaboom"

// initialize context
var main_init = kaboom({
  font: 'apl386',
  background: [52, 47, 145],
})

// Load a sprite "bean' from an image
loadBean()
loadSprite("testbg", "sprites/testbg.png");
loadSound("failiure", "sounds/failiure.mp3");
loadSound("oof", "sounds/oof.mp3");
loadSprite("chicken", "sprites/chicken.png");
loadSprite("new_bean", "sprites/new_bean.png");

let score = 0;
let level = 1;
let fake_hits = 0
let FLOOR_HEIGHT = 48;
let JUMP_FORCE = 48;
let SPEED = 240;

var show_score = true;

// Complete game loop
scene("game", () => {
  add([
    sprite("testbg", { width: width(), height: height() })
  ])

  /* add([
    origin("center"),
    sprite("sun"),
    pos(center())
  ]); */

  // CONFIGURE
  if (show_score == true) {
    score = 0
  }
  
  // Hit label
  let hit_label = add([
    text("Hits: " + fake_hits + " Score: " + score), {
      width: width(),
      size: 20,
      font: 'apl386',
    },
    area(),
    'hit_lbl',
  ])

  onClick("hit_lbl", () => {
    go("menu")
  })

  // increment score every frame
  onUpdate(() => {
    score++;
    hit_label.text = "H:" + fake_hits + " S:" + score + " L:" + level

    // Increase speed
    if (score == 3000) {
      SPEED += 20;
      level++;
    }
    else if (score == 6000) {
      SPEED += 20;
      level++;
    }
    else if (score == 9000) {
      SPEED += 20;
      level++;
    }
    else if (score == 12000) {
      SPEED += 20;
      level++;
    }
    else if (score == 15000) {
      SPEED += 20;
      level++;
    }
    else if (score == 18000) {
      SPEED += 20;
      level++;
    }
    else if (score == 23000) {
      SPEED += 20;
      level++;
    }
    else if (score == 26000) {
      SPEED += 20;
      level++;
    }
    else if (score == 29000) {
      SPEED += 20;
      level++;
    }
    else if (score == 31000) {
      SPEED += 20;
      level++;
    }
    else if (score == 34000) {
      SPEED += 20;
      level++;
    }
    else if (score == 37000) {
      SPEED += 20;
      level++;
    } else if (score == 40000) {
      SPEED += 20;
      level++;
    } else if (score == 43000) {
      SPEED += 20;
      level++;
    } else if (score == 46000) {
      SPEED += 20;
      level++;
    } else if (score == 49000) {
      SPEED += 20;
      level++;
    } else if (score == 52000) {
      SPEED += 20;
      level++;
    } else if (score == 56000) {
      SPEED += 20;
      level++;
    }

  });

  // putting together our player character
  const bean = add([
    sprite("new_bean"), // render the bean sprite in loadSprite()
    pos(80, 40), // sets position
    area(), // adds a colider area
    body(), // enable gravity
    outline(4),
  ])

  // .jump() when "space" key is pressed and is on groud
  onKeyPress("space", () => { // like cframe.bind("<Space>", self.jump)
    if (bean.isGrounded()) {
      bean.jump()
    }
  })

  onTouchStart(() => {
    if (bean.isGrounded()) {
      bean.jump()
    }
  })

  onKeyPress("b", () => {
    burp()
  })

  onKeyPress("k", () => {
    addKaboom(bean.pos)
  })

  // add platform
  add([
    outline(4),
    rect(width(), 48), // renders a TRIANGLE takes width and height
    pos(0, height() - 48), // position, x=0, y=height() = 48 or right-bottom
    area(), // adds colider
    solid(), // makes it impossible for other things to pass
    color(131, 79, 194), // rgb color, a purple i selected
  ])

  // Check for collision
  bean.onCollide("tree", () => {
    addKaboom(bean.pos); // Add kaboom effect to beans current position
    shake();
    play('oof');
    fake_hits = fake_hits + 1;
    hit_label.text = "H:" + fake_hits + " S:" + score + " L:" + level
    //"Hits: " + fake_hits + " Score: " + score
    if (fake_hits >= 9) {
      burp();
      addKaboom(bean.pos)
      go("loose");
    }
  })

  // Colide with food
  bean.onCollide("food", (food) => {
    burp();
    if (fake_hits == 0) { }
    else { fake_hits = fake_hits - 1; }
    destroy(food)
  })

  // Spawn trees
  function spawnTree() {

    // 1 in 12 chance
    var random_num = Math.floor(Math.random() * 20);
    console.log(random_num)
      ;
    if (random_num == 0) {
      let food = add([
        sprite("chicken"),
        area(),
        pos(width(), height() - 48),
        origin("botleft"),
        move(LEFT, SPEED),
        "food"
      ])
    } else {
      add([
        rect(rand(36, 48), rand(24, 64)),
        area(),
        pos(width(), height() - 48),
        origin("botleft"),
        //color(194, 121, 79),
        color(rand(0, 255), rand(0, 255), rand(0, 255)),
        move(LEFT, SPEED),
        outline(4),
        "tree", // add a tag here
      ])
    }

    wait(rand(0.9, 1.7), () => {
      spawnTree();
    })

  }
  spawnTree();
})

// Menu scene
scene("menu", () => {
  add([
    text("The Bean - Menu"),
    origin("center"),
    pos(width()/2, 80)
  ])
  
  /* Continue game*/
  add([
    cont = text("Continue game"),
    pos(center()),
    origin("center"),
    area(),
    color(61, 255, 135),
    "continue_btn"
  ]);

  onClick("continue_btn", () => {
    show_score = false
    go("game")
  })

  // Restart game
  add([
    text("\nRestart game"),
    pos(center()),
    origin("top"),
    area(),
    color(255, 61, 110),
    "restart_btn"
  ]);

  onClick("restart_btn", () => {
    show_score = true
    fake_hits = 0
    go("game")
  })

})

// Loose scene
scene("loose", () => {
  play("failiure")
  add([
    text("What a failure!\nScore: " + score),
    color(255, 174, 168),
    pos(center()),
    origin("center"),
  ]);

  main_init.color(255, 174, 168)

  // click key to continue
  onKeyPress(() => {
    show_score = true
    fake_hits = 0
    go("game")
  })
  onTouchStart(() => {
    show_score = true
    fake_hits = 0
    go("game")
  })

})

go("game")