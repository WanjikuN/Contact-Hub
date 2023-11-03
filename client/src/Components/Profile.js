import { useState, useEffect } from 'react';
import avatar from '../images/avatar.png';
import orga from '../images/org.png';
import { useParams } from 'react-router-dom';
import Contacts from './Contacts';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState({
    user: {},
    organization: {},
    profile_notes: '',
  });
  const [error, setError] = useState(null);
  const [message, setMessage]= useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState({
    profile_notes: '',
    phone_number: '',
    email: '',
    address: '',
  });
  const params = useParams()
  useEffect(() => {
    fetch(`/contacts/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setEditedContact({
          profile_notes: data.profile_notes,
          phone_number: data.user.phone_number,
          email: data.user.email,
          address: data.user.address,
        });
      });
  }, [params.id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset editedContact to original data
    setEditedContact({
      profile_notes: contacts.profile_notes,
      phone_number: contacts.user.phone_number,
      email: contacts.user.email,
      address: contacts.user.address,
    });
  };

  const handleSaveEdit = () => {
    // Perform the update request with the editedContact data
    fetch(`/contact/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile_notes: editedContact.profile_notes,
        user: {
          phone_number: editedContact.phone_number,
          email: editedContact.email,
          address: editedContact.address,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the state with the new data
            setContacts(data);
            setIsEditing(false);
            setError(null);
            setMessage('Contact Updated successfully');
        
        setTimeout(() => {
            setMessage(null)
            }, 2000);
        // setMessage(null)
      })
      .catch((error) => {
        console.error('Error updating contact:', error.message)
        setError('Failed to update contact');

        setTimeout(() => {
            setError(null);
        }, 3000);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleDelete = () => {
    fetch(`/contacts/${params.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
            setMessage('Contact Deleted successfully')
            setTimeout(() => {
                setMessage(null);
                navigate('/contacts');
            }, 3000);
            
          // Redirect to a different page or handle the deletion in your application logic
          console.log('Contact deleted successfully');
        } else {
          console.error('Error deleting contact:', res.status);
        }
      })
      .catch((error) => console.error('Error deleting contact:', error));
  };
  return (
    <>
      <div id="org_order" className="profile-container">
        <div id="cont" >
            <Contacts  />
        </div>
        <div id="top_org" className="profile-content">
          <div className="user-info">

            <img className="avatar" src={avatar} alt={contacts.user.username} />
            <div className="username-gender">
              <h5>{contacts.user.username}</h5>
              <p>{contacts.user.gender}</p>
            </div>
          </div>
          <div className="contact-details">
            {isEditing ? (
              <>
                        {error && <div style={{ color: 'red', fontWeight: 'bold'  }}>{error}</div>}
                        {message && <div style={{ color: 'green',fontWeight: 'bold' }}>{message}</div>}

                <label>
                  Tell:
                  <input
                    type="text"
                    name="phone_number"
                    value={editedContact.phone_number}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="text"
                    name="email"
                    value={editedContact.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={editedContact.address}
                    onChange={handleInputChange}
                  />
                </label>
              </>
            ) : (
              <>
                {message && <div style={{ color: 'green',fontWeight: 'bold' }}>{message}</div>}

                <p>Tell: {contacts.user.phone_number}</p>
                <p>Email: {contacts.user.email}</p>
                <p>Address: {contacts.user.address}</p>
              </>
            )}
          </div>
          <div className="organization-info">
            <img className="avatar_contacts" src={orga} alt={contacts.organization.name} />
            <p>{contacts.organization.name}</p>
            <div id="note" className="profile-note">
              <p style={{ color: 'grey' }}>Note</p>
              {isEditing ? (
                <>
                  <textarea
                    name="profile_notes"
                    value={editedContact.profile_notes}
                    onChange={handleInputChange}
                  />
                  <br/>
                  <button className="btn1" onClick={handleSaveEdit}>Save</button>
                  <button  className="btn1" onClick={handleCancelEdit}>Cancel</button>
                  <button style={{margin:'10px', color:'Red',fontSize:'20px'}} onClick={handleDelete}>X</button>
                </>
              ) : (
                <>
                  <p>{contacts.profile_notes}</p>
                  <button onClick={handleEdit}>Edit</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
