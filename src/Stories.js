import React from 'react'
import { useGlobalContext } from './context'

const Stories = () => {
    const data = useGlobalContext()
    if (data.isLoading) {
        return <h1>Loading.....</h1>
    }

    const handleRemove = (id) => {
        data.deletePost(id)
    }
    
    return (
        <div className='stories-div'>
            {data && data.hits.map((it) => {
                return (

                    <div className='card' key={it.objectID}>
                        <h2>{it.title}</h2>
                        <p>
                            By <span>{it.author}</span> | <span>{it.num_comments}</span> comments
                        </p>
                        <div className='card-button'>
                            <a href={it.url} target='_blank' rel='noreferrer'>
                                Read More....
                            </a>
                            <button type='button' id='delete_id' onClick={() => handleRemove(it.objectID)}>Remove</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Stories










