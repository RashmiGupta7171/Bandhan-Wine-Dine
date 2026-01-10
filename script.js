const menuData = {
  Starters: [
    { name: "Paneer Tikka", price: 180 },
    { name: "Chicken 65", price: 220 }
  ],
  "Main Course": [
    { name: "Butter Chicken", price: 320 },
    { name: "Veg Biryani", price: 200 }
  ],
  Beverages: [
    { name: "Soft Drink", price: 50 },
    { name: "Fresh Juice", price: 90 }
  ],
  Liquors: [
    { name: "Beer", price: 180 },
    { name: "Whiskey", price: 250 }
  ]
};

const menuList = document.getElementById("menuList");
const billBody = document.getElementById("billBody");
const grandTotalEl = document.getElementById("grandTotal");
const searchInput = document.getElementById("search");

function renderMenu(filter = "") {
  menuList.innerHTML = "";

  Object.entries(menuData).forEach(([category, items]) => {
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(filter)
    );

    if (!filteredItems.length) return;

    const div = document.createElement("div");
    div.className = "menu-category";
    div.innerHTML = `<h3>${category}</h3>`;

    filteredItems.forEach(item => {
      const row = document.createElement("div");
      row.className = "menu-item";
      row.innerHTML = `
        <span>${item.name} - ₹${item.price}</span>
        <button onclick='addItem("${item.name}", ${item.price})'>Add</button>
      `;
      div.appendChild(row);
    });

    menuList.appendChild(div);
  });
}

function addItem(name, price) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${name}</td>
    <td>
      <select onchange="updateTotal(this, ${price})">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </td>
    <td>${price}</td>
    <td class="item-total">${price}</td>
    <td><button onclick="removeItem(this)">Cancel</button></td>
  `;

  billBody.appendChild(row);
  calculateGrandTotal();
}

function updateTotal(select, price) {
  const qty = Number(select.value);
  const totalCell = select.closest("tr").querySelector(".item-total");
  totalCell.textContent = qty * price;
  calculateGrandTotal();
}

function removeItem(button) {
  button.closest("tr").remove();
  calculateGrandTotal();
}

function calculateGrandTotal() {
  let total = 0;
  document.querySelectorAll(".item-total").forEach(cell => {
    total += Number(cell.textContent);
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

searchInput.addEventListener("input", function () {
  renderMenu(this.value.toLowerCase());
});

renderMenu();

