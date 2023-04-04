import { useEffect, useState } from 'react'
import style from './Detalles.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { URL_KEY_VIDEO, URL_TRAILER_YOUTUBE } from '../configApi'
import { URL_REPARTO_PELICULA } from '../configApi'



function Detalles() {
  let navigate = useNavigate();
  let location = useLocation();
  const idMovie = location.search.slice(4);

  const [dataVideo, setTitleAndVideo] = useState({title: '', video: '', generos: [], descripcion: ''});
  const [repartoPelicula, setRepartoPelicula] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTitleAndVideo = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL_KEY_VIDEO(idMovie));
      const data = await response.json();
      setLoading(false);
      setTitleAndVideo({
        title: data?.original_title, 
        video: data?.videos?.results[0]?.key, 
        generos: data?.genres?.map(value => value.name),
        descripcion: data?.overview
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const getReparto = async () => {
    try {
      const response = await fetch(URL_REPARTO_PELICULA(idMovie));
      const data = await response.json();
      setRepartoPelicula(data?.cast?.slice(0,5).map(value => value.original_name));
    } catch (error) {
      console.log(error.message);
    }
  }
  
  useEffect(() => {
    getTitleAndVideo();
    getReparto();
  }, [])
  

  return (
    <div className={style.contenedor}>
      <h2 className={style.titlePelicula}>{dataVideo.title}</h2>
      <div className={style.marcoVideo}>
      <iframe width="560" height="315" src={`${URL_TRAILER_YOUTUBE}${dataVideo.video}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <section className={style.detallesPelicula}>
        {loading && <p style={{textAlign: 'center'}}>Cargando....</p>}
        <p><b>Descripcion:</b> {dataVideo.descripcion}</p>
        <p><b>Genero:</b> {dataVideo.generos.join(', ')}</p>
        <p><b>Reparto:</b> {repartoPelicula.join(', ')}</p> {/* Los 5 principales */}
      </section>

      <button onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  )
}

export default Detalles