
let digitalElement = document.querySelector('.digital');
let sElement = document.querySelector('.p_s');
let mElement = document.querySelector('.p_m');
let hElement = document.querySelector('.p_h');


function updateClock() {
   let now = new Date();   //now = agora
   let hour = now.getHours(); //função que pega a hora
   let minute = now.getMinutes();// função pega o minuto
   let second = now.getSeconds();

   digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`; //adicionar texto dentro dele
   

/* um circulo tem 360 graus, um minuto 60 segundos
360 / 60 = 6  
1 segundo pega 6 graus
   */

   let sDeg = ((360/60) * second) - 90; //-90 é para a posição zero do cursor ficar correta
   let mDeg = ((360/60) * minute) - 90;
   let hDeg = ((360/12) * hour) - 90;

   sElement.style.transform = `rotate(${sDeg}deg)`;// colocar propriedade css no java script; deg = graus
   mElement.style.transform = `rotate(${mDeg}deg)`;
   hElement.style.transform = `rotate(${hDeg}deg)`;
}


function fixZero(time){  //função para acrescentar zero nos segundos ex: 01
 
 /*   if(time < 10) {
         return '0' + time;
     } else {
         return time;
     }
*/

     return time < 10 ? `0${time}` : time;  //if resumido em uma linha
}



setInterval(updateClock, 1000); // de um em um segundo executa a função
updateClock();
