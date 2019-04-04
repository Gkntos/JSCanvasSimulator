//Nos aseguramos que se cargue cuando este lista la ventana
//Sin importar la ubicación del Script
window.onload = function(){
	
	//Configuramos Parametros
	ConfigGame(1000/60, 300-75);
	//Corremos el juego
	Juego.inicia();

};

//Funcion de Inicializacion
function ConfigGame(rate, posInicialRaqueta){

	//Ejecutamos Configuraciones Iniciales del Objeto Juego
	//Debe estar incluido el archivo Juego.js tambien en el HTML

	//Obtener Canvas
	Juego.canvas = document.getElementById("juego");
	Juego.c = Juego.canvas.getContext("2d");

	//Establecer Rate del Juego
	Juego.rate = rate;
	//Establecer parametros iniciales del juego
	Juego.izquierda= false;
	Juego.derecha= false;

	//Centro de la pelota en X,Y
	Juego.Nave.cx = 300;
	Juego.Nave.cy = 225;
	Juego.Nave.radio = 15;
	//Velocidades Iniciales de Nave X,Y (vectorial)
	Juego.Nave.vx = 3;
	Juego.Nave.vy = 3;


	//Agregar Eventos del Teclado
	Juego.agregaEventos();
};





