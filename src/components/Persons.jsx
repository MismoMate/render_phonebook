
const Persons = (props) => {
    return (
        <div>
            {
                props.persons.map(
                    person =>
                    <Entry key={person.id} name={person.name} number={person.number} id={person.id} handleDeletion={props.handleDeletion} />
                )
            }
        </div>
    )
}

const Entry = (props) => {

    const handleDeleteClick = () => {
        console.log(props.id)
        if (window.confirm(`Delete ${props.name}`)) {
            props.handleDeletion(props.id)
        } else {
            console.log("Deletion canceled")
        }
    }

    return (
        <>
            <p>{props.name} {props.number} <button onClick={handleDeleteClick} >Delete</button></p>
        </>
    )
}

export default Persons
