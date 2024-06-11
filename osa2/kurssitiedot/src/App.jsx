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

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course courses = {courses} />
    </div>
  )
}

export default App