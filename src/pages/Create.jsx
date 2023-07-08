import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { BsPlayFill } from "react-icons/bs";
import axios from 'axios';
import AlbumCard from '../components/AlbumCard';
 


axios.defaults.baseURL = 'http://localhost:8000'; // Establece la base URL a tu backend en el puerto 8000



function Create() {
  const { param1, param2 } = useParams();

  // const [album, setAlbum] = useState([]);

  const [tapaAlbum, setTapaAlbum] = useState("");
  const [tracks, setTracks] = useState([]);


  useEffect(() => {
    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + param2
      }
    };

    // Obtener álbum y tracks
    fetch(`https://api.spotify.com/v1/albums/${param1}`, searchParameters)
      .then(response => response.json())
      .then(data => {
        console.table("ALBUM name", data.name);
        console.table("ALBUM data", data);
        setTapaAlbum(data.images[0].url);

        // Enviar el dato data.name a la API REST
        axios.post('/api/albums', {
          name: data.name,
          spotify_id: data.id,
          release_date: data.release_date,
          tipo: data.type,
          market: 'sd',
          images: data.images[0].url,
          total_tracks: data.total_tracks,
          uri: data.uri,
          genres: 'sd',
          label: data.label,
          popularity: data.popularity,
          productor_id: '1',
          cant_disc: '1'
        })
          .then(response => {
            console.log('Dato enviado a la API REST:', response.data);
          })
          .catch(error => {
            console.error('Error al enviar el dato a la API REST:', error);
          });

        // Obtener tracks
        fetch(`https://api.spotify.com/v1/albums/${param1}/tracks`, searchParameters)
          .then(response => response.json())
          .then(data => {
            setTracks(data.items);
            console.log('TRACKS:', data.items);
          });
      });

  }, [param1, param2]);


  // const convertMsToSeconds = (durationMs) => {
  //   return Math.floor(durationMs / 1000);
  // };

  const convertMsToMinutesAndSeconds = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <AlbumCard tapaAlbum={tapaAlbum} />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <h2>Lista de canciones</h2>
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Duración</th>
                <th>Calificación</th>
                <th>Spotify</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track, index) => (
                <tr key={track.id}>
                  <td>{index + 1}</td>
                  <td>{track.name}</td>
                  <td>{convertMsToMinutesAndSeconds(track.duration_ms)}</td>

                  <td>
                    <input type="number" min="1" max="10" placeholder="Calificación" />
                  </td>
                  <td>
                    <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                      <BsPlayFill className="mr-1" /> Play & Lyrics
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Create;
