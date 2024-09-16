import React, { useState } from 'react';
import './App.css';

const contactData = [
  {
    id: 1,
    name: "Aaron",
    mobile: "5785664545",
    email: "aaron@gmail.com"
  },
  {
    id: 2,
    name: "Buincy Hanson",
    mobile: "5862164545",
    email: "hanson@gmail.com"
  },
  {
    id: 3,
    name: "Hanna Donovan",
    mobile: "636452254",
    email: "hanna@gmail.com"
  }
];

function App() {
  const [contacts, setContacts] = useState(contactData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    mobile: '',
    email: ''
  });
  const [selectedContact, setSelectedContact] = useState(null);

  // Handle form visibility toggle
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({
      ...newContact,
      [name]: value
    });
  };

  // Add new contact
  const handleAddContact = (e) => {
    e.preventDefault();
    const newId = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
    const contactToAdd = {
      id: newId,
      ...newContact
    };
    setContacts([...contacts, contactToAdd]);
    setNewContact({ name: '', mobile: '', email: '' });  // Clear the form
    setIsFormVisible(false);  // Hide the form after submission
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Delete contact
  const deleteContact = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  // Edit contact
  const editContact = (id) => {
    const newName = prompt("Enter new name");
    const newMobile = prompt("Enter new mobile number");
    const newEmail = prompt("Enter new email");
    const updatedContacts = contacts.map(contact =>
      contact.id === id
        ? { ...contact, name: newName, mobile: newMobile, email: newEmail }
        : contact
    );
    setContacts(updatedContacts);
  };

  // View contact details
  const viewContact = (contact) => {
    setSelectedContact(contact);
  };

  // Close the modal or details view
  const closeDetails = () => {
    setSelectedContact(null);
  };

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="header">
        <h1>All Contacts</h1>
        <button className="add-btn" onClick={toggleForm}>+</button>
      </div>

      {/* Search Input */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search Contact"
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Add Contact Form */}
      {isFormVisible && (
        <form className="add-contact-form" onSubmit={handleAddContact}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newContact.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={newContact.mobile}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newContact.email}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Contact</button>
        </form>
      )}

      {/* Contact List */}
      <div className="contact-list">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div key={contact.id} className="contact-card">
              <div className="contact-info">
                <span className="contact-id">{contact.id}</span>
                <span className="contact-name">{contact.name}</span>
                <span className="contact-mobile">{contact.mobile}</span>
              </div>
              <div className="contact-actions">
                <button className="view-btn" onClick={() => viewContact(contact)}>👁️</button>
                <button className="delete-btn" onClick={() => deleteContact(contact.id)}>🗑️</button>
                <button className="edit-btn" onClick={() => editContact(contact.id)}>✏️</button>
              </div>
            </div>
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="contact-details-modal">
          <div className="modal-content">
            <h2>Contact Details</h2>
            <p><strong>ID:</strong> {selectedContact.id}</p>
            <p><strong>Name:</strong> {selectedContact.name}</p>
            <p><strong>Mobile:</strong> {selectedContact.mobile}</p>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <button onClick={closeDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;