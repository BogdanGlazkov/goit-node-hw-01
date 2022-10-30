const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contact = JSON.parse(contacts).filter(
      (item) => item.id.toString() === contactId.toString()
    );
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const restContacts = parsedContacts.filter(
      (item) => item.id.toString() !== contactId.toString()
    );
    fs.writeFile(contactsPath, JSON.stringify(restContacts));
    return restContacts;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const id = Date.now();
    const newContact = {
      id: id.toString(),
      name,
      email,
      phone,
    };
    const updatedContactList = [...parsedContacts, newContact];
    const strList = JSON.stringify(updatedContactList);
    fs.writeFile(contactsPath, strList);
    return updatedContactList;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
