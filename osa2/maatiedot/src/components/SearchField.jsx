const SearchField = (props) => {
  return (
    <>
    find countries <input 
                      type="text"
                      name="search"
                      id="search"
                      autoComplete='off'
                      value={props.searchValue}
                      onInput={props.handleSearch}
                      />
    </>
  )
}

export default SearchField