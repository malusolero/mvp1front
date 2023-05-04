const typeSelect = document.getElementById('add-item-type');
const API_URL = 'http://127.0.0.1:5002';
let types;

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

renderTypeOptions();
