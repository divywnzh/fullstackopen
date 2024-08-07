const Numbers=({peopleToShow,handleDelete})=>{
    return(
        <div className="contactList">
        {peopleToShow.map((person)=>
            <li key={person.id}>
                {person.name} {person.number} &nbsp;
                <button onClick={()=>handleDelete(person.id,person.name)}>delete</button>
            </li>
        )}
        </div>
    )
}

export default Numbers

