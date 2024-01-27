import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification,removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

const anecdotes = useSelector (({ filter, anecdotes }) => {
        if (filter === "") {
            return anecdotes
        }
        return anecdotes.filter((element) => element.content.includes(filter))
    })

    const vote = (id, content) => {
        // console.log('vote', id)
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`you voted '${content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <>
        {anecdotes.toSorted((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
    )
}

export default AnecdoteList