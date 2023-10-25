import { useState, useEffect } from 'react'
import axios from 'axios'

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

const ShowPersons = (props) => {
  return (
    <>
    {props.filteredPersons.map(person => 
    <ShowPerson key={person.name} person={person}/>)}
    </>
  )
}

const ShowPerson = (props) => (
  <p>
  {props.person.name} {props.person.number}
  </p>
)

const App = () => {
  // App-komponentille määritellään tila, joka saa alkuarvoksi
  // luettelon alustavan taulukon
  const [persons, setPersons] = useState([])
  
  // Tila newName kontrolloi lomaketta 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  // filterValue kontrolloi filter kenttää
  const [filterValue, setFilterValue] = useState('')

  // haetaan alustavan taulukon data palvelimelta
  // Axios-kirjaston avulla. Effect hook suoritetaan kerran.
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  },[])

  const addPersonToServer = (nameObject) => {
    axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        setPersons(persons.concat(nameObject))
      })
  }

  // Lomakkeen tapahtumankäsittelijä
  // event.preventDefault() estää oletusarvoisen toiminnan
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    // Jos lisättävä nimi on olemassa, estetään lisäys
    // test on testifunktio nimen matchaamiseen
    const test = (element) => element.name === newName

    // Logitusta voi käyttää varmistamaan, että tulos on haluttu:
    // console.log(persons.some(test)) antaa true, jos nimi on jo listassa.
    // Sitten voi tehdä if-lauseen tai ternaryn.
    // Jos arrayn mikään elementti ei palauta testifunktiolla true
    // nimi ei ole listassa ja se lisätään.
    
    persons.some(test) 
      ? alert(`${newName} is already added to phonebook`) 
//      : setPersons(persons.concat(nameObject))
      : addPersonToServer(nameObject)


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
      < PersonForm onSubmit={addPerson}
                    newName={newName}
                    handleNameChange={handleNameChange}
                    newNumber={newNumber}
                    handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {/* Näytetään suodatetut tiedot*/}
      <ShowPersons filteredPersons={filteredPersons} />
    </div>
  )

}

export default App
