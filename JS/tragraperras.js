//array con las imagenes de los slots
var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
//Si pulsamos en el botón de insert coin se activa la funcion 
document.getElementById('introducir').addEventListener('click',juegoIniciado)
//Al hacer click en la palanca activamos la funcion girar()
document.getElementById('lanzar').addEventListener('click',girar);
// Inicializamos el valor a 0 de la apuesta
document.getElementById('apuesta').value=0
//Inicializamos el valor 0 de la cantidad 
document.getElementById('cantidad').value=0
// variable que hace mencion a la tabla de historial
const tabla = document.getElementById('resultadoJuego')
// Variable usada para insertar elementos en el tbody del historial
const insertarColumna = document.getElementById("tbody")
//Variable que señala al boton de end game
const terminarPartida=document.getElementById('terminar')
//Variable que indica con un booleano si la palanca esta arriba 
let palancaArriba=true

// Funcion para bloquear la introduccion de monedas
function noMasMonedas(){    
    var apuesta = document.getElementById('apuesta')
    apuesta.disabled =true
    apuesta.value=0
}

// Funcion para iniciar la partida

var iniciado = true //Esta variable indica si esta iniciado el juego
function juegoIniciado(){   
  //Si la variable es true y el input apuesta tiene un valor mayor a 0 hace:
    if(iniciado ==true && document.getElementById('apuesta').value>0){
        var dinero= parseInt( document.getElementById('apuesta').value) //Tomamos el valor de apuesta
        document.getElementById('cantidad').value=dinero //Le doy ese valor al input con la cantidad 
        noMasMonedas() //Llamo a la funcion para desabilitar el input de apuesta
        // Aparece el historial
        tabla.hidden=false
        // Imprimimos el inicio de juego
        insertarColumna.innerHTML += `
        <tr>
              <td>-You have inserted coins</td>
        </tr>
        `;
        iniciado=false
        // noInsertarMasMonedas=false;
    }
    else{  //En el caso de que no existe dinero para introducir, saltara este mensaje
      alert('No money to insert!!')
    }
}

//Funcion que termina el juego

function terminar(){
  var dineroDisponible=document.getElementById('cantidad').value
  if(dineroDisponible==0){
  tabla.hidden=true
  insertarColumna.innerHTML = '';
  }else{ //Si la cantidad de dinero es mayor a 0, se manda al historial el mensaje dinero retirado
  insertarColumna.innerHTML += `
  <tr>
        <td>-You have removed all the coins</td>
  </tr>
  `;    }  
}

// Funcion que elimina la condicion de disabled del input para introducir dinero

function eliminarDisabled(){
  document.getElementById('apuesta').disabled=false
}

//Reinicia la cantidad de dinero a 0 cuando se retira 

function reiniciarCantidad(){
  document.getElementById('cantidad').value=0
}

//Funcion que baja la palanca de la maquina

function bajarPalanca(){
  document.getElementById('lanzar').src='img/palancaDOWN.png'
}

//Funcion que sube la palanca 

function subirPalanca(){  
  document.getElementById('lanzar').src='img/palancaUP.png'
}

// Si el usuario desea terminar la partida

 terminarPartida.addEventListener('click', ()=>{
  terminar()
  eliminarDisabled()
  premioFinal = document.getElementById('cantidad').value; //Valor de todo el dinero acumulado
  var total = document.getElementById('apuesta').value = premioFinal //Lo pasamos al input de apuesta
  if( total > 0){
    reiniciarCantidad() //reinicio el valor de la cantidad a 0
  }
  iniciado = true
})

//Funcion para la tirada 

function girar (){
    subirPalanca() //la palanca arriba
    var saldo =parseInt( document.getElementById('cantidad').value) //Obtenemos el valor de dinero disponible
    var lanzamiento =1 // 1 moneda por lanzamiento
    var premio=0 //valor que se genera al sacar las imagenes 

if(saldo>=lanzamiento){
  if(palancaArriba==true){

    document.getElementById('cantidad').value = saldo - 1; //Se reduce el dinero en uno por lanzamiento
    bajarPalanca() //palanca abajo
    palancaArriba=false    

    listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
    //Creo tres variables que generan un valor random
    var n1 = Math.floor(Math.random() * 10);
    var n2 = Math.floor(Math.random() * 10);
    var n3 = Math.floor(Math.random() * 10);
   //De esta forma mando imprimir el array de imagenes con la posicion de las variables random
   document.getElementById('img_1').src = `img/${listaImagenes[n1]}.png`
   document.getElementById('img_2').src = `img/${listaImagenes[n2]}.png`
   document.getElementById('img_3').src = `img/${listaImagenes[n3]}.png`

    // Comprobacion de duplicados o triplicados de las imagenes

  const arrayImgRepetidas={}
  const arrayImagenes =[listaImagenes[n1],listaImagenes[n2],listaImagenes[n3]]

   // Comprobamos que cada iteracion es igual o no a la anterior
    arrayImagenes.forEach((x) =>{
    arrayImgRepetidas[x] = (arrayImgRepetidas[x]||0)+1
   }) 

    const dolar =arrayImgRepetidas['dollar'] || 0;
    let alimentosIgualesCount = 0;

    delete arrayImgRepetidas['dollar']; //descarta dollar del array

  //Recorremos el array para detectar los valores dobles o triples
    for (const producto in arrayImgRepetidas) {
      const valorProducto = arrayImgRepetidas[producto];

      if (valorProducto > alimentosIgualesCount) {
        alimentosIgualesCount = valorProducto;
      }
    }

    //Condiciones para los premios

    //Si aparecen 3 dolares
     if (dolar === 3) { 
        premio = 10 
        //Actializamos el historial
        insertarColumna.innerHTML += `
        <tr>
              <td>-THREE DOLLARS! You win 10 coins.</td>
        </tr>
        `;        
        //>Sumamos el premio 
        document.getElementById('cantidad').value=saldo + premio
        //Si aparecen 3 alimentos
      } else if (alimentosIgualesCount === 3) {
        premio=5
        insertarColumna.innerHTML += `
        <tr>
              <td>-THREE VEGETABLES! You win 5 coins.</td>
        </tr>
        `;   
        document.getElementById('cantidad').value=saldo + premio
        //Si aparecen dos dolares
      } else if (dolar === 2) {
        premio=4
        insertarColumna.innerHTML += `
        <tr>
              <td>-TWO DOLLARS! You win 4 coins.</td>
        </tr>
        `;   
        document.getElementById('cantidad').value=saldo + premio
       //si aparecen dos alimentos y un dolar
      } else if (dolar === 1 && alimentosIgualesCount === 2) {
        premio=3
        insertarColumna.innerHTML += `
        <tr>
              <td>-TWO VEGETABLES & ONE DOLLAR! You win 3 coins.</td>
        </tr>
        `;   
        document.getElementById('cantidad').value=saldo + premio
        //Si aparecen dos alimentos
      } else if (alimentosIgualesCount === 2) {
        console.log('2 verduras')
        premio=2
        insertarColumna.innerHTML += `
        <tr>
              <td>-TWO VEGETABLES! You win 2 coins.</td>
        </tr>
        `;   
        document.getElementById('cantidad').value=saldo + premio
        //si aparece un dolar
      }else if(dolar===1){
        premio=1
        console.log('un dolar')
        insertarColumna.innerHTML += `
        <tr>
              <td>-ONE DOLLAR! You win 1 coin.</td>
        </tr>
        `;       
        document.getElementById('cantidad').value=saldo + premio
        //Si no aparece ningun premio, se imprime en el historial el gasto de la moneda
      }else{
          // Agregamos al historial el gasto de una moneda
        insertarColumna.innerHTML += `
        <tr>
              <td>-You have spent a coin</td>
        </tr>
        `;
  }}else{ //Se sube la palanca en cada tirada 
        subirPalanca()
        palancaArriba=true
      }
  //Si no hay dinero para introducir, se manda el mensaje
}else{
    alert('Insert coins to play!')
}
}
