import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

const anecdotes = useSelector (({ filter, anecdotes }) => {
        if (filter === "") {
            return anecdotes
        }
        return anecdotes.filter((element) => element.content.includes(filter))
    })

    const vote = (id) => {
        // console.log('vote', id)
        dispatch(voteAnecdote(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
    )
}

export default AnecdoteList