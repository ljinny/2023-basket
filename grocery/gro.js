const groInputElem = document.querySelector('.gro-input');
const groListElem = document.querySelector('.gro-list');
const mealTable = document.getElementById('mealTable');

let gro = [];
let mealPlan = [];
let id = 0;
let mealId = 0;

const setGro = (newGro) => {
    gro = newGro;
    localStorage.setItem('groceryList', JSON.stringify(newGro));
};

const setMealPlan = (newMealPlan) => {
    mealPlan = newMealPlan;
    localStorage.setItem('mealPlan', JSON.stringify(newMealPlan));
};

const getAllGro = () => {
    const storedGro = localStorage.getItem('groceryList');
    return storedGro ? JSON.parse(storedGro) : [];
};

const getAllMealPlan = () => {
    const storedMealPlan = localStorage.getItem('mealPlan');
    return storedMealPlan ? JSON.parse(storedMealPlan) : [];
};

const appendGro = (text) => {
    const newId = id++;
    const newGro = getAllGro().concat({ id: newId, isCompleted: false, content: text });
    setGro(newGro);
    paintGro();
};

const deleteGro = (groId) => {
    const newGro = getAllGro().filter(gro => gro.id !== groId);
    setGro(newGro);
    paintGro();
};

const completeGro = (groId) => {
    const newGro = getAllGro().map(gro => gro.id === groId ? { ...gro, isCompleted: !gro.isCompleted } : gro);
    setGro(newGro);
    paintGro();
};

const updateMealPlan = () => {
    const rows = mealTable.rows;
    const newMealPlan = [];

    for (let i = 1; i < rows.length; i++) {
        const day = rows[i].cells[0].innerText;
        const breakfast = rows[i].cells[1].innerText;
        const lunch = rows[i].cells[2].innerText;
        const dinner = rows[i].cells[3].innerText;

        newMealPlan.push({ id: mealId++, day, breakfast, lunch, dinner });
    }

    setMealPlan(newMealPlan);
};

const paintGro = () => {
    groListElem.innerHTML = '';
    const allGro = getAllGro();

    allGro.forEach(gro => {
        const groItemElem = document.createElement('li');
        groItemElem.classList.add('gro-item');

        groItemElem.setAttribute('data-id', gro.id);

        const checkboxElem = document.createElement('div');
        checkboxElem.classList.add('checkbox');
        checkboxElem.addEventListener('click', () => completeGro(gro.id));

        const groElem = document.createElement('div');
        groElem.classList.add('gro');
        groElem.innerText = gro.content;

        const delBtnElem = document.createElement('button');
        delBtnElem.classList.add('delBtn');
        delBtnElem.addEventListener('click', () => deleteGro(gro.id));
        delBtnElem.innerHTML = 'X';

        if (gro.isCompleted) {
            groItemElem.classList.add('checked');
            checkboxElem.innerText = '✔';
        }

        groItemElem.appendChild(checkboxElem);
        groItemElem.appendChild(groElem);
        groItemElem.appendChild(delBtnElem);

        groListElem.appendChild(groItemElem);
    });
};

const paintMealPlan = () => {
    const allMealPlan = getAllMealPlan();

    mealTable.innerHTML = ''; // 표 초기화

    // 헤더 행 생성
    const headerRow = mealTable.insertRow(0);
    const headerCells = ['Day', 'Breakfast', 'Lunch', 'Dinner'];

    for (let i = 0; i < headerCells.length; i++) {
        const headerCell = headerRow.insertCell(i);
        headerCell.innerText = headerCells[i];
        headerCell.style.width = '100px'; 
    }

    // 데이터 행 생성
    allMealPlan.forEach((meal, index) => {
        const row = mealTable.insertRow(index + 1);

        for (let i = 0; i < headerCells.length; i++) {
            const cell = row.insertCell(i);

            // 'Day' 열을 제외하고 모든 셀에 contenteditable 속성 적용
            if (i !== 0) {
                cell.contentEditable = true;
                cell.innerText = meal[headerCells[i].toLowerCase()];
            } else {
                cell.innerText = meal.day;
            }
            cell.style.width = '100px'; 
        }
    });
};



const init = () => {
    groInputElem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            appendGro(e.target.value);
            groInputElem.value = '';
        }
    });

    mealTable.addEventListener('input', () => {
        updateMealPlan();
    });

    // 페이지 로드 시 저장된 목록 및 식단표 불러오기
    window.addEventListener('load', () => {
        gro = getAllGro();
        mealPlan = getAllMealPlan();
        paintGro();
        paintMealPlan();
    });
};

init();
