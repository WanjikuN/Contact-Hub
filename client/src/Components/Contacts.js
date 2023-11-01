import {useState, useEffect} from "react"
import Contact from "./Contact"
export default function Contacts(){
    const [contacts, setContacts] = useState([])
    useEffect(()=>{
        fetch('/contacts')
        .then(res => res.json())
        .then(data => setContacts(data))
    },[])
    return (
        <div id ='listy'>
        
        {contacts.map(contact => {
            return( <Contact key={contact.id} id={contact.id} 
                username={contact.user.username} 
                email={contact.user.email} 
                gender={contact.user.gender}
                phone={contact.user.phone_number}
                address={contact.user.address}
                org={contact.organization.name}
                notes={contact.profile_notes}
                />
        )})}
        </div>
    )
}