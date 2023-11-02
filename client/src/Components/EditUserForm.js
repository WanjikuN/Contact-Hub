import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function EditUserForm({ userId }) {
  const [userData, setUserData] = useState({});
  const params = useParams();
//   console.log(params.id)
  useEffect(() => {
    fetch(`/contacts/${params.id}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    fetch(`/user/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error updating user:', error));
  };

  return (
    <form onSubmit={handleUpdateUser}>
      <label>
        Username:
        <input type="text" name="username" value={userData.user.username || ''} onChange={handleInputChange} />
      </label>
      {/* Add more fields for other user properties */}
      <button type="submit">Update User</button>
    </form>
  );
}
