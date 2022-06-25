
//console.log(questions.length);  //imprimir quantidade de qustões
let currentQuestion = 0;//qual questão atual exibir ?
let correctAnswers = 0;

showQuestion();

//Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//Functions
function showQuestion() {//mostrar questão
     if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100); //barra de progresso; Math.floor = arredondar número; length = tamanho
        document.querySelector('.progress--bar').style.width = `${pct}%`;

    // console.log(q.question);

    document.querySelector('.scoreArea').style.display = 'none';
    document.querySelector('.questionArea').style.display = 'block';

    document.querySelector('.question').innerHTML = q.question;
    let optionsHtml = '';
    for(let i in q.options) {
       // document.querySelector('.options').innerHTML  += `<div>${q.options[i]} </div>` ;
       optionsHtml  += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>` ;    //parseInt transforma string em inteiro
    }
    document.querySelector('.options').innerHTML = optionsHtml;

    document.querySelectorAll('.options .option').forEach(item => {
        item.addEventListener('click', optionClickEvent);
    });

} else {
//acabaram as questoes
    finishQuiz();

}
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers ++;// quando eu clicar em acertar acrecenta uma
     /*   console.log("ACERTOU!") ; 
    } else {
            console.log("ERROU!") ;    
        }
    */

    }

    currentQuestion ++;
    showQuestion(); //atualizar questão
  
    }

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);
    
    if(points < 30 ) {
          document.querySelector('.scoreText1').innerHTML = 'Tá ruim em?!';
          document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector(`.scorePct`).innerHTML = `Acertou ${points}%`;
    document.querySelector(`.scoreText2`).innerHTML = `Você respondeu ${questions.length} questões e acertou  ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;
}    

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();

}


