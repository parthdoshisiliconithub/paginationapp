import { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext()



const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_STORIES':
            return { ...state, hits: action.payload.hits, nbPages: action.payload.nbPages, isLoading: false }

        case 'SET_LOADING':
            return { ...state, isLoading: true }
        case "DELETE_POST":
            return {
                ...state,
                hits: state.hits.filter((it) => {
                    return it.objectID !== action.payload.id
                })
            }
        case 'SEARCH_POST':
            return {
                ...state,
                query: action.payload.query
            }

        case "NEXT_PAGE":
            let nextpageNo = state.page + 1
            if (nextpageNo >= state.nbPages) {
                nextpageNo = 0
            }
            return {
                ...state,
                page: nextpageNo
            }
        case "PREV_PAGE":
            let pageNo = state.page - 1
            if (pageNo <= 0) {
                pageNo = 0
            }
            return {
                ...state,
                page: pageNo
            }
        default:
            return state;
    }
}

const AppProvider = ({ children }) => {
    const initialState = {
        query: '',
        isLoading: true,
        nbPages: 0,
        page: 0,
        hits: []
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const API = `https://hn.algolia.com/api/v1/search?`

    const fetchApi = async (api) => {
        try {
            const res = await fetch(api)
            const data = await res.json()
            dispatch({
                type: 'GET_STORIES',
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages
                }
            })

        } catch (err) {
            console.log("Error is", err)
        }
    }

    const deletePost = (id) => {
        dispatch({
            type: 'DELETE_POST',
            payload: {
                id: id
            }
        })
    }

    const searchPost = (data) => {
        dispatch({
            type: 'SEARCH_POST',
            payload: {
                query: data
            }
        })
    }

    const handleNext = () => {
        dispatch({
            type: 'NEXT_PAGE'
        })
    }

    const handlePrev = () => {
        dispatch({
            type: 'PREV_PAGE'
        })
    }

    useEffect(() => {
        fetchApi(`${API}query=${state.query}&page=${state.page}`)
        dispatch({
            type: 'SET_LOADING'
        })
        // eslint-disable-next-line
    }, [state.query, state.page])

    return <AppContext.Provider value={{ ...state, deletePost, searchPost, handleNext, handlePrev }}>
        <h1>{children}</h1>
    </AppContext.Provider>

}

//create  custom hook
const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, AppContext, useGlobalContext }