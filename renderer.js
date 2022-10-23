const addBtn = document.querySelector(".add");
const advc = document.querySelector(".prescription");

const createNode = function (count) {
  const pres = document.createElement("div");
  pres.classList.add(`med-${count}`);
  pres.classList.add("pres");

  pres.innerHTML = `<select class="medicine-type">
      <option>Tablet</option>
      <option>Inject.</option>
      <option>Syrup</option>
    </select>
    <input class="medicine-name" type="text" placeHolder="Name">
    <input class="medicine-dose" type="text" placeholder="Dose">
    <input class="medicine-quantity" type="number" placeholder="Quantity">

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-element" id="dltbtn-${count}">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>`;
  return pres;
};

const append = function (ele, pos, i) {
  pos.prepend(ele);
  const dltbtn = document.getElementById(`dltbtn-${i - 1}`);
  dltbtn.addEventListener("click", function () {
    ele.remove();
  });
};

let count = 0;

addBtn.addEventListener("click", function () {
  const pres = createNode(count);
  count++;
  append(pres, advc, count);
});
