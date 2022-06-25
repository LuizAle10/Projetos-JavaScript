/*
document.querySelector('.neutralArea').addEventListener('click', (e) => { //e = evento
    //console.log('CLICOU!', e.target); //identificar extamente o elemneto aonde clicou => target trás o item que eu cliquei
    //console.log('CLICOU!', e.currentTarget); // identificar quem tem o evento de clique  => currentTarget trás o item que tem o evento ex: o retangulo inteiro
    e.target.style.border = '1px solid #FF0000';//clicar e deixar borda ex: vermelha

})

*/


let areas = {
    a: null,
    b: null,
    c: null
};

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart); //cliquei sigurei e arrastei (dragstart) =>  ele roda (dragStart)
    item.addEventListener('dragend', dragEnd); // terminei de arrastar ou soltei o mouse ==> solta o segundo evento (dragEnd)
});    

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
}); 

document.querySelector('.neutralArea').addEventListener('dragover',dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave',dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drag',dragNeutral);

//Functios Item
function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    
}

//Functions Area
function dragOver(e) {
    if(e.currentTarget.querySelector('.item') === null) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
    //console.log("Passou por cima!");
}
}

function dragLeave (e) {
    e.currentTarget.classList.remove('hover');
   //console.log("Saiu de uma área dropavel(posso soltar alguma coisa)!");
}

function drop (e) {
    e.currentTarget.classList.remove('hover');
    //console.log("Liberou(aonde posso soltar)");
    
    if(e.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging');
        e.currentTarget.appendChild(dragItem); //appendChild => entre dentro do elemento e adicione no final
        updateAreas();
    } 
  
}

//functions Neutra area

function dragOverNeutral(e) {
  e.preventDefault();
  e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');

}

function dragNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem); 
}


//Logic Functions
function updateAreas() {
    document.querySelectorAll('.area').forEach()(area => {
        let name = area.getAtribute('date-name');

        if (area.querySelector('.item') !== null ) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
      
    });

    //console.log(areas);

    if(areas.a ==='1' && areas.b ==='2' && areas.c ==='3') {
        document.querySelector('.areas').classList.add('correct');
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }
}