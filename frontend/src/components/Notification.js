const Notification = ({message}) => {

  if(message === null) {
    return null
  }

  if(message.includes("added") || message.includes("updated")) {
    return (
    <div className={'confirm'}>
     {message}
    </div>
    )
  }

  return (
    <div className={'error'}>
      {message}
    </div>
  )
}

export default Notification
