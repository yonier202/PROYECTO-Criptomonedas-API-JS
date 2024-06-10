const criptomonedasSelect = document.querySelector('#criptomonedas');

const monedasSelect = document.querySelector('#moneda');

const resultado = document.querySelector('#resultado');

const formulario = document.querySelector('#formulario');

const objBusqueda ={
    moneda: '',
    criptomoneda: ''
}

//crear Promise
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas)
})

document.addEventListener('DOMContentLoaded', () =>{
    consultarCriptomondas();

    formulario.addEventListener('submit', SubmitForm) 
    
    criptomonedasSelect.addEventListener('change', leerValor);
    monedasSelect.addEventListener('change', leerValor);
});

function SubmitForm(e) {
    e.preventDefault();
    
    //validar
    if(objBusqueda.moneda === '' || objBusqueda.criptomoneda === '') {
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    };

    //consultar api
    consultarApi();
}
function mostrarAlerta(mj) {
    const ExisteError = document.querySelector('.error');
   if (!ExisteError) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');

        divMensaje.textContent = mj;
        formulario.appendChild(divMensaje);
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
   }

}

function consultarCriptomondas() {
    url= `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;


    fetch(url)
        .then(response => response.json())
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => mostrarCriptomonedas(criptomonedas));

}

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;

}

function mostrarCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option);
    });
}
function consultarApi() {
    const {moneda, criptomoneda} = objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    mostrarSpiner();
    fetch(url)
       .then(response => response.json())
       .then(resultado => mostrarResultado(resultado.DISPLAY[criptomoneda][moneda]));

}

function mostrarResultado(cotizacion) {
    limpiarHtml()

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es: <span>${PRICE}</span>`;

    const maximo = document.createElement('p');
    maximo.innerHTML = `El máximo es: <span>${HIGHDAY}</span>`;

    const minimo = document.createElement('p');
    minimo.innerHTML = `El mínimo es: <span>${LOWDAY}</span>`;

    const variacion = document.createElement('p');
    variacion.innerHTML = `La variación es: <span>${CHANGEPCT24HOUR}%</span>`;

    const actualizado = document.createElement('p');
    actualizado.innerHTML = `Última actualización: <span>${LASTUPDATE}</span>`;

    resultado.appendChild(precio);
    resultado.appendChild(maximo);
    resultado.appendChild(minimo);
    resultado.appendChild(variacion);
    resultado.appendChild(actualizado);

}

function limpiarHtml() {
    while (resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarSpiner() {
    limpiarHtml();

    const spiner = document.createElement('div');
    spiner.classList.add('spinner');
    spiner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>`;
    
    resultado.appendChild(spiner);

}
