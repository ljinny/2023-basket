const addimgBtn = document.querySelector('.Addimg-btn');
const realInput = document.querySelector('#real-input');
const previewImageContainer = document.querySelector('#image_container');

let img_leftPosition = 22; // 초기 왼쪽 위치
let img_topPosition = 30;
let imageCount = 0; // 이미지 카운트

addimgBtn.addEventListener('click', () => {
    realInput.click();
});

realInput.addEventListener("change", (e) => {
    if (imageCount < 5) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = function(event){
            const img = document.createElement("img");
            img.setAttribute("src", event.target.result);

            // 이미지에 CSS 스타일을 적용합니다.
            img.style.position = 'absolute';
            img.style.top = img_topPosition + '%';
            img.style.left = img_leftPosition + '%';

            // 이미지를 추가합니다.
            previewImageContainer.appendChild(img);

            // 왼쪽 위치 업데이트
            img_leftPosition += 20; 

            if (img_leftPosition + 20 > 100) {
                img_leftPosition = 22; // 초기 왼쪽 위치로 리셋
                img_topPosition += 30; // 아랫 줄로 내려감
            }

            imageCount++;
        };
    } else {
        alert("최대 5개의 이미지만 추가할 수 있습니다.");
    }
});

let btn_leftPosition = 25.5; // 초기 왼쪽 위치
let btn_topPosition = 53;
let linkCount = 0; // 링크 카운트

function addLink() {
    if (linkCount < 5) {
        var userInput = prompt("상품 구매 주소를 입력하세요", "");

        if (userInput !== null && userInput !== "") {
            // 입력된 링크 가져오기

            // 버튼 생성
            var newbutton = document.createElement("button");
            newbutton.innerText = "Buy";

            newbutton.style.position = 'absolute';
            newbutton.style.top = btn_topPosition + '%';
            newbutton.style.left = btn_leftPosition + '%';

            // 버튼을 클릭했을 때 링크를 현재 창에서 열도록 설정
            newbutton.onclick = function () {
                window.open(userInput, "_blank");
            };

            // 버튼을 현재 페이지에 추가
            document.body.appendChild(newbutton);

            btn_leftPosition += 20;

            if (btn_leftPosition > 80) {
                btn_leftPosition = 25.5; // 초기 왼쪽 위치로 리셋
                btn_topPosition += 30; // 아랫 줄로 내려감
            }

            linkCount++;
            newbutton.classList.add("custom-newbutton-style");
        }
    } else {
        alert("최대 5개의 링크만 추가할 수 있습니다.");
    }

}
