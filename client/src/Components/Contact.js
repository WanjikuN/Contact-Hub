import avatar from "../images/avatar.png";
import orga from "../images/org.png";
import {Link} from "react-router-dom";

export default function Contact({id,username,email,gender,phone,address,org,notes}){
    
    return (
        <Link id ="contact"  to={`/contacts/${id}`} style={{ textDecoration: 'none', color: 'black'}}>

        <div>
            <img className="avatar" src={avatar} alt={username}/>
            <h5>{username} <p>{gender}</p></h5>
            <p></p>
        </div>
        <div className="details">
            <p><img className="avatar_contacts" src={orga} />{org}</p>
            <p>{email}</p>
            <p>Tel: {phone}</p>
            <p>{address}</p>
        </div>
        <div className="org_details">
            
            <p className="note">{notes}</p>
            {/* <p>{org}</p> */}
        </div>
        </Link>
    )
}