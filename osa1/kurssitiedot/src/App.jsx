const Header = (props) => {
  return(
    <div>
      <h1>{props.course.name}</h1>
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
      <p> Number of exercises {sum}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

/* tehtava 1.4
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course = {course} />
      <Content parts = {parts} />
      <Total parts = {parts}/>
    </div>
  )
}

/* tehtava 1.3
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course = {course} />
      <Content 
      part1 = {part1.name} exercises1 = {part1.exercises}
      part2 = {part2.name} exercises2 = {part2.exercises}
      part3 = {part3.name} exercises3 = {part3.exercises}
      />
      <Total total = {part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

/* tehtava 1.2
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course} />
      <Content 
      part1 = {part1} exercises1 = {exercises1}
      part2 = {part2} exercises2 = {exercises2}
      part3 = {part3} exercises3 = {exercises3}
       />
      <Total total = {exercises1 + exercises2 + exercises3} /> 
    </div>
  )
}
*/

export default App