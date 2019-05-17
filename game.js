console.log('wow our game is cool');

//Warn that the british are coming
function yell() {
  alert("the british are coming");
}

//size of paddles
const vertical_length = 120;
const horizontal_length = 20;

//paddle starting position in % distance from top
const starting_position = 50;

//size of ball
const radius = 30

//keys for player 1 w, s
const upcode = 87;
const downcode = 83;

//keys for player 2 up, down arrows
const upcode_two = 38;
const downcode_two = 40;

const NUMBER_OF_BALLS = 1;

var key_pressed = {};
window.onkeyup = function(event) { key_pressed[event.keyCode] = false; }
window.onkeydown = function(event) { key_pressed[event.keyCode] = true; }

//Class of Paddle which is rectangle on each side of the screen
class Paddle {

  //Initialize a new Paddle
    //vertical_length and horizontal_length are the dimensions of new paddle
    //initial position is the percentage of total distance the paddle is from the top
  constructor(player_id, vertical_length, horizontal_length, position) {
    this.player_id = player_id;
    this.vertical_length = vertical_length;
    this.horizontal_length = horizontal_length;
    this.position = position;
  }

  move(percentage_move) {
    this.position = this.position - percentage_move;
  }

  render() {
    //access html element of the paddle and update everything to be this object
    var paddle = document.querySelector(".paddle[data-player='" + this.player_id + "']");
    paddle.style.background = "white";
    paddle.style.top = this.position + "%";
    paddle.style.height = this.vertical_length;
    paddle.style.width = this.horizontal_length;

    return paddle;
  }
}

//Class of ball bouncing around
class Ball {

  constructor(ball_id, top, left, radius, left_speed, top_speed) {
    this.ball_id = ball_id;
    this.top = top;
    this.left = left;
    this.radius = radius;
    this.left_speed = left_speed;
    this.top_speed = top_speed;
    this.height = radius*2;
    this.width = radius*2;
    this.bounce_acceleration_multiplier = Math.log(Math.E + 1);

    var node = document.createElement("div");
    node.classList.add("ball", "animated", "flip");
    node.setAttribute("data-ball", this.ball_id);
    document.body.appendChild(node);
  }

  move() {
    this.left = this.left - this.left_speed;
    this.top = this.top - this.top_speed;
  }

  render() {
    var ball = document.querySelector(".ball[data-ball='" + this.ball_id + "']");

    var elements_at_left_position = document.elementsFromPoint(
      ball.getBoundingClientRect().x,
      ball.getBoundingClientRect().y + (1/2)*ball.getBoundingClientRect().height
    ).filter(function (e) { return e.classList.contains("paddle") });

    var elements_at_right_position = document.elementsFromPoint(
      ball.getBoundingClientRect().x + ball.getBoundingClientRect().width,
      ball.getBoundingClientRect().y + (1/2)*ball.getBoundingClientRect().height
    ).filter(function (e) { return e.classList.contains("paddle") });

    if (elements_at_left_position.length >= 1 || elements_at_right_position.length >= 1) {
      console.log('collision!');
      this.left_speed = 0 - this.left_speed;
      this.left_speed *= this.bounce_acceleration_multiplier;
    }

    if (ball.getBoundingClientRect().top < 0 || ball.getBoundingClientRect().top > window.innerHeight - this.height) {
      this.top_speed = - this.top_speed;
    }

    if (ball.getBoundingClientRect().left < 0) {
      this.left = 30 + Math.random() * 50 << 0;
      this.top = 30 + Math.random() * 50 << 0;
      this.left_speed = 0.3;
      this.top_speed = 0.3;

      console.log("player 2 scored");
      var score_card = document.querySelector(".score[data-player='2']");
      score_card.innerText = parseInt(score_card.innerText) + 1;
    }

    if (ball.getBoundingClientRect().right > window.innerWidth) {
      this.left = 30 + Math.random() * 50 << 0;
      this.top = 30 + Math.random() * 50 << 0;
      this.left_speed = 0.3;
      this.top_speed = 0.3;

      console.log("player 1 scored");
      var score_card = document.querySelector(".score[data-player='1']");
      score_card.innerText = parseInt(score_card.innerText) + 1;
    }

    this.move();

    ball.style.background = "blue";
    ball.style.top = this.top + "%";
    ball.style.left = this.left + "%";
    ball.style.borderRadius = this.radius + "px";
    ball.style.height = this.height;
    ball.style.width = this.width;
  }
}


//function to handle pressing of up/down keys
function handle_key_press() {
  if(key_pressed[upcode]) {
    player_one_paddle.move(2);
  }

  if(key_pressed[downcode]) {
    player_one_paddle.move(-2);
  }

  if(key_pressed[upcode_two]) {
    player_two_paddle.move(2);
  }

  if(key_pressed[downcode_two]) {
    player_two_paddle.move(-2);
  }
}

var player_one_paddle = new Paddle(1, vertical_length, horizontal_length, starting_position);
var player_two_paddle = new Paddle(2, vertical_length, horizontal_length, starting_position);

var balls = [];
for (var i = 1; i <= NUMBER_OF_BALLS; i++) {
  balls.push(new Ball(
    i, // ball ID
    30 + Math.random() * 50 << 0, // initial X% -- random value between 30% and 30+50%
    30 + Math.random() * 50 << 0, // initial Y% -- random value between 30% and 30+50%
    radius,  // radius
    0.3, // top speed
    0.3  // left speed
  ));
}

setInterval(function() {player_one_paddle.render()}, 60);
setInterval(function() {player_two_paddle.render()}, 60);
setInterval(function() {handle_key_press()}, 40);
setInterval(function() {for (var i = 0; i < balls.length; i++) { balls[i].render() }}, 30);
