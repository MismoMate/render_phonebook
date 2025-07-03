const Notification = ({message, isError}) => {
    if (message === null) {
        return null
    }

    const nots = (isError === false) ? {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px'
    } : {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px'
    }

    return (
        <div >
            <p style={nots}>{message}</p>
        </div>
    )

}

export default Notification
