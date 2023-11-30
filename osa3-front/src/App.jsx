import { useState, useEffect } from 'react'
// Nyt axios toiminnallisuus on moduulissa persons
import personService from './services/persons'

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

const ShowPersons = ({filteredPersons, removePerson}) => {
  return (
    <>
    {filteredPersons.map(person => 
    <ShowPerson key={person.id} person={person} removePerson={removePerson}/>)}
    </>
  )
}

const ShowPerson = ({person, removePerson}) => {
  return (
    <p>
    {person.name} {person.number} 
    <Button id={person.id} name={person.name} removePerson={removePerson}/>
    </p>
  )
}

const Button = ({id, name, removePerson}) => (
  <button type="button"
          onClick={() => {if(window.confirm(`Delete ${name}?`)) {removePerson(id)}}}
          text="delete">delete</button>
)

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )  
}

const Error = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )  
}

const App = () => {
  // App-komponentille määritellään tila, joka saa alkuarvoksi
  // luettelon alustavan taulukon
  const [persons, setPersons] = useState([])
  
  // Tila newName kontrolloi lomaketta 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  // filterValue kontrolloi filter kenttää
  const [filterValue, setFilterValue] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // haetaan alustavan taulukon data palvelimelta
  // Axios-kirjaston avulla. Effect hook suoritetaan kerran.
  useEffect(() => {
    personService.getAll()
      .then(intialPersons => {
        setPersons(intialPersons)
    })
  },[])

  // Lomakkeen tapahtumankäsittelijä
  // event.preventDefault() estää oletusarvoisen toiminnan
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    // Jos lisättävä nimi on olemassa, kutsutaan funktiota
    // joka muuttaa nimeen liitetyn numeron
    const personIndex = persons.findIndex((element) => element.name === newName)

    if (personIndex === -1) {
      addPersonToServer(nameObject)
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        let id = persons[personIndex].id
        modifyPerson({id, nameObject})
      }            
    }

    // Nimisyöte tyhjennetään joka tapauksessa
    setNewName('')
    setNewNumber('')
  }

  // Funktio lisää uuden henkilön tiedot palvelimelle
  const addPersonToServer = (nameObject) => {
    personService.create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotifMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      }).catch(error => {
        setErrorMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removePerson = (id) => {
    personService.remove(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id))
        setNotifMessage(
          `Delete successful`
        )
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      })
  }

  // muutetaan objektin sisältö palvelimella
  const modifyPerson = ({id, nameObject}) => {
    personService.modify(id, nameObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person :
          returnedPerson))
        setNotifMessage(
          `Changed number for ${returnedPerson.name}`
        )
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${nameObject.name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
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
      <Notification message={notifMessage} />
      <Error message={errorMessage} />
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
      <ShowPersons filteredPersons={filteredPersons} removePerson={removePerson}/>
    </div>
  )

}

export default App
