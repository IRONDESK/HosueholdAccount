const $ = (selector) => document.querySelector(selector)
// document.querySelector를 반복하면서, 코드가 길어지는 현상을 막기 위해
// $를 변수로 선언하여 활용

function App() {
    // 전체 금액 알아오기
    // const getAllPrice = () => {
    //     const getItemList = $("itemList");
    //     const allItemPrice = getItemList.querySelectorAll(".itemListPrice").innerText;
    //     console.log(allItemPrice);
    //     $('allMoney').innerText(allItemPrice);
        
    // }



    // 버튼을 누르거나, 엔터를 누르거나 반복되는 코드이므로
    // 하나의 변수로 받아서 각각에 넣어줌 
    const addItem2List = () => {
        if ($("#item-name").value === "" || $("#item-price").value === "") {
            alert('값을 입력해주세요.');
            return;
        }
        // .value를 붙여서 input의 값을 가져옴
        const itemName = $("#item-name").value;
        const itemPrice = $("#item-price").value;
        const ListTemplate = (itemName, itemPrice) => {
            return `
  <li class="itemListProduct">
    <span class="itemListName">${itemName}</span>
    <span class="itemListPrice">${itemPrice}</span>
    <button type="button" class="menu-edit-button">
        edit
    </button>
    <button type="button" class="menu-remove-button">
        del
    </button>
</li>`
        };
        // .innerHTML,Text = ?? 로 쓰면 안의 내용을 바꾸는 것이기 때문에
        // ul 태그 안에 계속 추가하려면,
        // insertAdjacentHTML("", ??); 형태로 써야 한다.
        // 태그의 앞부터 쓰려면 beforebegin
        // 태그의 안에서 위로 추가하려면 afterbegin
        // 태그의 안에서 아래로 추가하면 beforeend
        // 태그의 뒤부터 쓰려면 afterend
        $("#itemList").insertAdjacentHTML(
            "beforeend", ListTemplate(itemName, itemPrice)
        );

        // 추가 완료 했으면 input은 빈값
        $("#item-price").value = "";
        $("#item-name").value = "";
        $("#item-name").focus(); // 이름에 커서가 다시 돌아오게 하기
        getAllPrice();
    }

    ////////// 확인이나 엔터 누르면 입력 //////////
    $("#itemSubmitButton")
        .addEventListener("click", () => {
            addItem2List();
        });


    // 메뉴 이름 input에서 받아오기
    $("#item-price")
        .addEventListener("keypress", (e) => {
            if (e.key !== 'Enter') {
                return;
            }
            addItem2List();
        });


    
}


App();