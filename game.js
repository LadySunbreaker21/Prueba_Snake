

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const box = 25;
const canvasSize = 23;


//Puntaje
let score = 0;
 
//Start Position
let snake = [];

snake[0] = 
{
	x: Math.floor((canvasSize/2)) * box, 
	y: Math.floor((canvasSize/2)) * box
};


//Movimiento
let dir;
var pressed = false;
document.addEventListener('keydown', direction);
function direction(event){

	if(event.keyCode == 65 && dir != 'RIGHT'){ //!= Diferente
		dir = "LEFT";
		
	}
	else if(event.keyCode == 87 && dir != 'DOWN'){
		dir = "UP";
	}
	else if(event.keyCode == 68 && dir != 'LEFT'){
		dir = "RIGHT";
		
	}
	else if(event.keyCode == 83 && dir != 'UP'){
		dir = "DOWN";
		
	}
}


//Spawn Comida
let food = {
	x: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box, //Establecer numeros random pero enteros
	y: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box 
}

//Draw
function draw(){

	ctx.fillStyle = 'lightgreen';
	ctx.fillRect(box, box, canvasSize*box - box, canvasSize*box-box);
	
	//Marcar serpiente y cola
	for(let i = 0; i < snake.length; i++)
	{
		ctx.fillStyle = 'green';
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
		if(snake[i].x == food.x && snake[i].y == food.y)
		{
		food = {
				x: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box,
				y: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box
			}
		}
	}

	//Mover la direccion de la cabeza de la serpiente
	let snakeX = snake[0].x; 
	let snakeY = snake[0].y;

	if(dir == "LEFT")
	 snakeX -= box;
	if(dir == "RIGHT")
	 snakeX += box;
	if(dir == "UP")
	 snakeY -= box;
	if(dir == "DOWN")
	 snakeY += box;


	// Condicion comida
	if(snakeX == food.x && snakeY == food.y)
	{
		food = {
			x: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box,
			y: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box 
		}
	}
	else
	{
		snake.pop(); //Si no se cumple se regresa 
	}

	let newHead = {
		x: snakeX,
		y: snakeY
	};



	//Colision
	function collision(head, array){
		for(let i = 0; i < array.length; i++)
		{
			if(head.x == array[i].x && head.y == array[i].y)
			{
				return true;
			}
		}
		return false;
	}
	
	//game over
	if(snakeX < box || snakeY < box || 
		snakeX > ((canvasSize - 1) * box)|| snakeY > ((canvasSize - 1) * box) ||
		collision(newHead,snake))
	{
		clearInterval(game);
	}

	snake.unshift(newHead);
	//Fruta 
	ctx.fillStyle = 'red';
	ctx.fillRect(food.x, food.y, box, box);

    //LLorar


}

let game = setInterval(draw, 100);