const Course = ({course}) => {
    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
    
        </div>
      )
}

const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Content = (props) => {
    return (
      <>
      {props.parts.map(part =>
        <Part key={part.id} part={part} />
        )}
      </>
    )
  }
  
  const Part = (props) => {
    return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
    )
  }
  
  const Total = (props) => {
    return (
      <>
      <p>
        Number of exercises {props.parts.reduce((a, c) => a + c.exercises, 0)}
      </p>
      </>
    )
  }

  export default Course