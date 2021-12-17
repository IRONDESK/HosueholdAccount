const $ = (selector) => document.querySelector(selector)
// document.querySelector를 반복하면서, 코드가 길어지는 현상을 막기 위해
// $를 변수로 선언하여 활용

function App() {

    function getDate () {
        const dateText = document.querySelector(".date-text");
        let today = new Date();
        const dayArray = ["일", "월", "화", "수", "목", "금", "토"]
        dateText.innerText = `${today.getMonth() + 1}월 ${today.getDate()}일 ${dayArray[today.getDay()]}요일 소식입니다`;
    }
    
    // data 스토리지
    this.menu = {
        twodaysago: [],
        yesterday: [],
        today: [],
    };
    this.currentDay = "today";

      // store 저장값 불러오기
    this.init = () => {
        if (store.getLocalStorage()) {
        this.menu = store.getLocalStorage();
        }
        menuRender();
    }


    // 전체 금액 알아오기
    const getAllPrice = () => {
        let allPrice = 0;
        const allItemPrice = document.querySelectorAll(".itemListPrice");
        for (let i = 0; i < allItemPrice.length; i ++) {
            allPrice += parseInt(allItemPrice[i].innerText); 
        }
        $('#allMoney').innerText = `You spend ${allPrice} WON!`;
        
    }



    // 아이템 추가
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


    // 메뉴 수정 및 삭제
  $(".itemListProduct").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      RemoveMenuName(e);
    }
  });

    // 아이템 수정 하기 
  const updateMenuName = (e) => {
    const dateMenu = e.target.closest("li").dataset.date;
    const $itemName = e.target.closest("span").querySelector(".itemListName");
    const $itemPrcie = e.target.closest("span").querySelector(".itemListPrice");
    const updatedName = prompt("수정할 품목명을 입력해주세요.", $itemName.innerText);
    const updatedPrice = prompt("수정할 메뉴명을 입력해주세요.", $itemPrcie.innerText);

    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  };

  // 아이템 삭제 하기
  const RemoveMenuName = (e) => {
    if ( confirm("삭제하시겠습니까?") ) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1); // splice() : menuId번째 index를 1개 제거
    store.setLocalStorage(this.menu);
    e.target.closest("li").remove();
    updateMenuCount();
    }
  };
    
}


App();