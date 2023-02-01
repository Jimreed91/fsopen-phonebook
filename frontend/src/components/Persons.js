const Persons = ({personsToShow, handleDelete}) => {
  return(
    <div>
      <h2>Numbers</h2>
    {personsToShow.map((person) =>
      <div key={person.id}>
        <p>{person.name}: {person.number}</p>
        <p>ID-{person.id}</p>
        <button onClick={handleDelete} value={person.id}>Delete</button>
      </div>
    )}
    </div>
  )
}
export default Persons
