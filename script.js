const menuData = {    
  Starters: [
    { name: "Paneer Tikka", price: 180 },
    { name: "Hara Bhara Kabab", price: 200 },
    { name: "veg Chrispy Indo Chienese", price: 250 },
    { name: "Corn Cheese Ball", price: 150 },
    { name: "Potato Chilly", price: 180 },
    { name: "Paneer Chilly", price: 200 },
    { name: "Gobi Manchurain", price: 150 },
    { name: "French Fries", price: 100 },
    { name: "Aloo Tikki Burger", price: 150 },
     { name: "Chicken 65", price: 220 },
      { name: "Chicken Tikka", price: 250 },
    { name: "Tandoori Chicken", price: 300 },
      { name: "Chicken Seekh Kabab", price: 250 },
      { name: "Mutton Seekh Kabab", price: 350 },
      { name: "Fish Amritsari", price: 250 },
      { name: "Prawn Koliwada", price: 400 },
      ],

  "Main Course": [
    { name: "Paneer Kadai", price: 350 },
    { name: "Veg Biryani", price: 200 },
     { name: "mix veg", price: 300 },
    { name: "Dal Tadka", price: 200 },
     { name: "Dal Makhani", price: 320 },
    { name: "Aloo Gobi Masala", price: 200 },
     { name: "Chole Bhature", price: 220 },
    { name: "Butter Chicken", price: 400 },
     { name: "Chicken Kadai", price: 420 },
    { name: "Chicken Handi", price: 450 },
     { name: "Chicken Curry", price: 320 },
    { name: "mutton Rogan Josh", price: 200 },
     { name: "Mtoon Handi", price: 450 },
    { name: "Egg Curry", price: 200 },
     { name: "Murg Masala", price: 320 },
    { name: "Chicken Lababdar", price: 350 },

  ],
  Beverages: [
    { name: "Spite", price: 50 },
     { name: "Coca Cola", price: 50 },
    { name: "Thums up", price: 50 },
    { name: "Pepsi", price: 50 },
  { name: "Mazza", price: 50 },
     { name: "Limca", price: 50 },
     { name: "Mountain Dew", price: 50 },
      { name: "Mineral Water", price: 50 },
  { name: "Pineapple juice", price: 50 },
    { name: "Fresh Juice", price: 90 }
  ],
  Liquors: [
    { name: "Beer", price: 180 },
    { name: "Whiskey", price: 250 },
     { name: "Vodka", price: 180 },
    { name: "Rum", price: 250 },
     { name: "Gin", price: 180 },
    { name: "Brandy", price: 250 },
     { name: "Mojito", price: 180 },
    { name: "Bloddy Mary", price: 250 },
     { name: "Cosmopolitan", price: 180 },
    { name: "Whiskey Sour", price: 250 },
     { name: "Screwdriver", price: 250 },
      { name: "Red Wine", price: 250 },
      { name: "White Wine", price: 250 },
      { name: "Tequila Wine", price: 250 },
      { name: "Blue Wine", price: 250 },
   { name: "Black Wine", price: 250 },
  ]
};

const menuList = document.getElementById("menuList");
const billBody = document.getElementById("billBody");
const grandTotalEl = document.getElementById("grandTotal");
const searchInput = document.getElementById("search");

function renderMenu(filter = "") {
  menuList.innerHTML = "";

  Object.entries(menuData).forEach(([category, items]) => {
    const filteredItems = items.filter(i =>
      i.name.toLowerCase().includes(filter)
    );
    if (!filteredItems.length) return;

    const div = document.createElement("div");
    div.className = "menu-category";
    div.innerHTML = `<h3>${category}</h3>`;

    filteredItems.forEach(item => {
      div.innerHTML += `
        <div class="menu-item">
          <span>${item.name} - ₹${item.price}</span>
          <button onclick='addItem("${item.name}",${item.price},"${category}")'>Add</button>
        </div>
      `;
    });

    menuList.appendChild(div);
  });
}

function addItem(name, price, category) {
  let row = [...billBody.rows].find(r => r.dataset.name === name);

  if (!row) {
    row = document.createElement("tr");
    row.dataset.name = name;
    row.dataset.category = category;
    row.dataset.half = "0";
    row.dataset.full = "1";

    let qtyUI = "";

    if (category === "Starters" || category === "Main Course") {
      qtyUI = `
        <div>
          Half:
          <button onclick="changeQty(this,'half',-1)">-</button>
          <span class="half">0</span>
          <button onclick="changeQty(this,'half',1)">+</button>
        </div>
        <div>
          Full:
          <button onclick="changeQty(this,'full',-1)">-</button>
          <span class="full">1</span>
          <button onclick="changeQty(this,'full',1)">+</button>
        </div>
      `;
    } 
    else if (category === "Liquors") {
      row.dataset.ml = "30";
      qtyUI = `
        <button onclick="changeLiquor(this,-30)">-</button>
        <span class="ml">30ml</span>
        <button onclick="changeLiquor(this,30)">+</button>
      `;
    } 
    else {
      row.dataset.count = "1";
      qtyUI = `
        <button onclick="changeNormal(this,-1)">-</button>
        <span class="count">1</span>
        <button onclick="changeNormal(this,1)">+</button>
      `;
    }

    row.innerHTML = `
      <td>${name}</td>
      <td>${qtyUI}</td>
      <td>${price}</td>
      <td class="item-total">${price}</td>
      <td><button onclick="removeItem(this)">Cancel</button></td>
    `;

    billBody.appendChild(row);
  } else {
    row.dataset.full = Number(row.dataset.full) + 1;
    row.querySelector(".full").textContent = row.dataset.full;
  }

  updateTotal(row, price);
}

function changeQty(btn, type, step) {
  const row = btn.closest("tr");
  row.dataset[type] = Math.max(0, Number(row.dataset[type]) + step);
  row.querySelector("." + type).textContent = row.dataset[type];
  updateTotal(row, Number(row.children[2].textContent));
}

function changeLiquor(btn, step) {
  const row = btn.closest("tr");
  let ml = Math.max(0, Number(row.dataset.ml) + step);
  if (ml > 750) ml = 750;
  row.dataset.ml = ml;
  row.querySelector(".ml").textContent = ml >= 750 ? "Full" : ml + "ml";
  updateTotal(row, Number(row.children[2].textContent));
}

function changeNormal(btn, step) {
  const row = btn.closest("tr");
  row.dataset.count = Math.max(0, Number(row.dataset.count) + step);
  if (row.dataset.count === "0") row.remove();
  else row.querySelector(".count").textContent = row.dataset.count;
  calculateGrandTotal();
}

function updateTotal(row, price) {
  const cat = row.dataset.category;
  let total = 0;

  if (cat === "Starters" || cat === "Main Course") {
    total =
      Number(row.dataset.half) * price * 0.5 +
      Number(row.dataset.full) * price;
  } 
  else if (cat === "Liquors") {
    total = (Number(row.dataset.ml) / 100) * price;
  } 
  else {
    total = Number(row.dataset.count) * price;
  }

  row.querySelector(".item-total").textContent = Math.round(total);
  calculateGrandTotal();
}

function removeItem(btn) {
  btn.closest("tr").remove();
  calculateGrandTotal();
}

function calculateGrandTotal() {
  let total = 0;
  document.querySelectorAll(".item-total").forEach(td => {
    total += Number(td.textContent);
  });
  grandTotalEl.textContent = total;
}

function cancelBill() {
  billBody.innerHTML = "";
  calculateGrandTotal();
}

function printBill() {
  window.print();
}

searchInput.addEventListener("input", e => {
  renderMenu(e.target.value.toLowerCase());
});

renderMenu();

