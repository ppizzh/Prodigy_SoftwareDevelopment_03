document.addEventListener('DOMContentLoaded', loadContacts);

function loadContacts() {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.forEach(contact => addContactToList(contact));
}

function addContact() {
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;

    if (name && phone && email) {
        let contact = { name, phone, email };
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        addContactToList(contact);
        clearForm();
    } else {
        alert("Please fill in all fields.");
    }
}

function addContactToList(contact) {
    let contactList = document.getElementById('contact-list');
    let li = document.createElement('li');
    li.className = 'contact-item';
    li.innerHTML = `
        <span>Name: ${contact.name}</span>
        <span>Phone: ${contact.phone}</span>
        <span>Email: ${contact.email}</span>
        <button class="edit" onclick="editContact('${contact.name}')">Edit</button>
        <button class="delete" onclick="deleteContact('${contact.name}')">Delete</button>
    `;
    contactList.appendChild(li);
}

function editContact(name) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    let contact = contacts.find(c => c.name === name);
    if (contact) {
        document.getElementById('name').value = contact.name;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('email').value = contact.email;
        deleteContact(name);
    }
}

function deleteContact(name) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts = contacts.filter(contact => contact.name !== name);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    document.getElementById('contact-list').innerHTML = '';
    contacts.forEach(contact => addContactToList(contact));
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
}
