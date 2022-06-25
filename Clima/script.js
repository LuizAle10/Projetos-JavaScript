
document.querySelector('.busca').addEventListener('submit', async (event)=>{ //async => dizendo que vou utilizar código assincrono, que não é ordenado 
    event.preventDefault(); //Previne comportamento padrão, se o padrão é enviar formulário ele mão vai fazer isso
   
    let input = document.querySelector('#searchInput').value;

   if(input !== '') {
       clearInfo(); //limpar a tela
    showWarning('Carregando...'); //mostra carregando
     
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`; // api de terceiro; configurei a estrutura

    let results = await fetch(url);
    let json = await results.json();//pegar o resultado e transformar em json; ler o resultado

    if (json.cod === 200) {
        showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon, // quando tem "0" no resultado do network é uma array
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
        })
    } else {
        clearInfo(); //limpo a tela
        showWarning('Não encontramos esta localização.'); //apresenta aviso
    }
     
   } else {  //quando o if não encontrada nada vem para ca
        clearInfo(); //limpo a tela
   }

});

function showInfo(json) {
    showWarning('');//tirar o nome "carregando" após o resultado, substitui por nada
    

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML  = `${json.windSpeed} <span>km/h</span>`;

    
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`; //-90 por conta do angulo do ponteiro

    document.querySelector('.resultado').style.display = 'block';//mostrar grade de resultados

}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

 
