const menuData = {
  "Veg Varieties": [
    { name: "Paneer Pakoda", half: 140, full: 260 },
    { name: "Paneer Chilli", half: 160, full: 280 },
    { name: "Paneer Stick", half: 170, full: 300 },
    { name: "Sweet Corn", half: null, full: 90 },
    { name: "Crispy Corn", half: null, full: 130 },
    { name: "French Fries(Masala/Peri Peri)", half: null, full: 110 },
    { name: "Chilli Potato", half: null, full: 130 },
    { name: "Veg Manchurian(Dry)", half: 90, full: 170},
    { name: "Veg Manchurian(Gravy)", half:110, full: 190 }
  ],

 "Sedeko Items": [
    { name: "Peanuts Bhuja/Chiura", half: 50, full: 100 },
    { name: "Bhatmas Bhuja/Chiura", half: 50, full: 100 },
    { name: "Peanut Bhatmas", half: 80, full: 140 },
    { name: "Peanut Sadeko", half: 60, full: 100 },
    { name: "Peanut Chawchaw Sadeko", half: 80, full: 120 },
    { name: "Chawchaw Sadeko", half: null, full: 60 },
     { name: "ChawChaw Chiura/Bhuja Sadeko", half: null, full: 70 },
      { name: "Kaju Fry", half: 150, full: 250 },
      { name: "Prawn Chips", half: 50, full: 100 },
      { name: "Pop Corn", half: null, full: 30 },
  ],

  "Chowmein Items": [
    { name: "Veg Chowmein", half: 60, full: 110 },
    { name: "Paneer Chowmein", half: 100, full: 190 },
    { name: "Chicken Chowmein", half: 100, full: 190 },
    { name: "Egg Chowmein", half: 90, full: 170 },
    { name: "Egg Chicken Chowmein", half: 130, full: 240 },
    { name: "Ramen", half: null, full: 80 },
     { name: "Egg Ramen", half: null, full: 110 },
     { name: "Sausage Ramen", half: null, full: 130 },
     { name: "Egg Sausage Ramen", half: null, full: 160 },
  ],



  "Momo Items": [
    { name: "Veg Momo", half: 60, full: 120 },
    { name: "Fry Veg Momo", half: 70, full: 130 },
    { name: "Veg Jhol Momo", half: null, full: 150 },
    { name: "Veg Chilli Momo", half: 100, full: 190 },
    { name: "Chicken Momo", half: 80, full: 150 },
    { name: "Chicken Fry Momo", half: 90, full: 160 },
     { name: "Chicken Chilli Momo", half: 130, full: 250 },
      { name: "Chicken Jhol Momo", half: 110, full: 200 },
  ],

   "Chicken Items": [
    { name: "Chicken Fry", half: 140, full: 260 },
    { name: "Chicken Sekuwa", half: 150, full: 280 },
    { name: "Chicken Lollipop Fry", half: 160, full: 300 },
    { name: "Chicken Chilly", half: 170, full: 350 },
    { name: "Chicken Leg Fry", half: null, full: 200 },
    { name: "Chicken leg Sekuwa", half: null, full: 240 },
   { name: "Chicken Gravy", half: 110, full: 200 },
    { name: "Chicken Manchurian(Dry)", half: 180, full: 340 },
     { name: "Chicken Manchurian(Gravy)", half: 200, full: 360 },
     { name: "Chicken Sausage(6pc)", half: 150, full: 300 },
    { name: "Chicken Choila", half: 160, full: 300 },
  ],


 "Mutton Items": [
    { name: "Mutton Gravy", half: 180, full: 350 },
    { name: "Mutton Sekuwa", half: 190, full: 380 },
    { name: "Mutton Bhutuwa", half: 120, full: 230 },
    { name: "Mutton Chapli Kabab", half: null, full: 300 }
  ],

  "Egg Items": [
    { name: "Boiled Egg", half: 80, full: 150 },
    { name: "Omlette", half: 40, full: 70 },
  ],



  "Rice Items": [
    { name: "Plain Rice", half: null, full: 60 },
    { name: "Jeera Rice", half: null, full: 70 },
    { name: "Veg Fried Rice", half: null, full: 90 },
    { name: "Paneer Fried Rice", half: null, full: 110 },
    { name: "Egg Fried Rice", half: null, full: 100 },
    { name: "Chicken Fried Rice", half: null, full: 140 },
     { name: "Egg Chicken Fried Rice", half: null, full: 160 }
  ],

  "Khana": [
    { name: "Veg Khana", half: null, full: 200 },
    { name: "Chicken Khana", half: null, full: 250 },
    { name: "Mutton Khana", half: null, full: 350 }
  ],

  "Beverages": [
    { name: "Tea", half: null, full: 25 },
    { name: "Coffee", half: null, full: 30 },
    { name: "Hookah", half: null, full: 450 },
  ]
};


// ================= ELEMENTS =================
const menuList = document.getElementById("menuList");
const billBody = document.getElementById("billBody");
const grandTotalEl = document.getElementById("grandTotal");
const searchInput = document.getElementById("search");


// ================= MENU RENDER =================
function renderMenu(filter = "") {
  menuList.innerHTML = "";

  Object.entries(menuData).forEach(([category, items]) => {

    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(filter)
    );

    if (!filteredItems.length) return;

    const div = document.createElement("div");
    div.className = "menu-category";

    let html = `
      <div class="menu-title-row">
        <h3>${category}</h3>
        <div class="title-prices">
          <span>Half</span>
          <span>Full</span>
        </div>
      </div>
    `;

    filteredItems.forEach((item, index) => {
      html += `
        <div class="menu-row">
          <div class="col-item">${index + 1}. ${item.name}</div>

          <div class="col-half">
            ${
              item.half
                ? `<button onclick='addItem("${item.name}", ${item.half}, "half")'>${item.half}</button>`
                : "-"
            }
          </div>

          <div class="col-full">
            <button onclick='addItem("${item.name}", ${item.full}, "full")'>
              ${item.full}
            </button>
          </div>
        </div>
      `;
    });

    div.innerHTML = html;
    menuList.appendChild(div);
  });
}


// ================= ADD ITEM =================
// function addItem(name, price, type) {
//   if (!price) return;

//   const key = name + "-" + type;

//   let row = [...billBody.rows].find(r => r.dataset.key === key);

//   if (!row) {
//     row = document.createElement("tr");
//     row.dataset.key = key;
//     row.dataset.price = price;
//     row.dataset.count = "1";

//     row.innerHTML = `
//       <td>${name} (${type})</td>
//       <td>
//         <button onclick="changeQty(this,-1)">-</button>
//         <span class="count">1</span>
//         <button onclick="changeQty(this,1)">+</button>
//       </td>
//       <td>${price}</td>
//       <td class="item-total">${price}</td>
//       <td><button onclick="removeItem(this)">X</button></td>
//     `;

//     billBody.appendChild(row);
//   } else {
//     row.dataset.count = Number(row.dataset.count) + 1;
//     row.querySelector(".count").textContent = row.dataset.count;
//   }

//   updateTotal(row);
// }
function addItem(name, price, type) {
  if (!price) return;

  const key = name + "-" + type;

  let row = [...billBody.rows].find(r => r.dataset.key === key);

  if (!row) {
    row = document.createElement("tr");
    row.dataset.key = key;
    row.dataset.price = price;
    row.dataset.count = "1";

    row.innerHTML = `
      <td>${name} (${type})</td>
      <td>
        <button onclick="changeQty(this,-1)">-</button>
        <span class="count">1</span>
        <button onclick="changeQty(this,1)">+</button>
      </td>
      <td>${price}</td>
      <td class="item-total">${price}</td>
      <td><button onclick="removeItem(this)">X</button></td>
    `;

    billBody.appendChild(row);
  } else {
    row.dataset.count = Number(row.dataset.count) + 1;
    row.querySelector(".count").textContent = row.dataset.count;
  }

  updateTotal(row);

  // ✅ IMPORTANT FIX
  calculateGrandTotal();
}


// ================= CHANGE QTY =================
function changeQty(btn, step) {
  const row = btn.closest("tr");

  let count = Math.max(0, Number(row.dataset.count) + step);

  if (count === 0) {
    row.remove();
  } else {
    row.dataset.count = count;
    row.querySelector(".count").textContent = count;
    updateTotal(row);
  }

  calculateGrandTotal();
}


// ================= UPDATE TOTAL =================
function updateTotal(row) {
  const price = Number(row.dataset.price);
  const count = Number(row.dataset.count);

  row.querySelector(".item-total").textContent = price * count;
}


// ================= REMOVE =================
function removeItem(btn) {
  btn.closest("tr").remove();
  calculateGrandTotal();
}


// ================= GRAND TOTAL =================
function calculateGrandTotal() {
  let total = 0;

  document.querySelectorAll(".item-total").forEach(td => {
    total += Number(td.textContent);
  });

  grandTotalEl.textContent = total;
}


// ================= SEARCH =================
searchInput.addEventListener("input", function (e) {
  renderMenu(e.target.value.toLowerCase());
});

// ================= CANCEL BILL =================
function cancelBill() {
  billBody.innerHTML = "";   // remove all items
  calculateGrandTotal();     // reset total
}


// ================= PRINT BILL =================
function printBill() {
  window.print();            // open print dialog
}

// ================= INIT =================
renderMenu();