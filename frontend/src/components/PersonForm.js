const PersonForm = ({addName, handleNewName, handleNewNumber}) => {
return(
  <div>
  <h2>Add new</h2>
    <form onSubmit={addName}>
      <div>
        name: <input onChange={handleNewName} />
      </div>
      <div>
        number: <input onChange={handleNewNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
)
}
export default PersonForm
