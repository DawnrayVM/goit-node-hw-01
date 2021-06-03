import fs from 'fs/promises';
import path from 'path';

const contactsPath = path.join('./db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const parsedData = JSON.parse(data.toString());
        console.table(parsedData);
    } catch (error) {
        console.log(error);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const parsedData = JSON.parse(data.toString());
        const requiedContact = parsedData.find(
            ({ id }) => id.toString() === contactId,
        );
        console.log(
            `======================================\nName: ${requiedContact.name}\nE-Mail: ${requiedContact.email}\nPhone: ${requiedContact.phone}\n======================================`,
        );
    } catch (error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const parsedData = JSON.parse(data.toString());
        const newContacts = parsedData.filter(
            contact => contact.id.toString() !== contactId,
        );
        console.log(newContacts);
        fs.writeFile(contactsPath, JSON.stringify(newContacts));
    } catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath);
        const parsedData = JSON.parse(data.toString());
        const newContacts = [
            ...parsedData,
            {
                id: parsedData.length + 1,
                name: name,
                email: email,
                phone: phone,
            },
        ];
        console.log(newContacts);
        fs.writeFile(contactsPath, JSON.stringify(newContacts));
    } catch (error) {
        console.log(error);
    }
}

export { listContacts, getContactById, removeContact, addContact };
