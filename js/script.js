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

let number = 0;
class Group
{
	constructor(j,i) {
		this.j = j;
		this.i = i;
		this.next = null;
		this.prev = null;
		this.head = this;
		number++;
		//this.checkWin();
	}
	
	addNext(j, i, sj, si) {
		console.log(`addNext`);
		if (!this.checkInput(sj,si)) return;
		if (! ( ((i+si) < max) && ((j+sj) < max) && ((i+si) >=0 ) ) ) {
			console.log(`Conditions fail (j+${sj} = ${this.j+sj} >= ${max}) || (i+${si} = (${this.i+si} < 0)) || (${this.i+si} >= ${max})`);
			return;
		}

		console.log(`now  -> j = ${this.j}, i = ${this.i}, next = ${this.next}, prev = ${this.prev}, value = ${field[this.j][this.i]}`);
		console.log(`next -> j = ${this.j + sj}, i = ${this.i+si}, value = ${field[this.j + sj][this.i + si]}`);
		console.log(`Conditions done (j+${sj} = ${this.j+sj} < ${max}) || (i+${si} = (0 <= ${this.i+si} < ${max})) '`); 
		
		let newElement = new Group(j+sj, i+si);
		this.head.next = newElement;
		newElement.prev = this.head;
		this.head = newElement;
		//newElement.say();
		if (this.checkWin()) return;
		//this.say();
		this.head.addNext(j+sj, i+si, sj, si);
		console.log(`recursion addNext done`);
	}
	
	addPrev(j, i, sj, si) {	
		console.log(`addPrev`);
		// console.log(`sj = ${sj}, si = ${si}`);
		if (!this.checkInput(sj,si)) return;
		if (!( ((i+si) >= 0) && ((j+sj) >= 0) && ((i+si) < max) )) {
			console.log(`Conditions fail (j+${sj} = ${this.j+sj} < 0}) || ((i+${si} = ${this.i+si} < 0) || (${this.i+si} <= ${max}))`);
			return;
		}
		
		console.log(`now  -> j = ${this.j}, i = ${this.i}, next = ${this.next}, prev = ${this.prev}, value = ${field[this.j][this.i]}`);
		console.log(`prev -> j = ${this.j + sj}, i = ${this.i+si}, value = ${field[this.j + sj][this.i + si]}`);	
		console.log(`Conditions done ( j+${sj} = ${this.j+sj} >= 0 ) || ( i+${si} = ( 0 <= ${this.i+si} < ${max}) )`); 
		
		//console.log(`Conditions done`);
		let newElement = new Group(j+sj, i+si);
		this.head.prev = newElement;
		newElement.next = this.head;
		this.head = newElement;
		//newElement.say();
		if (this.checkWin()) return;
		//this.say();
		this.head.addPrev(j+sj, i+si, sj, si);
		console.log(`recursion addPrev done`);
	}
	
	checkInput(sj, si) {
		console.log(`checkInput -> field[${this.j+sj}][${this.i + si}]`);
		if ( field[this.j + sj] == undefined ) {
			console.log(`checkInput -> Conditions fail -> field[${this.j+sj}] = ${field[this.j + sj]}`);
			return false;
		}
		if ( field[this.j][this.i] != field[this.j+sj][this.i+si] ) {
			console.log(`checkInput -> Conditions fail -> field[${this.j+sj}][${this.i + si}] !=field[${this.j}][${this.i}] => ${field[this.j + sj][this.i + si]} != ${field[this.j][this.i]} `);
			return false;
		}
		return true;
	}
	checkWin() {
		if (number == max) {
			alert(`Win ${field[this.j][this.i]}!`);
			console.log(`Win ${field[this.j][this.i]}!`);
			endGame=true;
			return true;
		}
		else return false;
	}

	say() {
		console.log(`j = ${this.j}, i = ${this.i}, next = ${this.next}, prev = ${this.prev}, value = ${field[this.j][this.i]}, number = ${number}`);
	}
	
}

document.getElementById("canvas").addEventListener("mousedown", function (e) {
	if ( endGame ) return; 
	let coords = getRelativeCoordinates(e, canvas);
	let i = Math.floor( coords.x/delta );
	let j = Math.floor( coords.y/delta );
	
	if (field[j][i] != -1) return;
	field[j][i] = gamer;
	
	console.log("------------------------------------horizontal---------------------------------------------------");
	if (number != 3) { 
		number = 0;
		let horizontal = new Group( j, i );
		horizontal.say();
		let hx = 1, hy = 0;
		if (number < 3) horizontal.addNext(j, i, hy, hx); 
		if (number < 3) horizontal.addPrev(j, i, hy, -hx);
	}
	console.log("-------------------------------------vertical----------------------------------------------------");
	if (number != 3) { 
		number = 0;
		let vertical = new Group( j, i );
		vertical.say();
		let vx = 0, vy = 1;
		//console.log(`vx = ${vx}, vy = ${vy}`);
		if (number < 3) vertical.addPrev(j, i, -vy, vx);
		if (number < 3) vertical.addNext(j, i, vy, vx); 
	}	
	console.log("-------------------------------------diagonal/---------------------------------------------------");
	if (number != 3) { 
		number = 0;
		let diagonal = new Group( j, i );
		diagonal.say();
		let dx = -1, dy = 1;
		//console.log(`dx = ${dx}, dy = ${dy}`);
		if (number < 3) diagonal.addPrev(j, i, -dy, -dx);
		if (number < 3) diagonal.addNext(j, i, dy, dx); 
	}
	console.log("-------------------------------------diagonal\---------------------------------------------------");
	if (number != 3) { 
		number = 0;
		let diagonal_ = new Group( j, i );
		diagonal_.say();
		let d_x = 1, d_y = 1;
		//console.log(`d_x = ${d_x}, d_y = ${d_y}`);
		if (number < 3) diagonal_.addPrev(j, i, -d_y, -d_x);
		if (number < 3) diagonal_.addNext(j, i, d_y, d_x); 
	}
	console.log("-------------------------------------------------------------------------------------------------");	
	
	if (gamer == 'X') {
		drawX(i*delta + Math.ceil(delta/2), j*delta + Math.ceil(delta/2), Math.ceil(delta/2) - Math.ceil(delta/4));
		gamer = 'O';
	}
	else{
		drawO(i*delta + Math.ceil(delta/2), j*delta + Math.ceil(delta/2), Math.ceil(delta/2) - Math.floor(delta/6));
		gamer = 'X';
	}
	
} );

// function addTurn( j, i, sj, si ) {
	// if (number != 3) { 
		// number = 0;
		// let turn = new Group( j, i );
		// turn.say();
		// let d_x = 1, d_y = 1;
		// //console.log(`d_x = ${d_x}, d_y = ${d_y}`);
		// if (number < 3) diagonal_.addPrev(j, i, -d_y, -d_x);
		// if (number < 3) diagonal_.addNext(j, i, d_y, d_x); 
	// }
// }

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
