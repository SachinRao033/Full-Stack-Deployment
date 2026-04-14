import React, { useEffect, useState } from "react";

const API = "api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const addContact = async () => {
    const name = prompt("Enter name");
    const phone = prompt("Enter phone");
    const email = prompt("Enter email");

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email })
    });

    loadContacts();
  };

  const deleteContact = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadContacts();
  };

  return (
    <div>
      <h1>Contact App</h1>
      <button onClick={addContact}>Add Contact</button>

      <ul>
        {contacts.map(c => (
          <li key={c.id}>
            {c.name} - {c.phone}
            <button onClick={() => deleteContact(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
