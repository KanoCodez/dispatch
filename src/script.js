let calls = [];
let units = [];

function addCall() {
    const callTitle = document.getElementById('callTitle').value.trim();
    const callDetails = document.getElementById('callDetails').value.trim();
    const callLocation = document.getElementById('callLocation').value.trim();
    if (callTitle !== '' && callDetails !== '' && callLocation !== '') {
        calls.push({ title: callTitle, details: callDetails, location: callLocation, units: [] });
        displayCalls();
        resetCallFields();
    } else {
        alert('Please fill in all fields.');
    }
}

function deleteCall(index) {
    calls.splice(index, 1);
    displayCalls();
}

function addUnit() {
    const unitName = document.getElementById('unitName').value.trim();
    if (unitName !== '') {
        units.push({ name: unitName, status: 'available' });
        displayUnits();
        resetUnitField();
    } else {
        alert('Please enter a unit name.');
    }
}

function setStatus(index, status) {
    units[index].status = status.toLowerCase();
    displayUnits();
}

function removeUnitFromCall(callIndex, unitIndex) {
    calls[callIndex].units.splice(unitIndex, 1);
    displayCalls();
}

function attachUnitToCall(callIndex, unitIndex) {
    calls[callIndex].units.push(units[unitIndex].name);
    displayCalls();
}

function resetCallFields() {
    document.getElementById('callTitle').value = '';
    document.getElementById('callDetails').value = '';
    document.getElementById('callLocation').value = '';
}

function resetUnitField() {
    document.getElementById('unitName').value = '';
}

function displayCalls() {
    const callList = document.getElementById('callList');
    callList.innerHTML = '';
    calls.forEach((call, callIndex) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>Title: ${call.title}</span><br>
            <span>Details: ${call.details}</span><br>
            <span>Location: ${call.location}</span><br>
            <button onclick="deleteCall(${callIndex})">Delete Call</button>
            <h3>Units</h3>
            <ul>`;
        call.units.forEach((unit, unitIndex) => {
            li.innerHTML += `
                <li>${unit}
                <button onclick="removeUnitFromCall(${callIndex}, ${unitIndex})">Remove from Call</button>
                </li>`;
        });
        li.innerHTML += '</ul>';
        li.innerHTML += `<h4>Attach Unit</h4>
                        <select id="unitSelect${callIndex}">${units.map((unit, index) => `<option value="${index}">${unit.name}</option>`).join('')}
                        </select>
                        <button onclick="attachUnitToCall(${callIndex}, document.getElementById('unitSelect${callIndex}').value)">Attach Unit</button>`;
        callList.appendChild(li);
    });
}

function displayUnits() {
    const unitList = document.getElementById('unitList');
    unitList.innerHTML = '';
    units.forEach((unit, index) => {
        const li = document.createElement('li');
        let color = '';
        switch (unit.status) {
            case 'available':
                color = 'green';
                break;
            case 'busy':
                color = 'orange';
                break;
            case 'out of service':
                color = 'red';
                break;
            default:
                color = 'black';
        }
        li.innerHTML = `
            <span style="color: ${color};">${unit.name} - ${unit.status}</span>
            <button onclick="setStatus(${index}, 'available')">Available</button>
            <button onclick="setStatus(${index}, 'busy')">Busy</button>
            <button onclick="setStatus(${index}, 'out of service')">Out of Service</button>
            <button onclick="removeUnit(${index})">Remove</button>
        `;
        unitList.appendChild(li);
    });
}

function removeUnit(index) {
    units.splice(index, 1);
    displayUnits();
}
