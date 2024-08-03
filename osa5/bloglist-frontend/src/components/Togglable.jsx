import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const togglevisiblity = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return{
      togglevisiblity
    }
  })


  return(
    <div>
      <div style = {hideWhenVisible}>
        <button onClick={togglevisiblity}>{props.buttonLabel}</button>
      </div>
      <div style = {showWhenVisible}>
        {props.children}
        <button onClick={togglevisiblity}>cancel</button>
      </div>
    </div>
  )

})

Togglable.displayName = 'Togglable'

export default Togglable