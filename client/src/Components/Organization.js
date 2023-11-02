import {Link} from "react-router-dom";
import org from "../images/org.png";

export default function Organization({id,name,email, address,notes}){
    
    return (
        <Link id ="contact"  to={`/organizations/${id}`} style={{ textDecoration: 'none', color: 'black', height:'265px'}}>

        <div>
            <img className="avatar details" src={org} alt={name}/>
            <h5 className="details">{name}</h5>
            <br />
            <p >email: {email}</p>
            <p >{address}</p>
        </div>
        
        <div>
            
            <p>{notes}</p>
        </div>
        
        </Link>
    )
}