import "../Styles/message.css"

const Message = ({user , message , classs}) => {
    if(user)
        return(
             <div className={`messageBox ${classs}`}>
                {`${user}:${message}`}
            </div>
        )
  return (
    <>
    <div className="messageBox right">
        {message}
    </div>
    </>
  )
}
export default Message