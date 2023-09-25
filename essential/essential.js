const essInputElem = document.querySelector('.es-input');
const essListElem = document.querySelector('.es-list');

let ess = [];
let id = 0;

const setEss = (newEss) => {
    ess = newEss;
}

const getAllEss = () => {
    return ess;
}

const appendEss = (text) => {
    const newId = id++;
    const newEss = getAllEss().concat({id: newId, isCompleted: false, content: text })
    setEss(newEss)
    paintEss();
}

const deleteEss = (essId) => {
    console.log(essId);
    const newEss = getAllEss().filter(ess => ess.id !== essId);
    setEss(newEss);
    paintEss()
}

const completeEss = () => {
    const newEss = getAllEss().map(ess => ess.id ? {...ess, isCompleted: !ess.isCompleted} : ess)
    setEss(newEss);
    paintEss()
} 

const paintEss = () => {
    essListElem.innerHTML = ''; //essListElem 요소 안의 HTML 초기화
	const allEss = getAllEss() // todos 배열 가져오기

    allEss.forEach(ess => { 
        const essItemElem = document.createElement('li');
        essItemElem.classList.add('es-item');

        essItemElem.setAttribute('data-id', ess.id );

        const checkboxElem = document.createElement('div');
        checkboxElem.classList.add('checkbox');
        checkboxElem.addEventListener('click', () => completeEss(ess.id))

        const essElem = document.createElement('div');
        essElem.classList.add('ess');
        essElem.innerText = ess.content;

        const delBtnElem = document.createElement('button');
        delBtnElem.classList.add('delBtn');
        delBtnElem.addEventListener('click', () => deleteEss(ess.id))
        delBtnElem.innerHTML = 'X';

        if(ess.isCompleted) {
            essItemElem.classList.add('checked');
            checkboxElem.innerText = '✔';
        }

        essItemElem.appendChild(checkboxElem);
        essItemElem.appendChild(essElem);
        essItemElem.appendChild(delBtnElem);

        essListElem.appendChild(essItemElem);
    })
}

const init = () => {
    essInputElem.addEventListener('keypress', (e) =>{
        if( e.key === 'Enter' ){
            appendEss(e.target.value); essInputElem.value ='';
        }
    })
}

init()