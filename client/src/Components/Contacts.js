import { useState, useEffect } from "react";
import Contact from "./Contact";
import Filter from "./Filter";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [cname, setCname] = useState("");
  const [selectedGender, setSelectedGender] = useState("All");

  function handleName(e) {
    e.preventDefault();
    setCname(e.target.value);
  }

  function handleGender(e) {
    e.preventDefault();
    setSelectedGender(e.target.value);
  }

  const contactsDisplay = contacts.filter((contact) => {
    if (contact === "") return true;
    // Check if contact.user is not null or undefined before accessing properties
    return contact.user && contact.user.username.toLowerCase().includes(cname.toLowerCase());
  });

  const sortedGender =
    selectedGender === "All"
      ? contactsDisplay
      : contactsDisplay.filter((s) => s.user && s.user.gender.toLowerCase() === selectedGender.toLowerCase());

  useEffect(() => {
    fetch('https://contact-hub-jrd9.onrender.com/contacts')
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((error) => {
        console.error('Error fetching contacts:', error)
        
      });
  }, []);

  return (
    <>
      <Filter handleName={handleName} handleGender={handleGender} selectedGender={selectedGender} showGenderFilter={true} />

      <div id='listy'>
        {sortedGender.map((contact) => {
          // Add a check for null or undefined before rendering the Contact component
          if (!contact.user) {
            return null; 
          }

          return (
            <Contact
              key={contact.id}
              id={contact.id}
              username={contact.user.username}
              email={contact.user.email}
              gender={contact.user.gender}
              phone={contact.user.phone_number}
              address={contact.user.address}
              org={contact.organization && contact.organization.name}
              notes={contact.profile_notes}
            />
          );
        })}
      </div>
    </>
  );
}
