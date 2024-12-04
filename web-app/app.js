const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const db = require('./models/db');
async function fetchItems() {
    const response = await fetch('/api/items');
    const items = await response.json();
    const table = document.getElementById('itemsTable');
    table.innerHTML = '';
    items.forEach(item => {
        table.innerHTML += `
            <tr>
                <td class="border px-4 py-2">${item.id}</td>
                <td class="border px-4 py-2">${item.name}</td>
                <td class="border px-4 py-2">${item.description || 'N/A'}</td>
                <td class="border px-4 py-2">
                    <button class="bg-yellow-500 text-white px-2 py-1 rounded" onclick="openEditItemModal(${item.id})">Edit</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="openDeleteItemModal(${item.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

document.getElementById('addItemForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
    });
    closeAddItemModal();
    fetchItems();
});

function openAddItemModal() {
    document.getElementById('addItemModal').classList.remove('hidden');
}
function closeAddItemModal() {
    document.getElementById('addItemModal').classList.add('hidden');
}
const session = require('express-session');

app.use(session({
    secret: 'your_secret_key', // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use true if using HTTPS
}));

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
