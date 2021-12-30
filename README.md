# 💰 HosueholdAccount 💰
 > 바닐라 JS로 구현한 간단한 가계부

## 데모 링크
![householdaccount](https://user-images.githubusercontent.com/87234410/147716235-b223a4ef-e25f-4621-8ebc-4a4469f19f7a.png)

https://irondesk.github.io/HouseholdAccount/

## 목적
 * 복잡하지 않으면서 간단히 자신의 지출 내역을 관리하고 싶은 사용자를 위한 가계부 만들기
<<<<<<< HEAD
 * DOM, Storage를 활용한 바닐라 JavaScript 서비스 만들기 및 공부

## 구조
```
|   .gitattributes
|   index.html
|   index.js
|   README.md
|   style.css
|
\---store
        store.js
```

## 구현 사항
=======
 * DOM, Storage를 활용한 JavaScript 서비스 만들기 및 공부


## 요구사항
 ### 기능 요구사항
>>>>>>> 4f75383d2b2673ab6d00ecf0c7a5353c13174e03
 * 오늘의 지출 내역과 가격을 입력하고 등록한다.
   * 개별 항목의 수정 및 삭제를 할 수 있다.
 * 내역이 등록될 때마다 지출 내역의 총합을 보여준다.
 * 내역은 일자별로 스토리지에 저장된다.
 * 오늘 날짜를 ``header``에 항상 보이게하고, 이 날짜를 클릭하면 과거에 입력된 가계부 내역을 볼 수 있다.
<<<<<<< HEAD
    * 과거 날짜를 클릭하면 선택한 일자의 가계부를 보여준다. (단, 과거 기록이므로 수정이나 삭제는 불가)

### storage
```js
this.myItemList = {
  date: [],
  menuname: [],
  price: [],
};
```
 * 로컬 스토리지에는 상기와 같은 구조의 object가 생성된다.
 * 정보를 입력하면, 각 key의 value에 만들어진 array 안에 날짜별 새로운 array가 push된다.

```js
// 입력 예시
this.myItemList = {
  date: [["20211229"], ["20211230"]],
  menuname: [
    ["두부", "콩나물", "소고기(등심)"],
    ["시금치", "당면", "목이버섯"]
    ],
  price: [[900, 1000, 26000], [3100, 4300, 1900]],
};
```

## 어려웠던 점, 고민한 점

### 스토리지 object 구조
 * 하나의 object에서 구현하기 위해, 어떻게 구조를 만들어야 할 지 고민이 많았다.
 * 특히 날짜에 따라 value가 추가되어야 하고 다루기 쉽게 만들고 싶어, array로 구조화하게 되었다.

```js
const makeNewArray = () => {
  if (this.myItemList.date.indexOf(this.currentDay) == -1) {
    this.myItemList.date.push(getDate());
    this.myItemList.menuname.push([]);
    this.myItemList.price.push([]);
  }
};
```

 * 우선 ``getDate()``라는 함수에서 ``return``값으로 날짜 코드를 내보내진다.
 * 오늘 날짜가 ``this.myItemList``에 없을 때만, object에 값을 입력할 수 있도록 value를 세팅하도록 했다.
=======
>>>>>>> 4f75383d2b2673ab6d00ecf0c7a5353c13174e03
