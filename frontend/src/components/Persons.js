const Persons = ({personsToShow, handleDelete}) => {
  return(
    <div>
      <h2>Numbers</h2>
    {personsToShow.map((person) =>
      <div key={person.id}>
        <p>{person.name}: {person.number}</p>
        <button onClick={handleDelete} value={person.id}>Delete</button>
      </div>
    )}
    </div>
  )
}
export default Persons
