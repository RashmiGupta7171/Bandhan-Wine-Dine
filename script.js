let total = 0;

function addItem(name, type, price) {
    const table = document.getElementById("bill-items");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${type}</td>
        <td>₹${price}</td>
        <td>
            <button class="remove-btn" onclick="removeItem(this, ${price})">
                Cancel
            </button>
        </td>
    `;

    table.appendChild(row);

    total += price;
    document.getElementById("total").innerText = total;
}

function removeItem(button, price) {
    button.parentElement.parentElement.remove();
    total -= price;
    document.getElementById("total").innerText = total;
}

function clearBill() {
    document.getElementById("bill-items").innerHTML = "";
    total = 0;
    document.getElementById("total").innerText = total;
}

function printBill() {
    window.print();
}
