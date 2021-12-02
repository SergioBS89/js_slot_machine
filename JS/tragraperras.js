var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
document.getElementById('lanzar').addEventListener('click',girar);
document.getElementById('cantidad').value=0
document.getElementById('apuesta').value=0

const tabla = document.getElementById('resultadoJuego')
const insertarColumna = document.getElementById("tbody")
const terminarPartida=document.getElementById('terminar')
let palancaArriba=true

// Funcion para bloquear la introduccion de monedas
function noMasMonedas(){    
    var apuesta = document.getElementById('apuesta')
    apuesta.disabled =true
    apuesta.value=0
    }
  


    // Funcion para iniciar la partida
 var iniciado = true
function juegoIniciado(){   
    if(iniciado ==true && document.getElementById('apuesta').value>0){
        var dinero= parseInt( document.getElementById('apuesta').value) 
        document.getElementById('cantidad').value=dinero
        noMasMonedas()
        // Aparece el historial
        tabla.hidden=false
        // Imprimimos el inicio de juego
        insertarColumna.innerHTML += `
        <tr>
              <td>-You have inserted coins</td>
        </tr>
        `;
        iniciado=false
        noInsertarMasMonedas=false;
    }
    else{
      alert('No money to insert!!')
    }
}

document.getElementById('introducir').addEventListener('click',juegoIniciado,)

function terminar(){
  var dineroDisponible=document.getElementById('cantidad').value
  if(dineroDisponible==0){
  tabla.hidden=true
  insertarColumna.innerHTML = '';
  }else{
  insertarColumna.innerHTML += `
  <tr>
        <td>-You have removed all the coins</td>
  </tr>
  `;    }
  
}
function eliminarDisabled(){
  document.getElementById('apuesta').disabled=false
}

function reiniciarCantidad(){
  document.getElementById('cantidad').value=0
}

function bajarPalanca(){
 document.getElementById('lanzar').src='../img/palancaDOWN.png'
}
function subirPalanca(){
  
  document.getElementById('lanzar').src='../img/palancaUP.png'
}

 // Si el usuario desea terminar la partida

 terminarPartida.addEventListener('click', ()=>{
  terminar()
  eliminarDisabled()
  premioFinal =document.getElementById('cantidad').value;
  var total = document.getElementById('apuesta').value = premioFinal 
  if( total > 0){
    reiniciarCantidad() //reinicio el valor de la cantidad a 0
  }
  iniciado = true
})

function girar (){

    subirPalanca(palancaArriba)
    var saldo =parseInt( document.getElementById('cantidad').value)
    var lanzamiento =1
    var premio=0

    if(saldo>=lanzamiento){

      if(palancaArriba==true){

    document.getElementById('cantidad').value = saldo - 1;
    bajarPalanca()
    palancaArriba=false  

  

    listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
    var n1 = Math.floor(Math.random() * 10);
    var n2 = Math.floor(Math.random() * 10);
    var n3 = Math.floor(Math.random() * 10);
   
document.getElementById('img_1').src = `../img/${listaImagenes[n1]}.png`
document.getElementById('img_2').src = `../img/${listaImagenes[n2]}.png`
document.getElementById('img_3').src = `../img/${listaImagenes[n3]}.png`

// Comprobacion de duplicados o triplicados las imagenes

const arrayImgRepetidas={}
const arrayImagenes =[listaImagenes[n1],listaImagenes[n2],listaImagenes[n3]]

// Comprobamos que cada iteracion es igual o no a la anterior
arrayImagenes.forEach((x) =>{
    arrayImgRepetidas[x] = (arrayImgRepetidas[x]||0)+1
}) 

const dolar =arrayImgRepetidas['dollar'] || 0;
    let alimentosIgualesCount = 0;

    delete arrayImgRepetidas['dollar'];

    // Extract highest value from duplicated items
    for (const producto in arrayImgRepetidas) {
      const valorProducto = arrayImgRepetidas[producto];

      if (valorProducto > alimentosIgualesCount) {
        alimentosIgualesCount = valorProducto;
      }
    }
    if (dolar === 3) {
        console.log('3 dolares')
        premio = 10
        insertarColumna.innerHTML += `
        <tr>
              <td>-THREE DOLLARS! You win 10 coins.</td>
        </tr>
        `;        
        document.getElementById('cantidad').value=saldo + premio
      } else if (alimentosIgualesCount === 3) {
        console.log('3 verduras')
        premio=5
        insertarColumna.innerHTML += `
        <tr>
              <td>-THREE VEGETABLES! You win 5 coins.</td>
        </tr>
        `;   
        document.getElementById('cantidad').value=saldo + premio
      } else if (dolar === 2) {
        console.log('2 dolares')
        premio=4
        insertarColumna.innerHTML += `
        <tr>
              <td>-TWO DOLLARS! You win 4 coins.</td>
        </tr>
        `;   
        document.getElementById('cantidad').value=saldo + premio
      } else if (dolar === 1 && alimentosIgualesCount === 2) {
        console.log('triooo')
        premio=3
        insertarColumna.innerHTML += `
        <tr>
              <td>-TWO VEGETABLES & ONE DOLLAR! You win 3 coins.</td>
        </tr>
        `;   
        document.getElementById('cantidad').value=saldo + premio
      } else if (alimentosIgualesCount === 2) {
        console.log('2 verduras')
        premio=2
        insertarColumna.innerHTML += `
        <tr>
              <td>-TWO VEGETABLES! You win 2 coins.</td>
        </tr>
        `;   
        document.getElementById('cantidad').value=saldo + premio
      }else if(dolar===1){
        premio=1
        console.log('un dolar')
        insertarColumna.innerHTML += `
        <tr>
              <td>-ONE DOLLAR! You win 1 coin.</td>
        </tr>
        `;       
        document.getElementById('cantidad').value=saldo + premio
      }else{
          // Agregamos al historial el gasto de una moneda
    insertarColumna.innerHTML += `
    <tr>
          <td>-You have spent a coin</td>
    </tr>
    `;
      }}else{
        subirPalanca()
        palancaArriba=true
      }

}else{
    alert('Insert coins to play!')
}
}

// CREAR ANIMACION PARA LA PALANCA 