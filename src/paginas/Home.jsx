import { useEffect, useState } from 'react'
import Posters from '../componentes/Posters'
import { URL_PELICULAS_POPULARES, URL_IMAGEN, URL_QUERY_PELICULA } from '../configApi'
import style from './Home.module.css';


function Home() {

  const [peliculasDelMomento, setPeliculasDelMomento] = useState([]);
  const [loading, setLoading] = useState(false)
  const [queryMovie, setQueryMovie] = useState('');

  const getPeliculasPopulares = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL_PELICULAS_POPULARES);
      const data = await response.json();
      setLoading(false);
      const top_12_peliculas = data.results.slice(0,12);
      setPeliculasDelMomento(top_12_peliculas);
      localStorage.setItem('movies', JSON.stringify(top_12_peliculas));
    } catch (error) {
      console.log(error.message);
    }
  }

  const getQueryMovie = async () => {
    const response = await fetch(URL_QUERY_PELICULA(queryMovie));
    const data = await response.json();

    if ( data.results.length ) {
      const top_12_peliculas = data.results.slice(0,12);
      setPeliculasDelMomento(top_12_peliculas);
    }
  }

  useEffect(() => {
    getPeliculasPopulares();
  }, [])
  
  useEffect(() => {
    if( queryMovie.length > 3 ) {
      getQueryMovie()
    }

    if ( queryMovie.length <= 3 ) {
      const firstMovies = JSON.parse( localStorage.getItem('movies') );
      setPeliculasDelMomento(firstMovies);
    }
  }, [queryMovie])
  

  return (
    <div className={style.contenedor}>
      <h1 className={style.contenedor_titulo}>Peliculas Del Momento</h1>

      <div className={style.searchBox}> 
        <label htmlFor="busqueda">Buscar película</label>
        <input type="search" onChange={({target}) => setQueryMovie(target.value)} placeholder='Spiderman, Titanic...' id='busqueda'/>
      </div>

      <div className={style.posters}>        
        {
          peliculasDelMomento.map( movie => (
            <Posters 
              URL_IMAGEN={URL_IMAGEN} 
              key={movie.id}
              poster_path={movie.poster_path}
              titleMovie={movie.title}
              idPelicula={movie.id}
            />
          ))
        }
      </div>
      { loading && <p className={style.loading}>Cargando peliculas....</p> }
    </div>
  )
}

export default Home;