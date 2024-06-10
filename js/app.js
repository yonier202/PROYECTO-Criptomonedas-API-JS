const criptomonedasSelect = document.querySelector('#criptomonedas');

//crear Promise
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas)
})

document.addEventListener('DOMContentLoaded', () =>{
    consultarCriptomondas();
});

function consultarCriptomondas() {
    url= `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

    fetch(url)
        .then(response => response.json())
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => mostrarCriptomonedas(criptomonedas));

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
