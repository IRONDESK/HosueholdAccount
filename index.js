const $ = (selector) => document.querySelector(selector);
// document.querySelector를 반복하면서, 코드가 길어지는 현상을 막기 위해
// $를 변수로 선언하여 활용
import store from "./store/store.js";
function App() {
  const getDate = () => {
    const todayText = document.querySelector(".date-text");
    let today = new Date();
    const dayArray = ["S", "M", "T", "W", "TH", "F", "SA"];
    todayText.innerText = `${today.getFullYear()}. ${
      today.getMonth() + 1
    }. ${today.getDate()}. ${dayArray[today.getDay()]}`;

    return `${today.getFullYear()}${("0" + (today.getMonth() + 1)).slice(-2)}${(
      "0" + today.getDate()
    ).slice(-2)}`;
  };

  // data 스토리지
  this.itemarray = {
    date: [],
    menuname: [],
    price: [],
  };
  this.currentDay = getDate();

  // data 초기값 셋팅
  const makeNewArray = () => {
    if (this.itemarray.date.indexOf(this.currentDay) == -1) {
      this.itemarray.date.push(getDate());
      this.itemarray.menuname.push([]);
      this.itemarray.price.push([]);
    }
  };

  // store 저장값 불러오기
  this.init = () => {
    if (store.getLocalStorage()) {
      this.itemarray = store.getLocalStorage();
    }
    rendering();
  };

  // modal
  const modalCont = $(".modal");
  const prevBtn = $(".date-text");
  const closeBtn = $("#modal-close");
  prevBtn.addEventListener("click", () => {
    modalControl();
  });
  closeBtn.addEventListener("click", () => {
    modalControl();
  });
  function modalControl() {
    if (modalCont.classList.contains("on")) {
      modalCont.classList.remove("on");
    } else {
      modalCont.classList.add("on");
    }
  }

  // 전체 금액 알아오기
  const getAllPrice = () => {
    let allPrice = 0;
    const allItemPrice = document.querySelectorAll(".itemListPrice");
    for (let i = 0; i < allItemPrice.length; i++) {
      allPrice += parseInt(allItemPrice[i].innerText);
    }
    $("#allMoney").innerText = `You spend ${allPrice} WON!`;
  };

  // 렌더링
  const rendering = () => {
    const currentDayIndex = this.itemarray.date.indexOf(this.currentDay);
    const ListTemplate = this.itemarray.menuname[currentDayIndex]
      .map((val, index) => {
        return `
  <li data-menu-id="${index}" class="itemListProduct">
    <span class="itemListName">${val}</span>
    <span class="itemListPrice">${this.itemarray.price[currentDayIndex][index]}</span>
    <button type="button" class="menu-edit-button">
        edit
    </button>
    <button type="button" class="menu-remove-button">
        del
    </button>
</li>`;
      })
      .join("");
    console.log(ListTemplate);
    // 추가 완료 했으면 input은 빈값
    $("#itemList").innerHTML = ListTemplate;
    getAllPrice();
    // $("#item-price").value = "";
    // $("#item-name").value = "";
    // $("#item-name").focus(); // 이름에 커서가 다시 돌아오게 하기
  };

  // 아이템 수정 하기
  const updateMenuName = (e) => {
    const currentDayIndex = this.itemarray.date.indexOf(this.currentDay);
    const $itemName = e.target.previousElementSibling.previousElementSibling;
    const $itemPrcie = e.target.previousElementSibling;
    const menuId = e.target.closest("li").dataset.menuId;
    const updatedName = prompt(
      "수정할 품목명을 입력해주세요.",
      $itemName.innerText
    );
    const updatedPrice = prompt(
      "수정할 메뉴명을 입력해주세요.",
      $itemPrcie.innerText
    );

    this.itemarray.menuname[currentDayIndex][menuId] = updatedName;
    this.itemarray.price[currentDayIndex][menuId] = updatedPrice;
    store.setLocalStorage(this.itemarray);
    $itemName.innerText = updatedName;
    $itemPrcie.innerText = updatedPrice;
    getAllPrice();
  };

  // 아이템 삭제 하기
  const RemoveMenuName = (e) => {
    if (confirm("삭제하시겠습니까?")) {
      const currentDayIndex = this.itemarray.date.indexOf(this.currentDay);
      const menuId = e.target.closest("li").dataset.menuId;
      this.itemarray.menuname[currentDayIndex].splice(menuId, 1); // splice() : menuId번째 index를 1개 제거
      this.itemarray.price[currentDayIndex].splice(menuId, 1); // splice() : menuId번째 index를 1개 제거
      store.setLocalStorage(this.itemarray);
      e.target.closest("li").remove();
      getAllPrice();
    }
  };

  ////////// 확인이나 엔터 누르면 입력 //////////
  $("#itemSubmitButton").addEventListener("click", () => {
    rendering();
  });
  // 메뉴 이름 input에서 받아오기
  $("#item-price").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    rendering();
  });

  // form 태그는 자동으로 전송해주는 속성이 있음
  // form 태그가 자동으로 전송되는 것을 막아줘야 함
  $("#itemForm").addEventListener("submit", (e) => {
    // submit 이벤트가 발생해도, preventDefault(초기화방지) 해줌.
    e.preventDefault();
  });

  // 버튼을 누르거나, 엔터를 누르거나 반복되는 코드이므로
  // 하나의 변수로 받아서 각각에 넣어줌
  const addMyItem = () => {
    if ($("#item-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }
    if ($("#item-price").value === "") {
      alert("값을 입력해주세요.");
      return;
    }
    // .value를 붙여서 input의 값을 가져옴
    const currentDayIndex = this.itemarray.date.indexOf(this.currentDay);
    const ItemName = $("#item-name").value;
    const ItemPrice = $("#item-price").value;
    this.itemarray.menuname[currentDayIndex].push(ItemName);
    this.itemarray.price[currentDayIndex].push(ItemPrice);
    store.setLocalStorage(this.itemarray); // store에 저장
    rendering();
    // 추가 완료 했으면 input은 빈값
    $("#menu-name").value = "";
  };

  $("#itemSubmitButton").addEventListener("click", addMyItem);

  // 아이템 이름 input에서 받아오기
  $("#item-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    makeNewArray();
    addMyItem();
  });
  $("#item-price").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    makeNewArray();
    addMyItem();
  });

  // 메뉴 수정 및 삭제
  $("#itemList").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      RemoveMenuName(e);
    }
  });
}

const app = new App();
app.init();
