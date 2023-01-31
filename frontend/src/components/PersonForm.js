const PersonForm = ({addName, handleNewName, handleNewNumber, newName, newNumber}) => {
return(
  <div>
  <h2>Add new</h2>
    <form onSubmit={addName}>
      <div>
        name: <input onChange={handleNewName} value={newName}/>
      </div>
      <div>
        number: <input onChange={handleNewNumber} value={newNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
)
}
export default PersonForm
