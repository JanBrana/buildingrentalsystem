console.log("script.js loaded");

// =======================
// Building Management
// =======================

// Open Modal
function openModal() {
    document.getElementById("buildingModal").style.display = "block";
}

// Close Modal
function closeModal() {
    document.getElementById("buildingModal").style.display = "none";
}

// Add Building
function addBuilding() {
    let name = document.getElementById("buildingName").value;
    let address = document.getElementById("buildingAddress").value;

    if (name === "" || address === "") {
        alert("Please fill in all fields.");
        return;
    }

    let table = document.getElementById("buildingTable");
    let row = table.insertRow(-1);

    row.insertCell(0).innerHTML = table.rows.length - 1;
    row.insertCell(1).innerHTML = name;
    row.insertCell(2).innerHTML = address;
    row.insertCell(3).innerHTML = `
        <button onclick="editBuilding(this)">Edit</button>
        <button onclick="deleteBuilding(this)">Delete</button>
    `;

    document.getElementById("buildingName").value = "";
    document.getElementById("buildingAddress").value = "";

    closeModal();
}

// Edit Building
function editBuilding(button) {
    let row = button.parentNode.parentNode;
    let buildingCell = row.cells[1];
    let addressCell = row.cells[2];

    if (button.innerHTML === "Save") {
        buildingCell.innerHTML = buildingCell.querySelector("input").value;
        addressCell.innerHTML = addressCell.querySelector("input").value;
        button.innerHTML = "Edit";
        return;
    }

    buildingCell.innerHTML = `<input type="text" value="${buildingCell.textContent}">`;
    addressCell.innerHTML = `<input type="text" value="${addressCell.textContent}">`;
    button.innerHTML = "Save";
}

// Delete Building
function deleteBuilding(button) {
    if (confirm("Are you sure you want to delete this building?")) {
        let row = button.parentNode.parentNode;
        row.remove();
    }
}

// =======================
// Login Function
// =======================
function login(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    // Clear previous login
    localStorage.clear();

    // Super Admin
    if (email === "superadmin@jefarelid.com" && password === "admin123") {
        localStorage.setItem("role", "superadmin");
        localStorage.setItem("name", "Super Admin");
        window.location.href = "dashboard.html";
        return;
    }

    // Admin
    if (email === "admin@jefarelid.com" && password === "admin123") {
        localStorage.setItem("role", "admin");
        localStorage.setItem("name", "Admin");
        window.location.href = "dashboard.html";
        return;
    }

    alert("Invalid Email or Password");
}

// =======================
// Dashboard Role Check (Temporary Debug Version)
// =======================
window.onload = function () {

    let welcome = document.getElementById("welcome");

    if (!welcome) return;

    let role = localStorage.getItem("role");
    let name = localStorage.getItem("name");

    console.log("Role =", role);
    console.log("Name =", name);

    if (!role) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("welcome").innerHTML = "Welcome, " + name;

    let superAdminMenu = document.getElementById("superAdminMenu");

    if (role === "admin") {
        console.log("Hide menu");
        superAdminMenu.style.display = "none";
    } else {
        console.log("Show menu");
        superAdminMenu.style.display = "block";
    }
};


// =======================
// Logout
// =======================
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}
