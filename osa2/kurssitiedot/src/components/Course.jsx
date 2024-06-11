const Course = ({courses}) => {
    return (
      <div>
        {courses.map((course) => (
          <div key = {course.id}>
            <Header name = {course.name}/>
            <Content parts = {course.parts}/>
            <Total parts = {course.parts}/>
          </div>
        ))}
      </div>
    )
  }
  
  const Header = (props) => {
    return(
      <div>
        <h2>{props.name}</h2>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map((value) => (
          <Part key = {value.name} part = {value.name} exercises = {value.exercises} />
        ))}
      </div>  
    )
  }
  
  
  const Total = ({parts}) => {
    const exercisesHours = parts.map(value => value.exercises)
    const sum = exercisesHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  
    return (
      <div>
        <h4> total of {sum} exercises</h4>
      </div>
    )
  }

  export default Course