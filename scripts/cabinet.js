const cabinetSelect = document.querySelector('#cabinet-select');


const getCabinets = async () => {

    const req = await fetch(`${API_URL}/cabinet`, { method: 'get'});
    const reqJson = await req.json();
    const { cabinets } = reqJson;

    return cabinets;
}

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

renderCabinetOptions();