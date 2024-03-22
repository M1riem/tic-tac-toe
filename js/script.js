let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let max = 3;
let delta = 100;
let gamer = 'X';
let turn = 0;
let endGame = false;

let field = Array(max).fill(-1);
for(let i = 0; i < max; i++ ) {
	field[i] = Array(max).fill(-1);
} 
//field.forEach((element) => console.log(element) );

document.getElementById("canvas").addEventListener("mousedown", function (e) {
	if ( endGame ) return; 
	let coords = getRelativeCoordinates(e, canvas);
	let i = Math.floor( coords.x/delta );
	let j = Math.floor( coords.y/delta );
	//drawO(i*delta + Math.ceil(delta/2), j*delta + Math.ceil(delta/2), Math.ceil(delta/2) - Math.floor(delta/6));
	//drawX(i*delta + Math.ceil(delta/2), j*delta+ Math.ceil	(delta/2), Math.ceil(delta/2) - Math.ceil(delta/4));
	
	if (field[j][i] != -1) return;
		//console.log(`i:${i}, j:${j} <=> field[${i}][${j}] = ${field[i][j]} <=> X: ${coords.x}, Y: ${coords.y}`);
		//alert("Cell's busy!")

	field[j][i] = gamer;
	turn++;
	if (turn >= 5)  checkWinner();
	
	if (gamer == 'X') {
		drawX(i*delta + Math.ceil(delta/2), j*delta+ Math.ceil(delta/2), Math.ceil(delta/2) - Math.ceil(delta/4));
		gamer = 'O';
	}
	else{
		drawO(i*delta + Math.ceil(delta/2), j*delta + Math.ceil(delta/2), Math.ceil(delta/2) - Math.floor(delta/6));
		gamer = 'X';
	}
	//console.log(`i:${i}, j:${j} <=> X: ${coords.x}, Y: ${coords.y}`);
} );
	
function checkWinner() {
	let win = 0;
	//1
	console.log(`		#1`);
	for (let j = 0; j < max; j++){
		
		for (let i = 0; i < max; i++){
			if ( gamer == field[j][i] ) {				
				win++;
				console.log(`gamer: '${gamer}' compare field[${j}][${i}] = ${field[j][i]}`);
			} 
			else { 
				win = 0 ; 
				console.log(`Fail gamer: '${gamer}' compare field[${j}][${i}] = ${field[j][i]}`); 
				break; 
				
			} 
		}
		if ( win == max ) { endGame = true; alert("Winner is " + gamer);  console.log(field); return; }
	}
	//2
	console.log(`		#2`);
	for (let j = 0; j < max; j++){
		
		for( let i = 0; i < max; i++ ) 
		{ 
			if ( gamer == field[i][j] ) {
				console.log(`gamer: '${gamer}' compare field[${i}][${j}] = ${field[i][j]}`);
				win++; 
			}
			else { 
				win = 0 ;  
				console.log(`Fail gamer: '${gamer}' compare field[${i}][${j}] = ${field[i][j]}`); 
				break;
			}  
		}
		if ( win == max ) { endGame = true; alert("Winner is " + gamer);  console.log(field); return; }
	}
	//3
	console.log(`		#3`);
	for( let i = 0; i < max; i++ ) {
		
		if ( gamer == field[i][i] ) 
		{
			console.log(`gamer: '${gamer}' compare field[${i}][${i}] = ${field[i][i]}`);
			win++; 			
		}
		else { 
			win = 0;
			console.log(`Fail gamer: '${gamer}' compare field[${i}][${i}] = ${field[i][i]}`);			
			break; 		
		}
	}
	if ( win == max ) { endGame = true; alert("Winner is " + gamer); console.log(field); return; }
	//4
	console.log(`		#4`);
	for( let i = max-1; i >= 0; i--) {
		
		if ( gamer == field[max-i-1][i] ) {
			win++;
			console.log(`gamer: '${gamer}' compare field[${max-i-1}][${i}] = ${field[max-i-1][i]}`);			
		}
		else {
			console.log(`Fail gamer: '${gamer}' compare field[${max-i-1}][${i}] = ${field[max-i-1][i]}`);
			break; 	
		}
	}
	if ( win == max ) { endGame = true; alert("Winner is " + gamer); console.log(field); return; }
}
	
function getRelativeCoordinates(event, element) {
	const rect = element.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	return { x, y };
}

function drawField()
{ 
	let width = canvas.width;
	let height = canvas.height;
	let delta = 100;
	
	drawLine(0, delta, width, delta);
	drawLine(0, height-delta, width, height-delta);
	drawLine(delta, 0, delta, height);
	drawLine(width-delta, 0, width-delta, height);
}
function drawLine(x1, y1, x2, y2) 
{
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.closePath();
	ctx.stroke();
}

function drawX(x, y, delta){
	//console.log(`X: ${x}, Y: ${y}, delta:${delta}`);
	drawLine(x - delta, y - delta, x + delta, y + delta);
	drawLine(x - delta, y + delta, x + delta, y - delta);
}
function drawO(x, y, r){
	//console.log(`X: ${x}, Y: ${y}, r:${r}`);
	ctx.beginPath();
	ctx.arc(x, y, r, 75, 0, getRadians(360));
	ctx.closePath();
	ctx.stroke();
}
function getRadians(degrees) {
	return (Math.PI / 180) * degrees;
}

function drawMatrix(){
	//matrix center points
	let max = 3;
	let shift = delta/6.6;
	let width = canvas.width;
	let height = canvas.height;
	let delta = Math.ceil( width/max );
	let field = Array(delta).fill(Array(delta).fill(-1));
	
	let Martix = Array(delta*delta);
	
	drawX(Math.ceil(delta/2) + delta/6.6, Math.ceil(delta/2) + delta/6.6, delta/2 - delta/4);
}

drawField();






// document.getElementById("canvas").addEventListener('mousemove', function (e) {
	// //const canvas = document.getElementById("canvas");
	// const coords = getRelativeCoordinates(e, canvas);
	// console.log(`X: ${coords.x}, Y: ${coords.y}`);
// });
