
//Initial Data
let currentColor = 'black'; // cor atual selecionada
let canDraw = false;  //pode desenhar?
let mouseX = 0; 
let mouseY = 0;

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

//Events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent); //quando clica na cor roda a função
});


/*
Passo a Passo para desenhar canvas:
- Quando o click do mouse ABAIXAR, ative o modo desenho.
- Qaundo o mouse se MOVER, se o modo desenho estiver ativado, desenhe.
- Quando o click do Mouse LEVANTAR, desative o modo desenho.
*/

screen.addEventListener('mousedown', mouseDownEvent);//mouse para baixo, botão clicado
screen.addEventListener('mousemove', mouseMoveEvent);//mouse se mover
screen.addEventListener('mouseup', mouseUpEvent);//mouse para cima
document.querySelector('.clear').addEventListener('click', clearScreen);//limpar desenho

//Functions 
function colorClickEvent(e) { 
    let color = e.target.getAttribute('data-color');
   // console.log("COR CLICADA: ", color); 
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active'); //quem tiver com a class active eu removo
     e.target.classList.add('active');//adicionar em quem eu cliquei

}

function mouseDownEvent(e) {
    //console.log("CLICOU NO MOUSE!");
    canDraw = true; //pode desenhar?
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}
function mouseMoveEvent() {
    //console.log("MOVEU O MOUSE!");
    if(canDraw) {  //pode desenhar!
        //console.log("DESENHANDO...!") 
          
       /* let pointX = e.pageX - screen.offsetLeft; //posição do mouse na tela
        let pointY = e.pageY - screen.offsetTop;
        console.log(e.pageX, e.pageY);
        */
        draw(e.pageX, e.pageY);


        }
    }

function mouseUpEvent() {
     //console.log("SOLTOU O MOUSE!");
    canDraw == false; //pode desenhar?
   

}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //desenhar linha
    ctx.beginPath();
    ctx.lineWidth = 5;        //largura da linha
    ctx.lineJoin = "round";   //grossura da linha
    ctx.moveTo(mouseX, mouseY); //mover cursor
    ctx.lineTo(pointX, pointY); //faça uma linha
    ctx.closePath();

    //colorir linha
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;


}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
 
}