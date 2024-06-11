const Course = (props) => {
  console.log(props.course.name)
  return (
    <div>
      <Header name = {props.course.name}/>
      <Content parts = {props.course.parts}/>
    </div>
  )
}


const Header = (props) => {
  return(
    <div>
      <h1>{props.name}</h1>
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
  console.log({parts})
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
      <p> Number of exercises {sum}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App