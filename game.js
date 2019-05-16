console.log('wow our game is cool');

//Warn that the british are coming
function yell() {
  alert("the british are coming");
}

//Class of Paddle which is rectangle on each side of the screen
class Paddle {

  //Initialize a new Paddle
    //vertical_length and horizontal_length are the dimensions of new paddle
    //initial position is the percentage of total distance the paddle is from the top
  constructor(vertical_length, horizontal_length, position) {
    this.vertical_length = vertical_length;
    this.horizontal_length = horizontal_length;
    this.position = position;
  }

  move(percentage_move) {
    this.position = this.position - percentage_move;
  }
}
