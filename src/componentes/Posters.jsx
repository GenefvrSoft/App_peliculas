import style from './Posters.module.css';
import { useNavigate } from 'react-router-dom';



function Posters({ URL_IMAGEN, poster_path, titleMovie, idPelicula }) {
  let navigate = useNavigate();
    
  return (
    <div className={style.contenedor} onClick={() => navigate(`/detalles?id=${idPelicula}`)}>
        <section className={style.marco_poster}>
            <img 
                src={`${URL_IMAGEN}${poster_path}`}
                alt="miniatura de la pelicula" 
                className={style.Poster} 
            />
        </section>
        <h2 className={style.tituloPelicula}>{titleMovie}</h2>
    </div>
  )
}

export default Posters;