const SearchBar=({countrySearch, handleSearch})=>{
  return(
    <form>
      <div>find countries <input value={countrySearch} onChange={handleSearch}/> </div>
    </form>
  )
}

export default SearchBar;
