import { useState } from 'react'

const Filter = (props) => {
  return (
    <>
    filter shown with <input 
                          type="text"
                          name="filter"
                          id="filter"
                          autoComplete='off'
                          value={props.filterValue}
                          onChange={props.handleFilter}
                          />
    </>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
        <div>
          {/* Nimisyötekomponentin value-attribuutiksi annetaan muuttuja */}
          {/* joka on komponentin App-tilassa, jolloin App kontrolloi */}
          {/* syötekomponentin toimintaa */}
          name: <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete='off' 
                  value={props.newName}
                  onChange={props.handleNameChange}
                />
        </div>
        <div>
        number: <input
                  type="text"
                  name="number"
                  id="number"
                  autoComplete='off' 
                  value={props.newNumber}
                  onChange={props.handleNumberChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  return (
    <>
    {props.filteredPersons.map(person => 
    <Person key={person.name} person={person}/>)}
    </>
  )
}

const Person = (props) => (
  <p>
  {props.person.name} {props.person.number}
  </p>
)

const App = () => {
  // App-komponentille määritellään tila, joka saa alkuarvoksi
  // luettelon alustavan taulukon
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231234' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  // Tila newName kontrolloi lomaketta 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  // filterValue kontrolloi filter kenttää
  const [filterValue, setFilterValue] = useState('')

  // Lomakkeen tapahtumankäsittelijä
  // event.preventDefault() estää oletusarvoisen toiminnan
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    // Jos lisättävä nimi on olemassa, estetään lisäys
    // Test on testifunktio
    const test = (element) => element.name === newName

    // Logitusta voi käyttää varmistamaan, että tulos on haluttu:
    // console.log(persons.some(test)) antaa true, jos nimi on jo listassa.
    // Sitten voi tehdä if-lauseen tai ternaryn.
    // Jos arrayn mikään elementti ei palauta testifunktiolla true
    // nimi ei ole listassa ja se lisätään.
    
    persons.some(test) 
      ? alert(`${newName} is already added to phonebook`) 
      : setPersons(persons.concat(nameObject))

    // Nimisyöte tyhjennetään joka tapauksessa
    setNewName('')
    setNewNumber('')
  }

  // Nimisyötekomponentin tapahtumankäsittelijä synkronoi
  // nimikenttään tehdyt muutokset App-komponentin tilaan
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Number syötekomponentin tapahtumankäsittelijä
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // Filter syötekomponentin tapahtumankäsittelijä
  const handleFilter = (event) => {
    setFilterValue(event.target.value)
  }

  // Rajataan näytettävät niment filtterin arvon mukaan
  const filteredPersons = persons.filter((element) => (
  element.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())))
  
  return (
    <div>
      <h2>Phonebook</h2>
      {/* Hakukenttä */}
      <Filter filterValue={filterValue} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      < PersonForm onSubmit={addName}
                    newName={newName}
                    handleNameChange={handleNameChange}
                    newNumber={newNumber}
                    handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {/* Näytetään suodatetut tiedot*/}
      <Persons filteredPersons={filteredPersons} />
    </div>
  )

}

export default App
