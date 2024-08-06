const Numbers=({peopleToShow,handleDelete})=>{
    return(
        <>
        {peopleToShow.map((person)=>
            <li key={person.id}>
                {person.name} {person.number} &nbsp;
                <button onClick={()=>handleDelete(person.id,person.name)}>delete</button>
            </li>
        )}
        </>
    )
}

export default Numbers

