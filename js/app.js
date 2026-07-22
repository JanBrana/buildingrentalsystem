


const APP_KEY = "jefarelid_rental_system";


function getData() {
    const raw = localStorage.getItem(APP_KEY);
    if (raw) return JSON.parse(raw);
    return seedData();
}

function saveData(data) {
    localStorage.setItem(APP_KEY, JSON.stringify(data));
}

function seedData() {
    const data = {
        buildings: [
            { id: 1, name: "Main Tower", address: "123 Central Ave, Makati City", floors: 5, totalRooms: 20, type: "Commercial Building", status: "Active" },
            { id: 2, name: "Building B", address: "456 Business Park, Taguig City", floors: 3, totalRooms: 12, type: "Office Building", status: "Active" },
            { id: 3, name: "Warehouse C", address: "789 Industrial Rd, Pasig City", floors: 1, totalRooms: 8, type: "Warehouse", status: "Active" }
        ],
        rooms: [
            { id: 1, buildingId: 1, buildingName: "Main Tower", number: "101", floor: 1, type: "Office", rent: 15000, status: "Occupied" },
            { id: 2, buildingId: 1, buildingName: "Main Tower", number: "102", floor: 1, type: "Office", rent: 15000, status: "Vacant" },
            { id: 3, buildingId: 1, buildingName: "Main Tower", number: "201", floor: 2, type: "Commercial", rent: 25000, status: "Occupied" },
            { id: 4, buildingId: 2, buildingName: "Building B", number: "101", floor: 1, type: "Office", rent: 12000, status: "Vacant" },
            { id: 5, buildingId: 3, buildingName: "Warehouse C", number: "W-01", floor: 1, type: "Storage", rent: 8000, status: "Maintenance" }
        ],
        tenants: [
            { id: 1, company: "ABC Trading Corp.", contactPerson: "Juan Dela Cruz", contactNumber: "09123456789", email: "abc@example.com", status: "Active" },
            { id: 2, company: "XYZ Solutions Inc.", contactPerson: "Maria Santos", contactNumber: "09987654321", email: "xyz@example.com", status: "Active" },
            { id: 3, company: "Global Logistics PH", contactPerson: "Pedro Reyes", contactNumber: "09171234567", email: "global@example.com", status: "Pending Approval" }
        ],
        contracts: [
            { id: 1, tenantId: 1, tenantName: "ABC Trading Corp.", roomId: 1, roomNumber: "101", buildingName: "Main Tower", startDate: "2025-01-01", endDate: "2025-12-31", monthlyRent: 15000, deposit: 30000, status: "Active" },
            { id: 2, tenantId: 2, tenantName: "XYZ Solutions Inc.", roomId: 3, roomNumber: "201", buildingName: "Main Tower", startDate: "2025-03-01", endDate: "2026-02-28", monthlyRent: 25000, deposit: 50000, status: "Active" }
        ],
        payments: [
            { id: 1, contractId: 1, tenantName: "ABC Trading Corp.", type: "Rent", amount: 15000, date: "2025-07-01", method: "Bank Transfer", reference: "TXN-20250701-001", status: "Paid" },
            { id: 2, contractId: 2, tenantName: "XYZ Solutions Inc.", type: "Rent", amount: 25000, date: "2025-07-01", method: "Check", reference: "CHK-8842", status: "Paid" },
            { id: 3, contractId: 1, tenantName: "ABC Trading Corp.", type: "Rent", amount: 15000, date: "2025-08-01", method: "Cash", reference: "CSH-001", status: "Pending" }
        ],
        utilities: [
            { id: 1, roomId: 1, roomNumber: "101", tenantName: "ABC Trading Corp.", type: "Electricity", previousReading: 1200, currentReading: 1450, rate: 12.5, billingPeriod: "July 2025", status: "Paid" },
            { id: 2, roomId: 1, roomNumber: "101", tenantName: "ABC Trading Corp.", type: "Water", previousReading: 80, currentReading: 95, rate: 45, billingPeriod: "July 2025", status: "Pending" },
            { id: 3, roomId: 3, roomNumber: "201", tenantName: "XYZ Solutions Inc.", type: "Electricity", previousReading: 2000, currentReading: 2350, rate: 12.5, billingPeriod: "July 2025", status: "Pending" }
        ],
        users: [
            { id: 1, name: "Super Admin", email: "superadmin@jefarelid.com", password: "admin123", role: "superadmin" },
            { id: 2, name: "Admin", email: "admin@jefarelid.com", password: "admin123", role: "admin" },
            { id: 3, name: "Staff User", email: "staff@jefarelid.com", password: "staff123", role: "admin" }
        ],
        auditLogs: [],
        nextIds: { buildings: 4, rooms: 6, tenants: 4, contracts: 3, payments: 4, utilities: 4, users: 4, auditLogs: 1 }
    };
    saveData(data);
    return data;
}

function nextId(data, entity) {
    const id = data.nextIds[entity];
    data.nextIds[entity]++;
    return id;
}

function formatCurrency(amount) {
    return "₱" + Number(amount).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateStr) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
}

function showToast(message, type = "success") {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }
    toast.className = "toast toast-" + type;
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 3000);
}


function logAudit(action, module, details) {
    const data = getData();
    const user = localStorage.getItem("name") || "Unknown";
    data.auditLogs.unshift({
        id: nextId(data, "auditLogs"),
        user,
        action,
        module,
        details,
        timestamp: new Date().toISOString()
    });
    if (data.auditLogs.length > 200) data.auditLogs = data.auditLogs.slice(0, 200);
    saveData(data);
}


function login(event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    const data = getData();
    const user = data.users.find(u => u.email.toLowerCase() === email && u.password === password);

    if (user) {
        localStorage.setItem("role", user.role);
        localStorage.setItem("name", user.name);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("email", user.email);
        logAudit("Login", "Authentication", user.name + " logged in");
        window.location.href = "dashboard.html";
        return;
    }
    showToast("Invalid email or password", "error");
}

function logout() {
    logAudit("Logout", "Authentication", (localStorage.getItem("name") || "User") + " logged out");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    window.location.href = "index.html";
}

function requireAuth() {
    if (!localStorage.getItem("role")) {
        window.location.href = "index.html";
        return false;
    }
    return true;
}

function initPage() {
    if (!requireAuth()) return;

    const welcome = document.getElementById("welcome");
    if (welcome) {
        welcome.textContent = "Welcome, " + (localStorage.getItem("name") || "User");
    }

    const role = localStorage.getItem("role");
    const superAdminMenu = document.getElementById("superAdminMenu");
    if (superAdminMenu) {
        superAdminMenu.style.display = role === "superadmin" ? "block" : "none";
    }

    const activePage = document.body.dataset.page;
    if (activePage) {
        document.querySelectorAll(".sidebar a[data-page]").forEach(link => {
            if (link.dataset.page === activePage) link.classList.add("active");
        });
    }

    const pageInit = window.pageInit;
    if (typeof pageInit === "function") pageInit();
}


function loadDashboard() {
    const data = getData();
    const occupied = data.rooms.filter(r => r.status === "Occupied").length;
    const vacant = data.rooms.filter(r => r.status === "Vacant").length;
    const activeContracts = data.contracts.filter(c => c.status === "Active").length;
    const pendingPayments = data.payments.filter(p => p.status === "Pending").length;
    const pendingUtilities = data.utilities.filter(u => u.status === "Pending").length;
    const totalRevenue = data.payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);

    setText("statBuildings", data.buildings.length);
    setText("statRooms", data.rooms.length);
    setText("statTenants", data.tenants.length);
    setText("statContracts", activeContracts);
    setText("statOccupied", occupied);
    setText("statVacant", vacant);
    setText("statPendingPayments", pendingPayments);
    setText("statPendingUtilities", pendingUtilities);
    setText("statRevenue", formatCurrency(totalRevenue));

    renderRecentPayments(data);
    renderExpiringContracts(data);
}

function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
}

function renderRecentPayments(data) {
    const tbody = document.getElementById("recentPaymentsBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    const recent = [...data.payments].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
    recent.forEach(p => {
        tbody.innerHTML += `<tr>
            <td>${p.tenantName}</td>
            <td>${p.type}</td>
            <td>${formatCurrency(p.amount)}</td>
            <td>${formatDate(p.date)}</td>
            <td><span class="badge badge-${p.status === "Paid" ? "success" : "warning"}">${p.status}</span></td>
        </tr>`;
    });
    if (recent.length === 0) tbody.innerHTML = '<tr><td colspan="5" class="empty">No payments recorded yet.</td></tr>';
}

function renderExpiringContracts(data) {
    const tbody = document.getElementById("expiringContractsBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    const today = new Date();
    const in90Days = new Date(today);
    in90Days.setDate(in90Days.getDate() + 90);

    const expiring = data.contracts.filter(c => {
        const end = new Date(c.endDate);
        return c.status === "Active" && end >= today && end <= in90Days;
    }).sort((a, b) => a.endDate.localeCompare(b.endDate));

    expiring.forEach(c => {
        tbody.innerHTML += `<tr>
            <td>${c.tenantName}</td>
            <td>${c.buildingName} — ${c.roomNumber}</td>
            <td>${formatDate(c.endDate)}</td>
            <td><span class="badge badge-warning">Expiring Soon</span></td>
        </tr>`;
    });
    if (expiring.length === 0) tbody.innerHTML = '<tr><td colspan="4" class="empty">No contracts expiring within 90 days.</td></tr>';
}



function openModal() { document.getElementById("buildingModal").style.display = "block"; }
function closeModal() { document.getElementById("buildingModal").style.display = "none"; resetBuildingForm(); }

function resetBuildingForm() {
    document.getElementById("buildingEditId").value = "";
    document.getElementById("buildingName").value = "";
    document.getElementById("buildingAddress").value = "";
    document.getElementById("buildingFloors").value = "";
    document.getElementById("buildingRooms").value = "";
    document.getElementById("buildingType").selectedIndex = 0;
    document.getElementById("buildingStatus").selectedIndex = 0;
    const title = document.querySelector("#buildingModal h2");
    if (title) title.textContent = "Add Building";
}

function loadBuildings() {
    const data = getData();
    const tbody = document.getElementById("buildingTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    data.buildings.forEach(b => {
        tbody.innerHTML += `<tr>
            <td>${b.id}</td>
            <td>${b.name}</td>
            <td>${b.address}</td>
            <td>${b.floors}</td>
            <td>${b.totalRooms}</td>
            <td>${b.type}</td>
            <td><span class="badge badge-${b.status === "Active" ? "success" : b.status === "Under Maintenance" ? "warning" : "danger"}">${b.status}</span></td>
            <td class="actions">
                <button class="btn-sm btn-edit" onclick="editBuilding(${b.id})">Edit</button>
                <button class="btn-sm btn-delete" onclick="deleteBuilding(${b.id})">Delete</button>
            </td>
        </tr>`;
    });
}

function addBuilding() {
    const editId = document.getElementById("buildingEditId").value;
    const name = document.getElementById("buildingName").value.trim();
    const address = document.getElementById("buildingAddress").value.trim();
    const floors = parseInt(document.getElementById("buildingFloors").value);
    const totalRooms = parseInt(document.getElementById("buildingRooms").value);
    const type = document.getElementById("buildingType").value;
    const status = document.getElementById("buildingStatus").value;

    if (!name || !address || !floors || !totalRooms || !type) {
        showToast("Please complete all fields", "error");
        return;
    }

    const data = getData();
    if (editId) {
        const b = data.buildings.find(x => x.id === parseInt(editId));
        if (b) {
            Object.assign(b, { name, address, floors, totalRooms, type, status });
            data.rooms.forEach(r => { if (r.buildingId === b.id) r.buildingName = name; });
            logAudit("Update", "Buildings", `Updated building: ${name}`);
            showToast("Building updated successfully");
        }
    } else {
        const id = nextId(data, "buildings");
        data.buildings.push({ id, name, address, floors, totalRooms, type, status });
        logAudit("Create", "Buildings", `Added building: ${name}`);
        showToast("Building added successfully");
    }
    saveData(data);
    closeModal();
    loadBuildings();
    populateBuildingDropdowns();
}

function editBuilding(id) {
    const data = getData();
    const b = data.buildings.find(x => x.id === id);
    if (!b) return;
    document.getElementById("buildingEditId").value = b.id;
    document.getElementById("buildingName").value = b.name;
    document.getElementById("buildingAddress").value = b.address;
    document.getElementById("buildingFloors").value = b.floors;
    document.getElementById("buildingRooms").value = b.totalRooms;
    document.getElementById("buildingType").value = b.type;
    document.getElementById("buildingStatus").value = b.status;
    document.querySelector("#buildingModal h2").textContent = "Edit Building";
    openModal();
}

function deleteBuilding(id) {
    const data = getData();
    const b = data.buildings.find(x => x.id === id);
    const hasRooms = data.rooms.some(r => r.buildingId === id);
    if (hasRooms) {
        showToast("Cannot delete — building has assigned rooms", "error");
        return;
    }
    if (!confirm(`Delete building "${b.name}"?`)) return;
    data.buildings = data.buildings.filter(x => x.id !== id);
    saveData(data);
    logAudit("Delete", "Buildings", `Deleted building: ${b.name}`);
    showToast("Building deleted");
    loadBuildings();
}

function filterBuildings() {
    const q = (document.getElementById("buildingSearch")?.value || "").toLowerCase();
    document.querySelectorAll("#buildingTableBody tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
    });
}


function openRoomModal() { document.getElementById("roomModal").style.display = "block"; }
function closeRoomModal() { document.getElementById("roomModal").style.display = "none"; resetRoomForm(); }

function resetRoomForm() {
    document.getElementById("roomEditId").value = "";
    document.getElementById("roomNumber").value = "";
    document.getElementById("roomFloor").value = "";
    document.getElementById("roomRent").value = "";
    document.querySelector("#roomModal h2").textContent = "Add Room";
}

function populateBuildingDropdowns() {
    const data = getData();
    document.querySelectorAll("#roomBuilding, #contractRoom").forEach(sel => {
        if (!sel) return;
        const current = sel.value;
        sel.innerHTML = '<option value="">Select Building</option>';
        data.buildings.filter(b => b.status === "Active").forEach(b => {
            sel.innerHTML += `<option value="${b.id}">${b.name}</option>`;
        });
        if (current) sel.value = current;
    });
}

function loadRooms() {
    const data = getData();
    populateBuildingDropdowns();
    const tbody = document.getElementById("roomTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    data.rooms.forEach(r => {
        const statusClass = r.status === "Occupied" ? "success" : r.status === "Vacant" ? "info" : "warning";
        tbody.innerHTML += `<tr>
            <td>${r.id}</td>
            <td>${r.buildingName}</td>
            <td>${r.number}</td>
            <td>${r.floor}</td>
            <td>${r.type}</td>
            <td>${formatCurrency(r.rent)}</td>
            <td><span class="badge badge-${statusClass}">${r.status}</span></td>
            <td class="actions">
                <button class="btn-sm btn-edit" onclick="editRoom(${r.id})">Edit</button>
                <button class="btn-sm btn-delete" onclick="deleteRoom(${r.id})">Delete</button>
            </td>
        </tr>`;
    });
}

function addRoom() {
    const editId = document.getElementById("roomEditId").value;
    const buildingId = parseInt(document.getElementById("roomBuilding").value);
    const number = document.getElementById("roomNumber").value.trim();
    const floor = parseInt(document.getElementById("roomFloor").value);
    const type = document.getElementById("roomType").value;
    const rent = parseFloat(document.getElementById("roomRent").value);
    const status = document.getElementById("roomStatus").value;

    if (!buildingId || !number || !floor || !rent) {
        showToast("Please complete all fields", "error");
        return;
    }

    const data = getData();
    const building = data.buildings.find(b => b.id === buildingId);
    if (!building) return;

    const duplicate = data.rooms.some(r => r.buildingId === buildingId && r.number === number && r.id !== parseInt(editId || 0));
    if (duplicate) {
        showToast("Room number already exists in this building", "error");
        return;
    }

    if (editId) {
        const r = data.rooms.find(x => x.id === parseInt(editId));
        if (r) {
            Object.assign(r, { buildingId, buildingName: building.name, number, floor, type, rent, status });
            logAudit("Update", "Rooms", `Updated room ${number} in ${building.name}`);
            showToast("Room updated successfully");
        }
    } else {
        data.rooms.push({ id: nextId(data, "rooms"), buildingId, buildingName: building.name, number, floor, type, rent, status });
        logAudit("Create", "Rooms", `Added room ${number} in ${building.name}`);
        showToast("Room added successfully");
    }
    saveData(data);
    closeRoomModal();
    loadRooms();
}

function editRoom(id) {
    const data = getData();
    const r = data.rooms.find(x => x.id === id);
    if (!r) return;
    populateBuildingDropdowns();
    document.getElementById("roomEditId").value = r.id;
    document.getElementById("roomBuilding").value = r.buildingId;
    document.getElementById("roomNumber").value = r.number;
    document.getElementById("roomFloor").value = r.floor;
    document.getElementById("roomType").value = r.type;
    document.getElementById("roomRent").value = r.rent;
    document.getElementById("roomStatus").value = r.status;
    document.querySelector("#roomModal h2").textContent = "Edit Room";
    openRoomModal();
}

function deleteRoom(id) {
    const data = getData();
    const r = data.rooms.find(x => x.id === id);
    const hasContract = data.contracts.some(c => c.roomId === id && c.status === "Active");
    if (hasContract) {
        showToast("Cannot delete — room has an active contract", "error");
        return;
    }
    if (!confirm(`Delete room ${r.number}?`)) return;
    data.rooms = data.rooms.filter(x => x.id !== id);
    saveData(data);
    logAudit("Delete", "Rooms", `Deleted room ${r.number}`);
    showToast("Room deleted");
    loadRooms();
}

function filterRooms() {
    const q = (document.getElementById("roomSearch")?.value || "").toLowerCase();
    document.querySelectorAll("#roomTableBody tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
    });
}


function openTenantModal() { document.getElementById("tenantModal").style.display = "block"; }
function closeTenantModal() { document.getElementById("tenantModal").style.display = "none"; resetTenantForm(); }

function resetTenantForm() {
    document.getElementById("tenantEditId").value = "";
    document.getElementById("company").value = "";
    document.getElementById("contactPerson").value = "";
    document.getElementById("contactNumber").value = "";
    document.getElementById("tenantEmail").value = "";
    document.querySelector("#tenantModal h2").textContent = "Add Tenant";
}

function loadTenants() {
    const data = getData();
    const tbody = document.getElementById("tenantTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    data.tenants.forEach(t => {
        const sc = t.status === "Active" ? "success" : t.status === "Pending Approval" ? "warning" : t.status === "Terminated" ? "danger" : "info";
        tbody.innerHTML += `<tr>
            <td>${t.id}</td>
            <td>${t.company}</td>
            <td>${t.contactPerson}</td>
            <td>${t.contactNumber}</td>
            <td>${t.email}</td>
            <td><span class="badge badge-${sc}">${t.status}</span></td>
            <td class="actions">
                <button class="btn-sm btn-edit" onclick="editTenant(${t.id})">Edit</button>
                <button class="btn-sm btn-delete" onclick="deleteTenant(${t.id})">Delete</button>
            </td>
        </tr>`;
    });
    populateTenantDropdowns();
}

function populateTenantDropdowns() {
    const data = getData();
    document.querySelectorAll("#contractTenant, #utilityTenant").forEach(sel => {
        if (!sel) return;
        sel.innerHTML = '<option value="">Select Tenant</option>';
        data.tenants.filter(t => t.status === "Active" || t.status === "Renewed").forEach(t => {
            sel.innerHTML += `<option value="${t.id}">${t.company}</option>`;
        });
    });
}

function addTenant() {
    const editId = document.getElementById("tenantEditId").value;
    const company = document.getElementById("company").value.trim();
    const contactPerson = document.getElementById("contactPerson").value.trim();
    const contactNumber = document.getElementById("contactNumber").value.trim();
    const email = document.getElementById("tenantEmail").value.trim();
    const status = document.getElementById("tenantStatus").value;

    if (!company || !contactPerson || !contactNumber || !email) {
        showToast("Please fill in all fields", "error");
        return;
    }

    const data = getData();
    if (editId) {
        const t = data.tenants.find(x => x.id === parseInt(editId));
        if (t) {
            Object.assign(t, { company, contactPerson, contactNumber, email, status });
            data.contracts.forEach(c => { if (c.tenantId === t.id) c.tenantName = company; });
            logAudit("Update", "Tenants", `Updated tenant: ${company}`);
            showToast("Tenant updated successfully");
        }
    } else {
        data.tenants.push({ id: nextId(data, "tenants"), company, contactPerson, contactNumber, email, status });
        logAudit("Create", "Tenants", `Added tenant: ${company}`);
        showToast("Tenant added successfully");
    }
    saveData(data);
    closeTenantModal();
    loadTenants();
}

function editTenant(id) {
    const data = getData();
    const t = data.tenants.find(x => x.id === id);
    if (!t) return;
    document.getElementById("tenantEditId").value = t.id;
    document.getElementById("company").value = t.company;
    document.getElementById("contactPerson").value = t.contactPerson;
    document.getElementById("contactNumber").value = t.contactNumber;
    document.getElementById("tenantEmail").value = t.email;
    document.getElementById("tenantStatus").value = t.status;
    document.querySelector("#tenantModal h2").textContent = "Edit Tenant";
    openTenantModal();
}

function deleteTenant(id) {
    const data = getData();
    const t = data.tenants.find(x => x.id === id);
    const hasContract = data.contracts.some(c => c.tenantId === id && c.status === "Active");
    if (hasContract) {
        showToast("Cannot delete — tenant has an active contract", "error");
        return;
    }
    if (!confirm(`Delete tenant "${t.company}"?`)) return;
    data.tenants = data.tenants.filter(x => x.id !== id);
    saveData(data);
    logAudit("Delete", "Tenants", `Deleted tenant: ${t.company}`);
    showToast("Tenant deleted");
    loadTenants();
}

function filterTenants() {
    const q = (document.getElementById("tenantSearch")?.value || "").toLowerCase();
    document.querySelectorAll("#tenantTableBody tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
    });
}

// ===================== CONTRACTS =====================

function openContractModal() { document.getElementById("contractModal").style.display = "block"; }
function closeContractModal() { document.getElementById("contractModal").style.display = "none"; resetContractForm(); }

function resetContractForm() {
    document.getElementById("contractEditId").value = "";
    document.querySelector("#contractModal h2").textContent = "New Contract";
}

function populateContractRoomDropdown() {
    const data = getData();
    const sel = document.getElementById("contractRoom");
    if (!sel) return;
    sel.innerHTML = '<option value="">Select Room</option>';
    data.rooms.filter(r => r.status === "Vacant" || r.status === "Occupied").forEach(r => {
        sel.innerHTML += `<option value="${r.id}" data-rent="${r.rent}">${r.buildingName} — Room ${r.number} (${r.status})</option>`;
    });
}

function onContractRoomChange() {
    const sel = document.getElementById("contractRoom");
    const opt = sel.options[sel.selectedIndex];
    if (opt && opt.dataset.rent) {
        document.getElementById("contractRent").value = opt.dataset.rent;
    }
}

function loadContracts() {
    const data = getData();
    populateTenantDropdowns();
    populateContractRoomDropdown();
    const tbody = document.getElementById("contractTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    data.contracts.forEach(c => {
        const sc = c.status === "Active" ? "success" : c.status === "Expired" ? "danger" : "warning";
        tbody.innerHTML += `<tr>
            <td>${c.id}</td>
            <td>${c.tenantName}</td>
            <td>${c.buildingName} — ${c.roomNumber}</td>
            <td>${formatDate(c.startDate)}</td>
            <td>${formatDate(c.endDate)}</td>
            <td>${formatCurrency(c.monthlyRent)}</td>
            <td>${formatCurrency(c.deposit)}</td>
            <td><span class="badge badge-${sc}">${c.status}</span></td>
            <td class="actions">
                <button class="btn-sm btn-edit" onclick="editContract(${c.id})">Edit</button>
                <button class="btn-sm btn-delete" onclick="terminateContract(${c.id})">Terminate</button>
            </td>
        </tr>`;
    });
}

function addContract() {
    const editId = document.getElementById("contractEditId").value;
    const tenantId = parseInt(document.getElementById("contractTenant").value);
    const roomId = parseInt(document.getElementById("contractRoom").value);
    const startDate = document.getElementById("contractStart").value;
    const endDate = document.getElementById("contractEnd").value;
    const monthlyRent = parseFloat(document.getElementById("contractRent").value);
    const deposit = parseFloat(document.getElementById("contractDeposit").value) || 0;
    const status = document.getElementById("contractStatus").value;

    if (!tenantId || !roomId || !startDate || !endDate || !monthlyRent) {
        showToast("Please complete all required fields", "error");
        return;
    }
    if (endDate <= startDate) {
        showToast("End date must be after start date", "error");
        return;
    }

    const data = getData();
    const tenant = data.tenants.find(t => t.id === tenantId);
    const room = data.rooms.find(r => r.id === roomId);
    if (!tenant || !room) return;

    if (editId) {
        const c = data.contracts.find(x => x.id === parseInt(editId));
        if (c) {
            const oldRoomId = c.roomId;
            Object.assign(c, { tenantId, tenantName: tenant.company, roomId, roomNumber: room.number, buildingName: room.buildingName, startDate, endDate, monthlyRent, deposit, status });
            if (status === "Active") {
                room.status = "Occupied";
                if (oldRoomId !== roomId) {
                    const oldRoom = data.rooms.find(r => r.id === oldRoomId);
                    if (oldRoom && !data.contracts.some(ct => ct.roomId === oldRoomId && ct.status === "Active" && ct.id !== c.id)) {
                        oldRoom.status = "Vacant";
                    }
                }
            }
            logAudit("Update", "Contracts", `Updated contract #${c.id} for ${tenant.company}`);
            showToast("Contract updated successfully");
        }
    } else {
        if (status === "Active" && data.contracts.some(c => c.roomId === roomId && c.status === "Active")) {
            showToast("Room already has an active contract", "error");
            return;
        }
        data.contracts.push({
            id: nextId(data, "contracts"),
            tenantId, tenantName: tenant.company, roomId, roomNumber: room.number, buildingName: room.buildingName,
            startDate, endDate, monthlyRent, deposit, status
        });
        if (status === "Active") {
            room.status = "Occupied";
            tenant.status = "Active";
        }
        logAudit("Create", "Contracts", `Created contract for ${tenant.company} — Room ${room.number}`);
        showToast("Contract created successfully");
    }
    saveData(data);
    closeContractModal();
    loadContracts();
}

function editContract(id) {
    const data = getData();
    const c = data.contracts.find(x => x.id === id);
    if (!c) return;
    populateTenantDropdowns();
    populateContractRoomDropdown();
    document.getElementById("contractEditId").value = c.id;
    document.getElementById("contractTenant").value = c.tenantId;
    document.getElementById("contractRoom").value = c.roomId;
    document.getElementById("contractStart").value = c.startDate;
    document.getElementById("contractEnd").value = c.endDate;
    document.getElementById("contractRent").value = c.monthlyRent;
    document.getElementById("contractDeposit").value = c.deposit;
    document.getElementById("contractStatus").value = c.status;
    document.querySelector("#contractModal h2").textContent = "Edit Contract";
    openContractModal();
}

function terminateContract(id) {
    if (!confirm("Terminate this contract? The room will be marked as Vacant.")) return;
    const data = getData();
    const c = data.contracts.find(x => x.id === id);
    if (!c) return;
    c.status = "Terminated";
    const room = data.rooms.find(r => r.id === c.roomId);
    if (room) room.status = "Vacant";
    saveData(data);
    logAudit("Terminate", "Contracts", `Terminated contract #${c.id} for ${c.tenantName}`);
    showToast("Contract terminated");
    loadContracts();
}

function filterContracts() {
    const q = (document.getElementById("contractSearch")?.value || "").toLowerCase();
    document.querySelectorAll("#contractTableBody tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
    });
}


function openPaymentModal() { document.getElementById("paymentModal").style.display = "block"; }
function closePaymentModal() { document.getElementById("paymentModal").style.display = "none"; resetPaymentForm(); }

function resetPaymentForm() {
    document.getElementById("paymentEditId").value = "";
    document.querySelector("#paymentModal h2").textContent = "Record Payment";
}

function populatePaymentContracts() {
    const data = getData();
    const sel = document.getElementById("paymentContract");
    if (!sel) return;
    sel.innerHTML = '<option value="">Select Contract</option>';
    data.contracts.filter(c => c.status === "Active").forEach(c => {
        sel.innerHTML += `<option value="${c.id}" data-tenant="${c.tenantName}" data-rent="${c.monthlyRent}">${c.tenantName} — ${c.buildingName} Rm ${c.roomNumber}</option>`;
    });
}

function onPaymentContractChange() {
    const sel = document.getElementById("paymentContract");
    const opt = sel.options[sel.selectedIndex];
    if (opt && opt.dataset.rent) {
        document.getElementById("paymentAmount").value = opt.dataset.rent;
    }
}

function loadPayments() {
    const data = getData();
    populatePaymentContracts();
    const tbody = document.getElementById("paymentTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    data.payments.forEach(p => {
        tbody.innerHTML += `<tr>
            <td>${p.id}</td>
            <td>${p.tenantName}</td>
            <td>${p.type}</td>
            <td>${formatCurrency(p.amount)}</td>
            <td>${formatDate(p.date)}</td>
            <td>${p.method}</td>
            <td>${p.reference || "—"}</td>
            <td><span class="badge badge-${p.status === "Paid" ? "success" : "warning"}">${p.status}</span></td>
            <td class="actions">
                ${p.status === "Pending" ? `<button class="btn-sm btn-success" onclick="markPaymentPaid(${p.id})">Mark Paid</button>` : ""}
                <button class="btn-sm btn-delete" onclick="deletePayment(${p.id})">Delete</button>
            </td>
        </tr>`;
    });
}

function addPayment() {
    const editId = document.getElementById("paymentEditId").value;
    const contractId = parseInt(document.getElementById("paymentContract").value);
    const type = document.getElementById("paymentType").value;
    const amount = parseFloat(document.getElementById("paymentAmount").value);
    const date = document.getElementById("paymentDate").value;
    const method = document.getElementById("paymentMethod").value;
    const reference = document.getElementById("paymentReference").value.trim();
    const status = document.getElementById("paymentStatus").value;

    if (!contractId || !amount || !date || !method) {
        showToast("Please complete all required fields", "error");
        return;
    }

    const data = getData();
    const contract = data.contracts.find(c => c.id === contractId);
    if (!contract) return;

    if (editId) {
        const p = data.payments.find(x => x.id === parseInt(editId));
        if (p) Object.assign(p, { contractId, tenantName: contract.tenantName, type, amount, date, method, reference, status });
    } else {
        data.payments.push({
            id: nextId(data, "payments"),
            contractId, tenantName: contract.tenantName, type, amount, date, method, reference, status
        });
    }
    saveData(data);
    logAudit("Create", "Payments", `Recorded ${type} payment of ${formatCurrency(amount)} for ${contract.tenantName}`);
    showToast("Payment recorded successfully");
    closePaymentModal();
    loadPayments();
}

function markPaymentPaid(id) {
    const data = getData();
    const p = data.payments.find(x => x.id === id);
    if (p) {
        p.status = "Paid";
        saveData(data);
        logAudit("Update", "Payments", `Marked payment #${id} as Paid`);
        showToast("Payment marked as Paid");
        loadPayments();
    }
}

function deletePayment(id) {
    if (!confirm("Delete this payment record?")) return;
    const data = getData();
    data.payments = data.payments.filter(x => x.id !== id);
    saveData(data);
    logAudit("Delete", "Payments", `Deleted payment #${id}`);
    showToast("Payment deleted");
    loadPayments();
}

function filterPayments() {
    const q = (document.getElementById("paymentSearch")?.value || "").toLowerCase();
    document.querySelectorAll("#paymentTableBody tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
    });
}



function calcUtilityAmount(prev, curr, rate) {
    return Math.max(0, (curr - prev) * rate);
}

function openUtilityModal() { document.getElementById("utilityModal").style.display = "block"; }
function closeUtilityModal() { document.getElementById("utilityModal").style.display = "none"; resetUtilityForm(); }

function resetUtilityForm() {
    document.getElementById("utilityEditId").value = "";
    document.querySelector("#utilityModal h2").textContent = "Add Utility Bill";
}

function populateUtilityRooms() {
    const data = getData();
    const sel = document.getElementById("utilityRoom");
    if (!sel) return;
    sel.innerHTML = '<option value="">Select Room</option>';
    data.rooms.filter(r => r.status === "Occupied").forEach(r => {
        const contract = data.contracts.find(c => c.roomId === r.id && c.status === "Active");
        sel.innerHTML += `<option value="${r.id}" data-tenant="${contract ? contract.tenantName : ''}">${r.buildingName} — Room ${r.number}</option>`;
    });
}

function onUtilityRoomChange() {
    const sel = document.getElementById("utilityRoom");
    const opt = sel.options[sel.selectedIndex];
    if (opt && opt.dataset.tenant) {
        document.getElementById("utilityTenantDisplay").value = opt.dataset.tenant;
    }
}

function updateUtilityPreview() {
    const prev = parseFloat(document.getElementById("utilityPrev").value) || 0;
    const curr = parseFloat(document.getElementById("utilityCurr").value) || 0;
    const rate = parseFloat(document.getElementById("utilityRate").value) || 0;
    const amount = calcUtilityAmount(prev, curr, rate);
    const el = document.getElementById("utilityAmountPreview");
    if (el) el.textContent = formatCurrency(amount);
}

function loadUtilities() {
    const data = getData();
    populateUtilityRooms();
    const tbody = document.getElementById("utilityTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    data.utilities.forEach(u => {
        const usage = u.currentReading - u.previousReading;
        const amount = calcUtilityAmount(u.previousReading, u.currentReading, u.rate);
        tbody.innerHTML += `<tr>
            <td>${u.id}</td>
            <td>${u.roomNumber}</td>
            <td>${u.tenantName}</td>
            <td>${u.type}</td>
            <td>${u.billingPeriod}</td>
            <td>${usage}</td>
            <td>${formatCurrency(amount)}</td>
            <td><span class="badge badge-${u.status === "Paid" ? "success" : "warning"}">${u.status}</span></td>
            <td class="actions">
                ${u.status === "Pending" ? `<button class="btn-sm btn-success" onclick="markUtilityPaid(${u.id})">Mark Paid</button>` : ""}
                <button class="btn-sm btn-delete" onclick="deleteUtility(${u.id})">Delete</button>
            </td>
        </tr>`;
    });
}

function addUtility() {
    const editId = document.getElementById("utilityEditId").value;
    const roomId = parseInt(document.getElementById("utilityRoom").value);
    const type = document.getElementById("utilityType").value;
    const previousReading = parseFloat(document.getElementById("utilityPrev").value);
    const currentReading = parseFloat(document.getElementById("utilityCurr").value);
    const rate = parseFloat(document.getElementById("utilityRate").value);
    const billingPeriod = document.getElementById("utilityPeriod").value.trim();
    const status = document.getElementById("utilityStatus").value;

    if (!roomId || isNaN(previousReading) || isNaN(currentReading) || !rate || !billingPeriod) {
        showToast("Please complete all fields", "error");
        return;
    }
    if (currentReading < previousReading) {
        showToast("Current reading cannot be less than previous reading", "error");
        return;
    }

    const data = getData();
    const room = data.rooms.find(r => r.id === roomId);
    const contract = data.contracts.find(c => c.roomId === roomId && c.status === "Active");
    const tenantName = contract ? contract.tenantName : "—";

    if (editId) {
        const u = data.utilities.find(x => x.id === parseInt(editId));
        if (u) Object.assign(u, { roomId, roomNumber: room.number, tenantName, type, previousReading, currentReading, rate, billingPeriod, status });
    } else {
        data.utilities.push({
            id: nextId(data, "utilities"),
            roomId, roomNumber: room.number, tenantName, type, previousReading, currentReading, rate, billingPeriod, status
        });
    }
    saveData(data);
    logAudit("Create", "Utilities", `Added ${type} bill for Room ${room.number} — ${billingPeriod}`);
    showToast("Utility bill saved");
    closeUtilityModal();
    loadUtilities();
}

function markUtilityPaid(id) {
    const data = getData();
    const u = data.utilities.find(x => x.id === id);
    if (u) {
        u.status = "Paid";
        saveData(data);
        logAudit("Update", "Utilities", `Marked utility bill #${id} as Paid`);
        showToast("Utility bill marked as Paid");
        loadUtilities();
    }
}

function deleteUtility(id) {
    if (!confirm("Delete this utility bill?")) return;
    const data = getData();
    data.utilities = data.utilities.filter(x => x.id !== id);
    saveData(data);
    logAudit("Delete", "Utilities", `Deleted utility bill #${id}`);
    showToast("Utility bill deleted");
    loadUtilities();
}

function filterUtilities() {
    const q = (document.getElementById("utilitySearch")?.value || "").toLowerCase();
    document.querySelectorAll("#utilityTableBody tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
    });
}


function openUserModal() { document.getElementById("userModal").style.display = "block"; }
function closeUserModal() { document.getElementById("userModal").style.display = "none"; resetUserForm(); }

function resetUserForm() {
    document.getElementById("userEditId").value = "";
    document.getElementById("userPassword").value = "";
    document.querySelector("#userModal h2").textContent = "Add User";
}

function loadUsers() {
    const data = getData();
    const tbody = document.getElementById("userTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    data.users.forEach(u => {
        tbody.innerHTML += `<tr>
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td><span class="badge badge-${u.role === "superadmin" ? "danger" : "info"}">${u.role}</span></td>
            <td class="actions">
                <button class="btn-sm btn-edit" onclick="editUser(${u.id})">Edit</button>
                ${u.id !== 1 ? `<button class="btn-sm btn-delete" onclick="deleteUser(${u.id})">Delete</button>` : ""}
            </td>
        </tr>`;
    });
}

function addUser() {
    const editId = document.getElementById("userEditId").value;
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim().toLowerCase();
    const password = document.getElementById("userPassword").value.trim();
    const role = document.getElementById("userRole").value;

    if (!name || !email || !role) {
        showToast("Please complete all fields", "error");
        return;
    }
    if (!editId && !password) {
        showToast("Password is required for new users", "error");
        return;
    }

    const data = getData();
    const emailExists = data.users.some(u => u.email === email && u.id !== parseInt(editId || 0));
    if (emailExists) {
        showToast("Email already in use", "error");
        return;
    }

    if (editId) {
        const u = data.users.find(x => x.id === parseInt(editId));
        if (u) {
            u.name = name;
            u.email = email;
            u.role = role;
            if (password) u.password = password;
            logAudit("Update", "Users", `Updated user: ${name}`);
            showToast("User updated successfully");
        }
    } else {
        data.users.push({ id: nextId(data, "users"), name, email, password, role });
        logAudit("Create", "Users", `Added user: ${name}`);
        showToast("User added successfully");
    }
    saveData(data);
    closeUserModal();
    loadUsers();
}

function editUser(id) {
    const data = getData();
    const u = data.users.find(x => x.id === id);
    if (!u) return;
    document.getElementById("userEditId").value = u.id;
    document.getElementById("userName").value = u.name;
    document.getElementById("userEmail").value = u.email;
    document.getElementById("userRole").value = u.role;
    document.querySelector("#userModal h2").textContent = "Edit User";
    openUserModal();
}

function deleteUser(id) {
    const currentUserId = parseInt(localStorage.getItem("userId"));
    if (id === currentUserId) {
        showToast("You cannot delete your own account", "error");
        return;
    }
    if (!confirm("Delete this user?")) return;
    const data = getData();
    const u = data.users.find(x => x.id === id);
    data.users = data.users.filter(x => x.id !== id);
    saveData(data);
    logAudit("Delete", "Users", `Deleted user: ${u.name}`);
    showToast("User deleted");
    loadUsers();
}


function loadAuditLogs() {
    const data = getData();
    const tbody = document.getElementById("auditTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    data.auditLogs.forEach(a => {
        const dt = new Date(a.timestamp);
        tbody.innerHTML += `<tr>
            <td>${a.id}</td>
            <td>${dt.toLocaleString("en-PH")}</td>
            <td>${a.user}</td>
            <td><span class="badge badge-info">${a.action}</span></td>
            <td>${a.module}</td>
            <td>${a.details}</td>
        </tr>`;
    });
    if (data.auditLogs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty">No audit logs yet. Actions will be recorded here.</td></tr>';
    }
}

function clearAuditLogs() {
    if (localStorage.getItem("role") !== "superadmin") return;
    if (!confirm("Clear all audit logs?")) return;
    const data = getData();
    data.auditLogs = [];
    saveData(data);
    loadAuditLogs();
    showToast("Audit logs cleared");
}


function loadReports() {
    const data = getData();
    const totalRevenue = data.payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
    const pendingRent = data.payments.filter(p => p.status === "Pending" && p.type === "Rent").reduce((s, p) => s + p.amount, 0);
    const pendingUtilities = data.utilities.filter(u => u.status === "Pending").reduce((s, u) => s + calcUtilityAmount(u.previousReading, u.currentReading, u.rate), 0);
    const occupancyRate = data.rooms.length ? Math.round((data.rooms.filter(r => r.status === "Occupied").length / data.rooms.length) * 100) : 0;

    setText("reportRevenue", formatCurrency(totalRevenue));
    setText("reportPendingRent", formatCurrency(pendingRent));
    setText("reportPendingUtilities", formatCurrency(pendingUtilities));
    setText("reportOccupancy", occupancyRate + "%");

    renderOccupancyReport(data);
    renderRevenueByBuilding(data);
    renderTenantStatusReport(data);
}

function renderOccupancyReport(data) {
    const tbody = document.getElementById("occupancyReportBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    data.buildings.forEach(b => {
        const rooms = data.rooms.filter(r => r.buildingId === b.id);
        const occupied = rooms.filter(r => r.status === "Occupied").length;
        const rate = rooms.length ? Math.round((occupied / rooms.length) * 100) : 0;
        tbody.innerHTML += `<tr>
            <td>${b.name}</td>
            <td>${rooms.length}</td>
            <td>${occupied}</td>
            <td>${rooms.length - occupied}</td>
            <td>${rate}%</td>
        </tr>`;
    });
}

function renderRevenueByBuilding(data) {
    const tbody = document.getElementById("revenueReportBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    const buildingRevenue = {};
    data.payments.filter(p => p.status === "Paid").forEach(p => {
        const contract = data.contracts.find(c => c.id === p.contractId);
        if (contract) {
            buildingRevenue[contract.buildingName] = (buildingRevenue[contract.buildingName] || 0) + p.amount;
        }
    });
    Object.entries(buildingRevenue).sort((a, b) => b[1] - a[1]).forEach(([name, amount]) => {
        tbody.innerHTML += `<tr><td>${name}</td><td>${formatCurrency(amount)}</td></tr>`;
    });
    if (Object.keys(buildingRevenue).length === 0) {
        tbody.innerHTML = '<tr><td colspan="2" class="empty">No revenue data yet.</td></tr>';
    }
}

function renderTenantStatusReport(data) {
    const tbody = document.getElementById("tenantStatusReportBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    const statuses = {};
    data.tenants.forEach(t => { statuses[t.status] = (statuses[t.status] || 0) + 1; });
    Object.entries(statuses).forEach(([status, count]) => {
        tbody.innerHTML += `<tr><td>${status}</td><td>${count}</td></tr>`;
    });
}

function printReport() {
    window.print();
}

function exportReportCSV() {
    const data = getData();
    let csv = "Report,Value\n";
    csv += `Total Buildings,${data.buildings.length}\n`;
    csv += `Total Rooms,${data.rooms.length}\n`;
    csv += `Total Tenants,${data.tenants.length}\n`;
    csv += `Active Contracts,${data.contracts.filter(c => c.status === "Active").length}\n`;
    csv += `Total Revenue,${data.payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0)}\n`;

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "jefarelid_report_" + new Date().toISOString().slice(0, 10) + ".csv";
    a.click();
    showToast("Report exported as CSV");
}

document.addEventListener("DOMContentLoaded", initPage);
