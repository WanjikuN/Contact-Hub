import {useState, useEffect} from "react"
import Organization from "./Organization"
export default function Organizations(){
    const [organization, setOrganization] = useState([])
    useEffect(()=>{
        fetch('/organizations')
        .then(res => res.json())
        .then(data => setOrganization(data))
    },[])
    return (
        <div id ="listy">
        
        {organization.map(organization => {
            return( <Organization key={organization.id} id={organization.id} 
                name={organization.name} 
                email={organization.email} 
                address={organization.address}
                />
        )})}
        </div>
    )
}