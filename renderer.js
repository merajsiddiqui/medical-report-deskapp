const jspdf = require("jspdf").jsPDF;
const table = require("jspdf-autotable");

const addBtn = document.querySelector(".add");
const medicine = document.querySelector(".prescription");

//////////////////////////////////////////////////////
const pdfBtn = document.querySelector(".pdf-btn");

const logo = document.querySelector(".logo");
const clinicName = document.querySelector(".heading-primary");
const num = document.querySelector(".number");

const feeOptions = document.querySelector("#fees");
const feecontainer = document.querySelector(".fee-container");

const inputTitle = document.querySelector("#name-title");
const inputFullName = document.querySelector(".name");
const inputAge = document.querySelector(".age");
const inputGender = document.querySelector("#gender-option");
const inputTemp = document.querySelector("#temp");
const inputPulse = document.querySelector("#pulse");
const inputWeight = document.querySelector("#weight");
const inputSpo2 = document.querySelector("#spo");
const legal = document.querySelector(".legal");
const address = document.querySelector(".address");
const inputHistory = document.querySelector("#history");

const createPresFields = function (count) {
  const pres = document.createElement("div");
  pres.classList.add(`med-${count}`);
  pres.classList.add("pres");

  pres.innerHTML = `<select class="medicine-type">
      <option>Tablet</option>
      <option>Inject </option>
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
  pos.append(ele);
  const dltbtn = document.getElementById(`dltbtn-${i - 1}`);
  dltbtn.addEventListener("click", function () {
    ele.remove();
  });
};

let count = 0;

addBtn.addEventListener("click", function () {
  const pres = createPresFields(count);
  count++;
  append(pres, medicine, count);
});

///////////////////////////////////////////////////////

let lineHeight;

const getMedicine = function (doc) {
  const medicines = document.querySelectorAll(".pres");

  console.log(lineHeight);
  let pos = 3.8;
  if (lineHeight + 2.2 > pos) pos = lineHeight + 2.9;

  const labelPos = pos;

  medicines.forEach((ele, i) => {
    const mName = ele.querySelector(".medicine-name").value;
    const mDose = ele.querySelector(".medicine-dose").value;
    const mOptions = ele.querySelector(".medicine-type");
    let mType = mOptions.options[mOptions.selectedIndex].value;
    doc.text(
      2.6,
      pos + 0.5,
      `${i + 1}.   ${mType}.  ${mName} ------- ${mDose}`
    );
    pos += 0.2;
  });

  //label
  doc.setFontSize(13.5);
  const text = "Medical History and Complaints";
  doc.setFont(text, "bold");
  doc.text(4, 2.1, text);

  doc.text(4, labelPos + 0.2, "Medicines & Adv.");
};

const getFeeDetails = function (doc) {
  const inputs = feecontainer.querySelectorAll("input");

  let b = [];
  inputs.forEach((ele, i) => {
    // console.log(`${i + 1}.  ${ele.getAttribute("for")}---->${ele.value}`);
    const tempArr = [];
    tempArr.push(`${ele.getAttribute("for")}`);
    tempArr.push(`${ele.value}`);
    b.push(tempArr);
  });

  doc.autoTable({
    startX: 1,
    startY: 8.5,
    head: [["Fees Type", "Fees Amount"]],
    body: b,
  });
};

let fullName, title, age, gender, temp, pulse, weight, spo2, medicalhistory;

const getInputs = function () {
  //name-title;
  title = inputTitle.options[inputTitle.selectedIndex].value;
  fullName = inputFullName.value;
  age = inputAge.value;
  gender = inputGender.options[inputGender.selectedIndex].value;
  temp = inputTemp.value;
  pulse = inputPulse.value;
  weight = inputWeight.value;
  spo2 = inputSpo2.value;
  medicalhistory = inputHistory.value;
};

//getting pdf ready

const getPdfReady = function (doc) {
  doc.text(`Name: ${title} ${fullName}`, 0.5, 1.8);
  doc.text(`Age / Gender: ${age} / ${gender}`, 6.2, 1.8);

  doc.text(`Temp: ${temp}`, 0.5, 2.4);
  doc.text(`Pulse: ${pulse}`, 0.5, 2.7);
  doc.text(`${document.querySelector(".sub").textContent}: ${spo2}`, 0.5, 3);
  doc.text(`Weight: ${weight}`, 0.5, 3.3);

  //medical history and complaints
  const lines = doc.splitTextToSize(medicalhistory, 5);
  doc.text(lines, 2.8, 2.4);

  lineHeight = (doc.getLineHeight() * lines.length) / 72;
  console.log(lineHeight);

  if (lineHeight < 1.1) {
    lineHeight = 1.2;
  }

  //vertical line
  doc.setLineWidth(4 / 72);
  doc.line(2.5, 1.95, 2.5, lineHeight + 2.3);
};

const others = function (doc) {
  doc.setFontSize(30);

  //adding logo
  const img = new Image();
  img.addEventListener("load", function () {
    doc.addImage(img, "png", 0.1, 0.1, 1.5, 1.1);
  });
  img.src = logo.getAttribute("src");

  // predefined text
  doc.text(clinicName.textContent.toUpperCase(), 1.8, 0.8);
  doc.setFontSize(12);
  doc.text(num.textContent, 5.76, 0.15);
  doc.text(legal.textContent.toUpperCase(), 2.3, 10.75);

  const [addLine1, addLine2] = address.textContent.toUpperCase().split("/");

  doc.text(addLine1, 1, 11.05);
  doc.text(addLine2, 3.3, 11.27);

  //horizontal lines
  doc.setLineWidth(1 / 72);
  doc.line(0.5, 1.3, 7.8, 1.3);
  doc.line(0.5, 10.4, 7.8, 10.4);

  //vertical lines
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
};
// console.log(width, height);
// const now = new Date();
// const pdfName = new Intl.DateTimeFormat("hi-IN").format(now);

pdfBtn.addEventListener("click", function () {
  const pdfName = Date.now();
  let doc = new jspdf({ orientation: "p", unit: "in", format: [8.3, 11.7] }); //72 ppi,8.7 / 11.3 inch
  others(doc);
  getInputs();
  getPdfReady(doc);
  getMedicine(doc);
  getFeeDetails(doc);
  console.log(doc.getFontSize());
  console.log(pdfName);
  doc.save(`${pdfName}.pdf`);
});

// console.log(consult);

feeOptions.addEventListener("change", function (e) {
  const field = document.createElement("input");
  field.type = "text";
  const l = document.createElement("label");
  l.innerText = e.target[e.target.selectedIndex].innerText;
  field.setAttribute("for", l.innerText);

  feecontainer.append(l);
  feecontainer.append(field);
  e.target[e.target.selectedIndex].hidden = true;
  const optionArr = [...e.target];

  const optionCount = optionArr.reduce(
    (acc, ele) => (ele.hidden == true ? acc + 1 : acc),
    0
  );

  if (optionCount === e.target.length - 1) feeOptions.remove();

  e.target[0].selected = true;
});
