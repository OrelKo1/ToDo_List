let items = [];
const itemsDiv = document.getElementById("items");
const input = document.getElementById("itemInput");
const storageKey = "items";

function loadItems() {
    const oldItems = localStorage.getItem(storageKey);
    if (oldItems) items = JSON.parse(oldItems);
    renderItems();
}

function renderItems() {
    itemsDiv.innerHTML = '';

    items.forEach((item, idx) => {
        const container = document.createElement("div");
        container.className = 'item-container';

        const text = document.createElement("p");
        text.className = 'item-text';
        text.textContent = item;

        const button = document.createElement("button");
        button.className = 'item-button';
        button.textContent = "Delete";
        button.onclick = () => removeItem(idx);

        container.appendChild(text);
        container.appendChild(button);

        itemsDiv.appendChild(container);
    });
}

function saveItems() {
    localStorage.setItem(storageKey, JSON.stringify(items));
}

function addItem() {
    const value = input.value.trim();
    if (!value) {
        alert("You cannot add an empty item");
        return;
    }
    items.push(value);
    renderItems();
    input.value = "";
    saveItems();
}

function removeItem(idx) {
    items.splice(idx, 1);
    renderItems();
    saveItems();
}

// Add event listener for the Enter key
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addItem();
        event.preventDefault(); // Prevent form submission if within a form
    }
});

document.addEventListener("DOMContentLoaded", loadItems);
