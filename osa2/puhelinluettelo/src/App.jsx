import { useState } from 'react'

const App = () => {
  // App-komponentille määritellään tila, joka saa alkuarvoksi
  // luettelon alustavan taulukon
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  
  // tila newName kontrolloi lomaketta 
  const [newName, setNewName] = useState('')

  // Lomakkeen tapahtumankäsittelijä
  // event.preventDefault() estää oletusarvoisen toiminnan
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  // Syötekomponentin tapahtumankäsittelijä, joka synkronoi
  // nimikenttään tehdyt muutokset App-komponentin tilaan
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Nimilomakkeen tapahtumankäsittelijä on addName */}
      <form onSubmit={addName}>
        <div>
          {/* Nimisyötekomponentin value-attribuutiksi annetaan muuttuja */}
          {/* joka on komponentin App-tilassa, jolloin App kontrolloi */}
          {/* syötekomponentin toimintaa */}
          name: <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete='off' 
                  value={newName}
                  onChange={handleNameChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.name}>{person.name}</p>
        )}
    </div>
  )

}

export default App
