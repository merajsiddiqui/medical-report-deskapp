const addBtn = document.querySelector(".add");

addBtn.addEventListener("click", function () {
  const html = `<div class="pre">
    <select>
      <option>Tablet</option>
      <option>Inject.</option>
      <option>Syrup</option>
    </select>
    <input type="text" placeHolder="Name">
    <input type="text" placeholder="Dose">
    <input type="number" placeholder="Quantity">
  </div>`;

  const pres = document.querySelector(".prescription");
  pres.insertAdjacentHTML("afterbegin", html);
});
