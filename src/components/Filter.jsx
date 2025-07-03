
const Filter = (props) => {

    return (
    <div>
        <p>{props.text} <input value={props.inputValue} onChange={props.onChange} /></p>      
        <div>
            {
            !props.match ? <p>No search results</p> : props.phonebook.map(person => {
                if (person.name.toLowerCase().includes(props.inputValue.toLowerCase())) {              
                return <Entry key={person.id} name={person.name} number={person.number} />
                }
            })
            }
        </div>        
    </div>
    )
}

const Entry = (props) => {

    return (
        <>
            <p>{props.name} {props.number}</p>
        </>
    )
}



export default Filter
