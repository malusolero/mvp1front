/*
 * constante que armazena a referência html
 * para a seleção de tipos
 */
const typeSelect = document.getElementById('add-item-type');
/*
 * Constante global que armazena a URL da API
 */
const API_URL = 'http://127.0.0.1:5002';

let types;

/*
 * requisição GET para o endpoint da API de busca
 * de tipos na base de dados
 */
const getTypes = async () => {
    

    try {
        const req = await fetch(`${API_URL}/type`, { method: 'get'});
        const reqJson = await req.json();
        const { types } = reqJson;
        return types;
    }
    catch(e) {
        console.log(e);
        alert('Erro na API, nenhuma interação funcionará enquanto o erro persistir')
    }

}

/*
 * função para renderizar as opções da seleção
 * de tipos, com os dados recebidos da API
 */
const renderTypeOptions = async () => {
    types = await getTypes();

    if(!types.length) {
        alert('Não há tipos cadastrados na base de dados!');
        return;
    }

    types.map((type) => {
        let opt = document.createElement('option');
        opt.value = type.id;
        opt.innerHTML = type.name;
        typeSelect.appendChild(opt);
    })
}

// executa a lógica presente neste script
renderTypeOptions();
