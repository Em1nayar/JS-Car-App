const searchText = document.getElementById('search-Text');
const showArea = document.getElementById('showArea');

searchText.addEventListener('keyup', (e) => {
    fetch('car.json').then(data => data.json()).then(res => {
        let cars = searchList(res);
        showToUI(cars);
        paintBg();
    })
});

const searchList = (data) => {
    const regex = new RegExp(`${searchText.value}`, 'gi');
    let cars = data.filter(veh => {
        return veh.brand.match(regex) || JSON.stringify(veh.models).match(regex);
    });
    return(cars);
}

const showToUI = (data) =>{
    if (data.length > 0){
        showArea.innerHTML = ' ';
        const area = data.map((e) => {
            let show = `
            <tr>
                <td class = "brand">${e.brand}</th>
                <td class = "models p-5">${pModels(e.models)}</td>
            </tr>
        `;
        showArea.innerHTML += show;
        })
    }
    if (data.length == 0 || data.length == 39){
        showArea.innerHTML = ' ';
    }
}

const paintBg = () => {
    document.querySelectorAll('.models span').forEach(e => {
        if (e.textContent.includes(searchText.value)){
            e.classList = "p-1 bg-primary text-white rounded";
        }
    })
}

const pModels = (model) => {
    let pTag = "";
    model.forEach(element => {
        pTag += `<span class = "p-1 pb-3">${element}</span>`;
    });
    return pTag;
}