const addBtn = document.querySelector(".add");

addBtn.addEventListener("click", function () {
  const html = `<div class="pre">
    <select class="medicine-type">
      <option>Tablet</option>
      <option>Inject.</option>
      <option>Syrup</option>
    </select>
    <input class="medicine-name" type="text" placeHolder="Name">
    <input class="medicine-dose" type="text" placeholder="Dose">
    <input class="medicine-quantity" type="number" placeholder="Quantity">
    <button><button>
  </div>`;

  const pres = document.querySelector(".prescription");
  pres.insertAdjacentHTML("afterbegin", html);
});
