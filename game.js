console.log('wow our game is cool');

//Warn that the british are coming
function yell() {
  alert("the british are coming");
}

upcode = 87;
downcode = 83;

upcode_two = 38;
downcode_two = 40;

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
    this.bounce_acceleration_multiplier = 1.25;
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
      ball.getBoundingClientRect().y
    ).filter(function (e) { return e.classList.contains("paddle") });

    if (elements_at_left_position.length >= 1 || elements_at_right_position.length >= 1) {
      console.log('collision!');
      this.left_speed = 0 - this.left_speed;
      this.left_speed *= this.bounce_acceleration_multiplier;
    }

    if (ball.getBoundingClientRect().top < 0 || ball.getBoundingClientRect().top > window.innerHeight) {
      this.top_speed = - this.top_speed;
    }

    this.move();

    ball.style.background = "blue";
    ball.style.top = this.top + "%";
    ball.style.left = this.left + "%";
    ball.style.border_radius = this.radius;
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

var player_one_paddle = new Paddle(1, 80, 5, 50);
var player_two_paddle = new Paddle(2, 80, 5, 50);
var ball_one = new Ball(
  1, // ball ID
  30 + Math.random() * 50 << 0, // initial X% -- random value between 30% and 30+50%
  30 + Math.random() * 50 << 0, // initial Y% -- random value between 30% and 30+50%
  10,  // radius
  0.3, // top speed
  0.3  // left speed
);

setInterval(function() {player_one_paddle.render()}, 60);
setInterval(function() {player_two_paddle.render()}, 60);
setInterval(function() {handle_key_press()}, 40);
setInterval(function() {ball_one.render()}, 30);
