/*
 * constante global que armazena a referência html para a seleção
 * do armário
 */
const cabinetSelect = document.querySelector('#cabinet-select');

/*
 * requisição GET para o endpoint da API de busca
 * de armários na base de dados
 */
const getCabinets = async () => {

    const req = await fetch(`${API_URL}/cabinet`, { method: 'get'});
    const reqJson = await req.json();
    const { cabinets } = reqJson;

    return cabinets;
}

/*
 * função para renderizar as opções da seleção
 * de armários, com os dados recebidos da API
 */
const renderCabinetOptions = async () => {
    const cabinets = await getCabinets();

    if(!cabinets.length) {
        alert('Não há armários cadastrados na base de dados!');
        return;
    }

    cabinets.map((cabinet) => {
        let opt = document.createElement('option');
        opt.value = cabinet.id;
        opt.innerHTML = cabinet.position;
        cabinetSelect.appendChild(opt);
    })
}

// executa a lógica presente neste script
renderCabinetOptions();