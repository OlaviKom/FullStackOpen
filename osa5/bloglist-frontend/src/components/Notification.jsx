const Notification = ({ message, type }) => {
  if(message === null){
    return null

  } else if(type === 'succeed') {
    return(
      <div className="succeed">
        {message}
      </div>
    )
  } else if(type === 'error'){
    return(
      <div className="error">
        {message}
      </div>
    )
  }

}

export default Notification