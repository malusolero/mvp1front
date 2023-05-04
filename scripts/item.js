
let table = document.getElementById('items-list');
let showItems = document.getElementById('show-items');
let addItem = document.getElementById('add-item');
let currentCabinets = document.querySelectorAll('.current-cabinet');

let currentItemName = '';
let isEditing;

const getItems = async () => {
    const cabinet_id = cabinetSelect.value;
    const req = await fetch(`${API_URL}/item?cabinet_id=${cabinet_id}`, { method: 'get'});
    const reqJson = await req.json();
    const { items } = reqJson;

    return items;
}

const getCurrentCabinet = (element) => {
    element.innerText = cabinetSelect.options[cabinetSelect.selectedIndex].text;
}

const updateCurrentCabinet = () => {
    currentCabinets.forEach((element) => {
        getCurrentCabinet(element);
    })
}

const renderItemList = async () => {
    clearTable();
    updateCurrentCabinet();
    showItems.style.display = 'block';
    addItem.style.display = 'none';
    const items = await getItems();
    items.forEach((item) => insertItem({...item, type: item.type.name}))
}

const refreshNewItem = () => {
    document.getElementById("add-item-name").value = '';
    document.getElementById("add-item-brand").value = '';
    document.getElementById("add-item-amount").value = '';
    document.getElementById("add-item-expiry-date").value = '';
    document.getElementById("add-item-weight").value = '';
    document.getElementById("add-item-type").value = '';
}

const insertItem = ({name, brand, amount, expiry_date, weight, type }) => {
    const itemRowData = [ name, brand, amount, weight, new Date(expiry_date).toLocaleDateString(), type];
    const row = table.insertRow();

    for(let i = 0; i < itemRowData.length; i++) {
        var cel = row.insertCell(i);
        cel.textContent = itemRowData[i];
    }
    insertButtons(row.insertCell(-1));
    removeElement();
    editElement();
}

const insertButtons = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close action-btn";
    span.appendChild(txt);
    parent.appendChild(span);

    span = document.createElement("span");
    txt = document.createTextNode("\u270E");
    span.className = "edit action-btn";
    span.appendChild(txt);
    parent.appendChild(span);
}

const removeElement = () => {
    let close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement.parentElement;
            const itemName = div.getElementsByTagName('td')[0].innerHTML
            if (confirm("Você tem certeza?")) {
                div.remove()
                deleteItem(itemName)
            }
        }
    }
}

const editElement = () => {
    let edit = document.getElementsByClassName("edit");
    console.log(edit)

    for(let i = 0; i < edit.length; i++) {
        edit[i].onclick = function () {
            isEditing = true;
            let div = this.parentElement.parentElement;
            currentItemName = div.getElementsByTagName('td')[0].innerHTML;
            const itemBrand = div.getElementsByTagName('td')[1].innerHTML;
            const itemAmount = div.getElementsByTagName('td')[2].innerHTML;
            const itemWeight = div.getElementsByTagName('td')[3].innerHTML;
            const itemExpiryDate = div.getElementsByTagName('td')[4].innerHTML;
            const itemType = div.getElementsByTagName('td')[5].innerHTML;
            const itemTypeId = types.find(type => type.name === itemType).id;

            document.getElementById('add-item-name').value = currentItemName;
            document.getElementById('add-item-brand').value = itemBrand;
            document.getElementById('add-item-amount').value = itemAmount;
            document.getElementById('add-item-weight').value = itemWeight;
            document.getElementById('add-item-expiry-date').value = itemExpiryDate;
            document.getElementById('add-item-type').value = itemTypeId;

            showItems.style.display = 'none';
            addItem.style.display = 'block';
        }
    }
}


const clearTable = () => {
    const tableRows = table.rows.length;
    for (let i = tableRows - 1; i > 0; i--) {
        console.log(table.rows)
        table.deleteRow(i);
    } 
}

document.getElementById('show-add-item-btn').addEventListener("click", () => {
    showItems.style.display = 'none';
    addItem.style.display = 'block';
    refreshNewItem();

})

document.getElementById('show-items-btn').addEventListener("click", () => {
    showItems.style.display = 'block';
    addItem.style.display = 'none';
    renderItemList();
})


document.getElementById('add-item-btn').addEventListener("click", () => {
    let itemName = document.getElementById("add-item-name").value;
    let itemBrand = document.getElementById("add-item-brand").value;
    let itemAmount = document.getElementById("add-item-amount").value;
    let itemExpiryDate = document.getElementById("add-item-expiry-date").value;
    let itemWeight = document.getElementById("add-item-weight").value;
    let itemTypeId = document.getElementById("add-item-type").value;

    if(!itemName) {
        alert('Por favor informe o nome do item!');
        return;
    }

    if(!itemBrand) {
        alert('Por favor informe a marca do item!');
        return;
    }

    if(!itemAmount) {
        alert('Por favor informe a quantidade de items no armário!');
        return;
    }

    if(!itemExpiryDate) {
        alert('Por favor informe a data de validade do item!');
        return;
    }

    if(!itemWeight) {
        alert('Por favor informe o peso do item!');
        return;
    }

    if(!itemTypeId) {
        alert('Por favor informe o tipo do item!');
        return;
    }

    if(isNaN(Date.parse(itemExpiryDate))) {
        alert('Por favor informe uma data válida');
        return;
    }

    createOrUpdateItem({
        name: itemName,
        brand: itemBrand,
        amount: itemAmount,
        weight: itemWeight,
        expiry_date: new Date(itemExpiryDate).toUTCString(),
        type_id: itemTypeId
    })
    
})


const createOrUpdateItem = async ({ name, brand, amount, expiry_date, weight, type_id}) => {

    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('amount', amount);
    formData.append('weight', weight);
    formData.append('expiry_date', expiry_date);
    formData.append('type_id', type_id);
    formData.append('cabinet_id', cabinetSelect.value);
    
    try {
        const req = await fetch(`${API_URL}/item${isEditing ? '?name=' + currentItemName : ''}`, {
            method: isEditing ? 'put' : 'post',
            body: formData
        });
        
        const reqJson = await req.json();
        if(reqJson) {
            alert(`${reqJson.name} ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`)
            renderItemList();
            isEditing = false;
        }
        else {
            alert('Algo de errado aconteceu')
        }
    }
    catch(e) {
        console.log(e)
        alert('Algo de errado aconteceu')
    }
}

const deleteItem = async (name) => {
    try {
        const req = await fetch(`${API_URL}/item?name=${name}`, {
            method: 'delete'
        })

        const reqJson = await req.json();
        if(reqJson) {
            alert(`${name} deletado com sucesso!`);
            renderItemList();
        }

        else {
            alert(`Erro ao deletar item ${name}`)
        }
    }
    catch(e) {
        console.log(e);
        alert(`Erro ao deletar item ${name}`)
    }
}