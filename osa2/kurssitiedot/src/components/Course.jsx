const Course = ({courses}) => {
    return (
        <>  
            <MainHeader />
            {courses.map(part =>
             <div key={part.id}>
                <Header course={part.name} />
                <Content parts={part.parts} />
                <Total parts={part.parts} />
            </div>
            )}        
        </>
      )
}

const MainHeader =  () => <h1>Web development curriculum</h1>

const Header = (props) => {
    return (
      <h2>{props.course}</h2>
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
        <b>total of {props.parts.reduce((a, c) => a + c.exercises, 0)} exercises </b>
      </p>
      </>
    )
  }

  export default Course