import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import org from "../images/org.png";
import avatar from "../images/avatar.png";
import {Link} from "react-router-dom";

export default function OrganizationDetails({ id, name, email, address, notes }) {
  const [details, setDetails] = useState([]);
  const params = useParams();
  const [contactCount, setContactCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  useEffect(() => {
    fetch(`https://contact-hub-jrd9.onrender.com/organizations/${params.id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setDetails(data);
        countContactStats(data.contact);
      });
  }, [params.id]);

  const countContactStats = (contacts) => {
    setContactCount(contacts.length);

    const maleContacts = contacts.filter(contact => {
      if (!contact.user) {
        return null;
      }
      return contact.user.gender === 'Male';
    });

    const femaleContacts = contacts.filter(contact => {
      if (!contact.user) {
        return null;
      }
      return contact.user.gender === 'Female';
    });

    setMaleCount(maleContacts.length);
    setFemaleCount(femaleContacts.length);
  };

  return (
    <div id="org_order">
      <div id="top_org">
        <div id="img_name">
          <img className="avatar details" src={org} alt={details.name} />
          <h5>{details.name}</h5>
        </div>
        <div id="email_ad">
          <p><b>email:</b> {details.email}</p>
          <p>{details.address}</p>
        </div>
        <div>
          <h6>Contact Stats:</h6>
          <p>Males: {maleCount} | Females: {femaleCount}</p>
        </div>
      </div>

      <div id="user">
        <h6>Contacts</h6>
        {details.contact && details.contact.map(contact => {
          if (!contact.user) {
            return null;
          }
          return (
            <Link id="user_specific" key={contact.id} to={`/contacts/${contact.id}`} style={{ textDecoration: 'none', color: 'black'}}>

            
              <h5 id="img_name"><img className="avatar details" src={avatar} alt={contact.user.username} />
                {contact.user.username}</h5>
              <p><b>email:</b> {contact.user.email}</p>
              <div id="note">
                <p style={{ color: "grey" }}>Note</p>
                <p>{contact.profile_notes}</p>
              </div>
            
            </Link>
          );
        })}
      </div>
    </div>
  );
}
