const addingBtn = document.querySelector('.Adding-btn');
const realInput = document.querySelector('#real-input');
const previewImageContainer = document.querySelector('#image_container');

let img_leftPosition = 10;
let img_topPosition = 30;
let newBox_leftPosition = 8;
let newBox_topPosition = 25;


let btn_leftPosition = 13;
let btn_topPosition = 53;
let linkCount = 0;

if (window.innerWidth <= 420) { 
    img_leftPosition = 5; 
    img_topPosition = 23; 
    btn_leftPosition = 8;
    btn_topPosition = 45;
}

let links = JSON.parse(localStorage.getItem('links')) || []; // Load links from localStorage

addingBtn.addEventListener('click', () => {
    realInput.click();
});

// 이미지를 삭제하는 함수 추가
function deleteImage(imgElement, deleteButton) {
    // 미리보기 컨테이너에서 이미지와 삭제 버튼을 제거합니다.
    previewImageContainer.removeChild(imgElement);
    previewImageContainer.removeChild(deleteButton);

    // 이미지를 제거한 후 로컬 스토리지를 업데이트합니다.
    saveToLocalStorage();
}

realInput.addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = function (event) {
        const img = document.createElement("img");
        img.setAttribute("src", event.target.result);

        const newBox = document.createElement("div");

        img.style.position = 'absolute';
        img.style.top = img_topPosition + '%';
        img.style.left = img_leftPosition + '%';

        newBox.style.position = 'absolute';
        newBox.style.top = newBox_topPosition + '%';
        newBox.style.left = newBox_leftPosition + '%';

        // 이미지마다 삭제 버튼을 추가합니다.
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.style.position = 'absolute';
        deleteButton.style.top = btn_topPosition - 5 + '%';
        deleteButton.style.left = btn_leftPosition + '%';

        deleteButton.onclick = function () {
            // 삭제 버튼을 클릭하면 해당 이미지와 버튼을 삭제합니다.
            deleteImage(img, deleteButton);
        };

        previewImageContainer.appendChild(img);
        previewImageContainer.appendChild(newBox);
        previewImageContainer.appendChild(deleteButton);

        if (window.innerWidth <= 420) {
            img_leftPosition += 45;

            if (img_leftPosition + 45 > 100) {
                img_leftPosition = 5;
                img_topPosition += 37;
            }
        }

        else{
            img_leftPosition += 20;

            if (img_leftPosition + 20 > 100) {
                img_leftPosition = 10;
                img_topPosition += 35;
            }
        }
        
        saveToLocalStorage(); // Save to local storage after adding an image
    };
});

function addLink() {
    var userInput = prompt("상품 구매 주소를 입력하세요", "");

    if (userInput !== null && userInput !== "") {
        var newbutton = document.createElement("button");
        newbutton.innerText = "Buy";

        newbutton.style.position = 'absolute';
        newbutton.style.top = btn_topPosition + '%';
        newbutton.style.left = btn_leftPosition + '%';

        newbutton.onclick = function () {
            window.open(userInput, "_blank");
        };

        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.style.position = 'absolute';
        deleteButton.style.top = btn_topPosition + 5 + '%';
        deleteButton.style.left = btn_leftPosition + '%';

        deleteButton.onclick = function () {
            // 링크 버튼 제거
            previewImageContainer.removeChild(newbutton);

            // 삭제 버튼 제거
            previewImageContainer.removeChild(deleteButton);

            // links 배열에서 해당 데이터 제거
            const linkindex = links.findIndex(link => link.userInput === userInput);
            if (linkindex !== -1) {
                links.splice(linkindex, 1);
                saveToLocalStorage(); // 링크를 제거한 후 로컬 스토리지에 저장
            }
        };

        previewImageContainer.appendChild(newbutton);
        previewImageContainer.appendChild(deleteButton);

        if (window.innerWidth <= 420) {
            btn_leftPosition += 45;

            if (btn_leftPosition > 80) {
                btn_leftPosition = 8;
                btn_topPosition += 30;
            }
        }
        else{
            btn_leftPosition += 20;

            if (btn_leftPosition > 80) {
                btn_leftPosition = 13;
                btn_topPosition += 35;
            }
        }
        

        linkCount++;
        newbutton.classList.add("newbutton-style");
        deleteButton.classList.add("deleteButton-style");

        // Store link data
        links.push({
            userInput,
            top: newbutton.style.top,
            left: newbutton.style.left,
            deleteButtonTop: deleteButton.style.top,
            deleteButtonLeft: deleteButton.style.left,
        });

        saveToLocalStorage(); // Save to local storage after adding a link
    }
}

// Function to save image and link data to local storage
function saveToLocalStorage() {
    localStorage.setItem('images', previewImageContainer.innerHTML);
    localStorage.setItem('links', JSON.stringify(links));
}

// Function to load image and link data from local storage
function loadFromLocalStorage() {
    const savedImages = localStorage.getItem('images');
    const savedLinks = localStorage.getItem('links');

    if (savedImages) {
        previewImageContainer.innerHTML = savedImages;

        // 로드된 각 이미지에 대해 삭제 버튼 추가
        previewImageContainer.querySelectorAll('img').forEach(img => {
            var deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.style.position = 'absolute';
            deleteButton.style.top = btn_topPosition - 5 + '%';
            deleteButton.style.left = btn_leftPosition + '%';
            deleteButton.style.opacity = '0.1';

            deleteButton.onclick = function () {
                // 삭제 버튼을 클릭하면 해당 이미지와 버튼을 삭제합니다.
                deleteImage(img, deleteButton);
            };

            previewImageContainer.appendChild(deleteButton);
        });
    }

    if (savedLinks) {
        links = JSON.parse(savedLinks);
        links.forEach(link => {
            var newbutton = document.createElement("button");
            newbutton.innerText = "Buy";

            newbutton.style.position = 'absolute';
            newbutton.style.top = link.top;
            newbutton.style.left = link.left;

            newbutton.onclick = function () {
                window.open(link.userInput, "_blank");
            };

            var deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.style.position = 'absolute';
            deleteButton.style.top = link.deleteButtonTop;
            deleteButton.style.left = link.deleteButtonLeft;

            previewImageContainer.appendChild(newbutton);
            previewImageContainer.appendChild(deleteButton);

            newbutton.classList.add("newbutton-style");
            deleteButton.classList.add("deleteButton-style");
        });
    }
}

// Load data from local storage when the page loads
loadFromLocalStorage();