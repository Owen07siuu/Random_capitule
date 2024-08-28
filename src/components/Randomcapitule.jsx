import axios from 'axios';
import { useEffect, useState } from 'react';

export const Randomcapitule = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.sampleapis.com/simpsons/episodes");
        const data = response.data;

        const formattedEpisodes = data.map(episode => ({
          name: episode.name,
          rating: episode.rating,
          season: episode.season,
          picture: episode.thumbnailUrl,
        }));

        setEpisodes(formattedEpisodes);
      } catch (error) {
        console.error("Error al consultar los datos de la API", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        {episodes.map((episode, index) => (
          <div className='col-lg-4 mb-4' key={index}>
            <div className="card h-100 d-flex flex-column text-center">
              <div className='image-container card-header'>
                <img src={episode.picture} className="img-fluid rounded" alt={episode.name} />
              </div>
              <div className="card-body flex-grow-1 d-flex flex-column">
                <h4 className='card-title mt-auto'>Nombre: {episode.name}</h4>
                <p className='card-text'>Temporada: {episode.season}</p>
                <p className='card-text'>Rating: {episode.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};