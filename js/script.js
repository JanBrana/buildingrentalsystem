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
function addBuilding(){

    let name = document.getElementById("buildingName").value;
    let address = document.getElementById("buildingAddress").value;
    let floors = document.getElementById("buildingFloors").value;
    let rooms = document.getElementById("buildingRooms").value;
    let type = document.getElementById("buildingType").value;
    let status = document.getElementById("buildingStatus").value;

    if(name==="" || address==="" || floors==="" || rooms==="" || type===""){

        alert("Please complete all fields.");
        return;

    }

    let table=document.getElementById("buildingTable");

    let row=table.insertRow(-1);

    row.insertCell(0).innerHTML=table.rows.length-1;
    row.insertCell(1).innerHTML=name;
    row.insertCell(2).innerHTML=address;
    row.insertCell(3).innerHTML=floors;
    row.insertCell(4).innerHTML=rooms;
    row.insertCell(5).innerHTML=type;
    row.insertCell(6).innerHTML=status;

    row.insertCell(7).innerHTML=`
        <button onclick="editBuilding(this)">Edit</button>
        <button onclick="deleteBuilding(this)">Delete</button>
    `;

    // Clear Fields
    document.getElementById("buildingName").value="";
    document.getElementById("buildingAddress").value="";
    document.getElementById("buildingFloors").value="";
    document.getElementById("buildingRooms").value="";
    document.getElementById("buildingType").selectedIndex=0;
    document.getElementById("buildingStatus").selectedIndex=0;

    closeModal();

}

// Edit Building
function editBuilding(button){

    let row = button.parentNode.parentNode;

    let building = row.cells[1];
    let address = row.cells[2];
    let floors = row.cells[3];
    let rooms = row.cells[4];
    let type = row.cells[5];
    let status = row.cells[6];

    if(button.innerHTML==="Save"){

        building.innerHTML = building.querySelector("input").value;
        address.innerHTML = address.querySelector("input").value;
        floors.innerHTML = floors.querySelector("input").value;
        rooms.innerHTML = rooms.querySelector("input").value;
        type.innerHTML = type.querySelector("select").value;
        status.innerHTML = status.querySelector("select").value;

        button.innerHTML="Edit";
        return;

    }

    building.innerHTML = `<input type="text" value="${building.innerText}">`;

    address.innerHTML = `<input type="text" value="${address.innerText}">`;

    floors.innerHTML = `<input type="number" value="${floors.innerText}">`;

    rooms.innerHTML = `<input type="number" value="${rooms.innerText}">`;

    type.innerHTML = `
        <select>
            <option ${type.innerText=="Commercial Building"?"selected":""}>Commercial Building</option>
            <option ${type.innerText=="Office Building"?"selected":""}>Office Building</option>
            <option ${type.innerText=="Mixed Use Building"?"selected":""}>Mixed Use Building</option>
            <option ${type.innerText=="Warehouse"?"selected":""}>Warehouse</option>
        </select>
    `;

    status.innerHTML = `
        <select>
            <option ${status.innerText=="Active"?"selected":""}>Active</option>
            <option ${status.innerText=="Under Maintenance"?"selected":""}>Under Maintenance</option>
            <option ${status.innerText=="Inactive"?"selected":""}>Inactive</option>
        </select>
    `;

    button.innerHTML="Save";

}
// Delete Building
function deleteBuilding(button){

    if(confirm("Are you sure you want to delete this building?")){

        let row = button.parentNode.parentNode;

        row.remove();

        // Renumber IDs
        let table = document.getElementById("buildingTable");

        for(let i=1;i<table.rows.length;i++){

            table.rows[i].cells[0].innerHTML=i;

        }

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
// TENANT MANAGEMENT
// =======================

function openTenantModal(){

    document.getElementById("tenantModal").style.display="block";

}

function closeTenantModal(){

    document.getElementById("tenantModal").style.display="none";

}

function addTenant(){

    let company=document.getElementById("company").value;
    let contact=document.getElementById("contactPerson").value;
    let number=document.getElementById("contactNumber").value;
    let email=document.getElementById("tenantEmail").value;
    let status=document.getElementById("tenantStatus").value;

    if(company==="" || contact==="" || number==="" || email===""){

        alert("Please fill in all fields.");
        return;

    }

    let table=document.getElementById("tenantTable");

    let row=table.insertRow(-1);

    row.insertCell(0).innerHTML=table.rows.length-1;
    row.insertCell(1).innerHTML=company;
    row.insertCell(2).innerHTML=contact;
    row.insertCell(3).innerHTML=number;
    row.insertCell(4).innerHTML=email;
    row.insertCell(5).innerHTML=status;

    row.insertCell(6).innerHTML=`
        <button onclick="editTenant(this)">Edit</button>
        <button onclick="deleteTenant(this)">Delete</button>
    `;

    document.getElementById("company").value="";
    document.getElementById("contactPerson").value="";
    document.getElementById("contactNumber").value="";
    document.getElementById("tenantEmail").value="";
    document.getElementById("tenantStatus").selectedIndex=0;

    closeTenantModal();

}

function editTenant(button){

    let row = button.parentNode.parentNode;

    let company = row.cells[1];
    let contact = row.cells[2];
    let number = row.cells[3];
    let email = row.cells[4];
    let status = row.cells[5];

    // Save changes
    if(button.innerHTML === "Save"){

        company.innerHTML = company.querySelector("input").value;
        contact.innerHTML = contact.querySelector("input").value;
        number.innerHTML = number.querySelector("input").value;
        email.innerHTML = email.querySelector("input").value;
        status.innerHTML = status.querySelector("select").value;

        button.innerHTML = "Edit";
        return;
    }

    // Edit mode
    company.innerHTML = `<input type="text" value="${company.innerText}">`;
    contact.innerHTML = `<input type="text" value="${contact.innerText}">`;
    number.innerHTML = `<input type="text" value="${number.innerText}">`;
    email.innerHTML = `<input type="email" value="${email.innerText}">`;

    status.innerHTML = `
        <select>
            <option ${status.innerText=="Active"?"selected":""}>Active</option>
            <option ${status.innerText=="Pending Approval"?"selected":""}>Pending Approval</option>
            <option ${status.innerText=="Reserved"?"selected":""}>Reserved</option>
            <option ${status.innerText=="Contract Expiring"?"selected":""}>Contract Expiring</option>
            <option ${status.innerText=="Renewed"?"selected":""}>Renewed</option>
            <option ${status.innerText=="Terminated"?"selected":""}>Terminated</option>
            <option ${status.innerText=="Inactive"?"selected":""}>Inactive</option>
        </select>
    `;

    button.innerHTML = "Save";
}

function deleteTenant(button){

    if(confirm("Are you sure you want to delete this tenant?")){

        button.parentNode.parentNode.remove();

    }

}

// =======================
// ROOM MANAGEMENT
// =======================

function openRoomModal(){

    document.getElementById("roomModal").style.display="block";

}

function closeRoomModal(){

    document.getElementById("roomModal").style.display="none";

}

function addRoom(){

    let building=document.getElementById("roomBuilding").value;
    let number=document.getElementById("roomNumber").value;
    let floor=document.getElementById("roomFloor").value;
    let type=document.getElementById("roomType").value;
    let rent=document.getElementById("roomRent").value;
    let status=document.getElementById("roomStatus").value;

    if(number==="" || floor==="" || rent===""){

        alert("Please complete all fields.");

        return;

    }

    let table=document.getElementById("roomTable");

    let row=table.insertRow(-1);

    row.insertCell(0).innerHTML=table.rows.length-1;
    row.insertCell(1).innerHTML=building;
    row.insertCell(2).innerHTML=number;
    row.insertCell(3).innerHTML=floor;
    row.insertCell(4).innerHTML=type;
    row.insertCell(5).innerHTML="₱"+Number(rent).toLocaleString();
    row.insertCell(6).innerHTML=status;

    row.insertCell(7).innerHTML=`
        <button onclick="editRoom(this)">Edit</button>
        <button onclick="deleteRoom(this)">Delete</button>
    `;

    document.getElementById("roomNumber").value="";
    document.getElementById("roomFloor").value="";
    document.getElementById("roomRent").value="";

    closeRoomModal();

}

function editRoom(button){

    let row=button.parentNode.parentNode;

    let building=row.cells[1];
    let number=row.cells[2];
    let floor=row.cells[3];
    let type=row.cells[4];
    let rent=row.cells[5];
    let status=row.cells[6];

    if(button.innerHTML==="Save"){

        building.innerHTML=building.querySelector("input").value;
        number.innerHTML=number.querySelector("input").value;
        floor.innerHTML=floor.querySelector("input").value;
        type.innerHTML=type.querySelector("input").value;
        rent.innerHTML=rent.querySelector("input").value;
        status.innerHTML=status.querySelector("input").value;

        button.innerHTML="Edit";

        return;

    }

    building.innerHTML=`<input value="${building.innerText}">`;
    number.innerHTML=`<input value="${number.innerText}">`;
    floor.innerHTML=`<input value="${floor.innerText}">`;
    type.innerHTML=`<input value="${type.innerText}">`;
    rent.innerHTML=`<input value="${rent.innerText.replace("₱","")}">`;
    status.innerHTML=`<input value="${status.innerText}">`;

    button.innerHTML="Save";

}

function deleteRoom(button){

    if(confirm("Delete this room?")){

        button.parentNode.parentNode.remove();

    }

}
// =======================
// Logout
// =======================
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}
