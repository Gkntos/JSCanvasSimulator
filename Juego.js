//Creamos objetos para manipular el juego
var Juego = {};
Juego.Nave = { figura : "circulo", movimiento : "random" , direccion : 0, color : "red" , cx : 0, cy : 100 };

Juego.Nave.mueve = function()
{
	
	//Verificar limites de pantalla
	//En Y
	if(this.cy-this.radio < 0){
		// this.vy *= -1;
		// this.ay *= -1;		
		this.cy = Juego.canvas.height - this.radio;
	}
	else if(this.cy+this.vy+this.radio > Juego.canvas.height){
		// this.vy *= -1;
		// this.ay *= -1;		
		this.cy = 0 + this.radio;
	}

	//En X
	if (this.cx - this.radio < 0) {		
		//this.vx *= -1;
		this.cx = Juego.canvas.width - this.radio;
	} 
	else if (this.cx+this.radio+this.vx > Juego.canvas.width) {		
		//this.vx *= -1;
		this.cx = 0 + this.radio;
	};
	//Para calcular movimiento calculamos con trigonometria (vx,vy)

	this.cy += this.vy;
	this.cx += this.vx;

};

Juego.Nave.cambiaMovimiento = function(){
	if(this.movimiento == "random")
	{
		if(this.vy == 0)
			this.vy = 5;
		if(this.vx == 0)
			this.vx = 5;

		this.vy = Math.random()*5*(Math.abs(this.vy)/-this.vy);
		this.vx = Math.random()*5*(Math.abs(this.vx)/-this.vx);

		console.log(this.vx + " - " + this.vy);
	}
	else if(this.movimiento=="direccion")
	{
		console.log(this.direccion);

		var radianes = (this.direccion/180)*Math.PI
		this.vy = 3 * Math.sin(radianes);
		this.vx = 3 * Math.cos(radianes);

		console.log(this.vx + " - " + this.vy);
	}
};

Juego.Nave.esColision = function(objeto) {
	if( (this.cy + this.radio + this.vy >= objeto.ry) && 
		(this.cx + this.radio + this.vx >= objeto.rx) &&
		(this.cx + this.vx - this.radio <= objeto.rx + objeto.ancho) &&
		(this.cy + this.vy - this.radio <= objeto.ry + objeto.alto ) ){
		return true ;		
	}
};

Juego.agregaEventos = function(){
	document.addEventListener("keydown", this.pulsarTecla);
	document.addEventListener("keyup", this.soltarTecla);
};

Juego.pulsarTecla = function(e)
{
	if(e.keyCode==37||e.keyCode==65) Juego.izquierda = true;
	else if(e.keyCode==39||e.keyCode==68) Juego.derecha = true;
};

Juego.soltarTecla = function (e)
{
	if(e.keyCode==37||e.keyCode==65) Juego.izquierda = false;
	else if(e.keyCode==39||e.keyCode==68) Juego.derecha = false;
};

Juego.inicia = function(){
	//Establecer intervalo de ejecución del Juego.GameLoop
	window.setInterval(this.gameLoop, this.rate);
};

Juego.resizeCanvas = function(size){
	if(size=="medium")
		{ 
			this.canvas.width = 400;
			this.canvas.height = 250; 
		}
	else if(size=="large")
		{ 
			this.canvas.width = 600; 
			this.canvas.height = 450;
	}
}

Juego.modificaNave = function(propiedad, valor){
	if(propiedad=="color")
		Juego.Nave.color = valor;
	if(propiedad=="figura")
		Juego.Nave.figura = valor;
	if(propiedad=="movimiento"){
		Juego.Nave.movimiento = valor;
		Juego.Nave.cambiaMovimiento();
	}
	if(propiedad=="direccion"){
		Juego.Nave.direccion = valor;
		Juego.Nave.cambiaMovimiento();
	}
}

//Crear la funcion de loop del juego
Juego.gameLoop = function()
{
	//OJO!
	//AL SER INVOCADO POR SET INTERVAL, EL OBJETO QUE OBTIENE EL CONTROL ES WINDOW
	//Debemos usar explicitamente Juego y no "this"
	Juego.update();
	Juego.draw();
};

Juego.update = function()
{	
	this.Nave.mueve();
};

Juego.draw = function()
{
	this.c.clearRect(0,0,this.canvas.width,this.canvas.height);	
	this.pintaNave();	
};

Juego.pintaNave = function()
{
	this.c.beginPath();
	this.c.lineWidth= 3;
	
	if(this.Nave.figura == "circulo")
		this.c.arc(this.Nave.cx, this.Nave.cy, 15,0,2*Math.PI);
	if(this.Nave.figura == "cuadrado"){
		this.c.fillRect(this.Nave.cx-15, this.Nave.cy-15,30,30);
		this.c.strokeRect(this.Nave.cx-16, this.Nave.cy-16,31,31);
	}
	if(this.Nave.figura == "trinagulo"){

	}

	this.c.fillStyle= this.Nave.color;
	this.c.fill();
	this.c.stroke();	
};
