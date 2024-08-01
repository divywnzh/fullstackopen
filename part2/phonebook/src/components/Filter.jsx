const Filter=({searchName,handleSearch,showAll,setShowAll})=>{
    return(
      <>
        <div>
          filter contacts: <input value={searchName} onChange={handleSearch} />    
        </div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'filtered' : 'all' }
        </button>
      </>
    )
}

export default Filter
