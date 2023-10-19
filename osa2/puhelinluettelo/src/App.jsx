import { useState } from 'react'

const App = () => {
  // App-komponentille määritellään tila, joka saa alkuarvoksi
  // luettelon alustavan taulukon
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  
  // Tila newName kontrolloi lomaketta 
  const [newName, setNewName] = useState('')

  // Lomakkeen tapahtumankäsittelijä
  // event.preventDefault() estää oletusarvoisen toiminnan
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
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
  }

  // Syötekomponentin tapahtumankäsittelijä synkronoi
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
