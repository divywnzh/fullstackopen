const Notification = ({error, notification}) =>{
    
    if(error===null && notification===null){
        return null
    }

    return (
        <>
        {notification !== null && <div className="notify">{notification}</div>}
        {error !== null && <div className="error">{error}</div>}
        </>
    );
}
export default Notification