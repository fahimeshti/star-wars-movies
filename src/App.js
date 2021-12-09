import { useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import './App.css'
import SkeletonLoader from './loading-skeleton/SkeletonLoader'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    fetchMovies()
  },[])
async function fetchMovies() {
      setIsLoading(true)
      setError(null)
  try {
      const response = await fetch('https://swapi.dev/api/films/')
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
        const data = await response.json()
          const newMovieList = data.results.map(movieInfo => {
          return {
            id: movieInfo.episode_id,
            title: movieInfo.title, 
            openingText: movieInfo.opening_crawl,
            releaseDate: movieInfo.release_date
          }
      })
      setMovies(newMovieList)  
     
  } catch (error) {
    setError(error.message)
  }

  setIsLoading(false)
}

let content = <p>Click to see Movies</p>
if (movies.length > 0) {
  content = <MoviesList movies={movies} />
}
if (error) {
  content = <p>{error}</p>
}
if (isLoading) {
  content = <SkeletonLoader />
}

  return (
        <>
          <section>
            <button onClick={fetchMovies}>Fetch Movies Again 	↺</button>
          </section>
          <section>{content}</section>
        </>
  );
}

export default App;
