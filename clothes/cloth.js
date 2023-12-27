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

let links = JSON.parse(localStorage.getItem('links')) || []; // Load links from localStorage

addingBtn.addEventListener('click', () => {
    realInput.click();
});

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

        previewImageContainer.appendChild(img);
        previewImageContainer.appendChild(newBox);

        img_leftPosition += 20;

        if (img_leftPosition + 20 > 100) {
            img_leftPosition = 10;
            img_topPosition += 35;
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

        // Remove the following line to prevent redefining newBox
        // var newBox = document.createElement("div");

        document.body.appendChild(newbutton);
        document.body.appendChild(deleteButton);

        btn_leftPosition += 20;

        if (btn_leftPosition > 80) {
            btn_leftPosition = 13;
            btn_topPosition += 35;
        }

        linkCount++;
        newbutton.classList.add("newbutton-style");
        deleteButton.classList.add("deleteButton-style");
        // Remove the following line to prevent redefining newBox
        // newBox.classList.add("newBox-style");

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

            document.body.appendChild(newbutton);
            document.body.appendChild(deleteButton);

            newbutton.classList.add("newbutton-style");
            deleteButton.classList.add("deleteButton-style");
            // Remove the following line to prevent redefining newBox
            // newBox.classList.add("newBox-style");
        });
    }
}

// Load data from local storage when the page loads
loadFromLocalStorage();
