import {useState, useEffect} from "react"
import Organization from "./Organization"
import Filter from "./Filter"
export default function Organizations(){
    const [organization, setOrganization] = useState([])
    const [oname, setOname] = useState("")
    function handleName(e){
        e.preventDefault()
        setOname(e.target.value);

    }
    const orgsDisplay = organization.filter(org=>{
        if(org === "") return true;
        return org.name.toLowerCase().includes(oname.toLowerCase())
    })
    useEffect(()=>{
        fetch('/organizations')
        .then(res => res.json())
        .then(data => setOrganization(data))
    },[])
    return (
        <>
        <Filter  handleName={handleName} showGenderFilter={false} />

        
        <div id ="listy">
        
        {orgsDisplay.map(organization => {
            return( <Organization key={organization.id} id={organization.id} 
                name={organization.name} 
                email={organization.email} 
                address={organization.address}
                />
        )})}
        </div>
        </>
    )
}