
//initial Data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''

};

let player = '';
let warning = '';
let playing = false;

reset();

//Events
document.querySelector('.reset').addEventListener('click', reset);
/*
*document.querySelector('div[data-item=a1]').addEventListener('click', itemClick);
*document.querySelector('div[data-item=a2]').addEventListener('click', itemClick);
*document.querySelector('div[data-item=a3]').addEventListener('click', itemClick);
*document.querySelector('div[data-item=b1]').addEventListener('click', itemClick);
*document.querySelector('div[data-item=b2]').addEventListener('click', itemClick);
*document.querySelector('div[data-item=b3]').addEventListener('click', itemClick);
*document.querySelector('div[data-item=c1]').addEventListener('click', itemClick);
*document.querySelector('div[data-item=c2]').addEventListener('click', itemClick);
*document.querySelector('div[data-item=c3]').addEventListener('click', itemClick);
*/

document.querySelectorAll('.item').forEach(item => { //outo jeito para percorrer cada um dos itens
       item.addEventListener('click', itemClick);
});

//Functions
function itemClick(event) {
    //console.log(event.target);//identificar em quem eu cliquei no navegador
    let item = event.target.getAttribute('data-item'); //agora sei em quem cliquei
    //console.log("Clicou em", item);
    if(playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer(); 
    }
}

function reset() {
    warning = ''; //limpou
    
    //Math.floor arredonda para baixo, nesse caso ou para "0" ou para "1"
    let random = Math.floor(Math.random() *2);  //pegar numero aleatório entre "0" e "1", se der "0" coloca "X", se der "1" coloca"O" 
    /*
     *if(random === 0) {
     *   player = 'x';
     *} else {
     *   player = 'o';
     *}
     */
    player = (random === 0) ? 'x' : 'o'; // fiz o If em uma linha só

    /* duas formas de acessar objeto no java script
     *uma forma =>    square.a1
     *outra forma=>   square['a1']
     */

    for(let i in square) {
        square[i] = '';

    }

    //reseta e inicia o jogo
    playing = true;

    renderSquare();
    renderInfo();
}

function   renderSquare()  { //verifica se em cada elemnto tem algumca coisa preenchida, se tem coloca no html
    for(let i in square) {
     //   console.log("ITEM" , i); //validar no console do navegador
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
      
    }

    checkGame();
}

function  renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;

}

function togglePlayer() {//alternar o jogador em jogar "x" ou "o"
    /*if(player === "x") {
     *    player = 'o';
     *} else {
     *   player = 'x';
     *}
    */
   player = (player === 'x') ? 'o' : 'x';
   renderInfo(); //exibir na tela
}

function checkGame() { //verificar quem ganhou
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
    } else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    }  else if(isFull()) {
        warning = 'Deu empate';
        playing = false;
    } 

}

function checkWinnerFor(player) {
     let pos = [  //array de possibilidades de vitória
         'a1, a2, a3',
         'b1, b2, b3',
         'c1, c2, c3',

         'a1, b1, c1',
         'a2, b2, c2',
         'a3, b3, c3',

         'a1, b2, c3',
         'a3, b2, c1'

     ]; 

      //verificar se as posições estão preenchidas
      for(let w in pos) {
          let pArray = pos[w].split(','); //a1, a2, a3

         /*pArray.every((option)=> {
              if (square [option] === player) {
                return true;   
              } else {
                  return false;
              }
             });
         */
           
            let hasWon = pArray.every(option => square[option] === player);
            if(hasWon) {
                return true; 
            }
                   
      }

      return false;

}

//verificar empate
function isFull() { 
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
}
return true;
}
