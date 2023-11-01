import org from "../images/org.png";

export default function Organization({name,email, address,notes}){
    
    return (
        <div id ="contact">
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
        </div>
    )
}