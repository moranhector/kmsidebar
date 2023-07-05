import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';



const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;


const Albumes = () => {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // API Acces Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:
        'grant_type=client_credentials&client_id=' +
        CLIENT_ID +
        '&client_secret=' +
        CLIENT_SECRET,
    };
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function searchArtists() {
    console.log('Buscando ...', searchInput);

    // Get request using search to get the Artists
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    };

    fetch(
      'https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist',
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setArtists(data.artists.items.slice(0, 20));
        console.log('Estos son los artistas encontrados:', data);
      });
  }

  async function selectArtist(artist) {
    setSelectedArtist(artist);
    await fetchArtistAlbums(artist.id);
  }

  async function fetchArtistAlbums(artistId) {
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    };

    fetch(
      'https://api.spotify.com/v1/artists/' +
        artistId +
        '/albums' +
        '?include_groups=album&market=US&limit=50',
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('INFO DE ALBUMES', data.items);
        setAlbums(data.items);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>KILLER MUSIC V0702</h1>
      </header>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault(); // Evitar envío del formulario
          searchArtists(); // Ejecutar la función de búsqueda
        }}
      >
        <TextField
          id="outlined-basic"
          label="nombre de artista o banda"
          variant="outlined"
          placeholder="Artista:"
          type="input"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault(); // Evitar envío del formulario
              searchArtists(); // Ejecutar la función de búsqueda
            }
          }}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
        />

        <Button variant="contained" onClick={searchArtists}>
          Buscar
        </Button>
      </Box>

      <Container>
        {selectedArtist && (
          <div>
            <h2>Álbumes de {selectedArtist.name}</h2>
            <div className="album-row">
              {albums.map((album, i) => {
                return (
                  <Card
                    sx={{ maxWidth: 200 }}
                    className="album-card card-shadow"
                    key={i}
                  >
                    <CardMedia
                      sx={{ height: 200 }}
                      image={album.images[0].url}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h7" component="div">
                        {album.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        to={`/create/${encodeURIComponent(
                          album.id
                        )}/${encodeURIComponent(accessToken)}`}
                      >
                        Ver Canciones
                      </Link>
                    </CardActions>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {!selectedArtist && (
          <div>
            <h2>Artistas encontrados:</h2>
            <div className="artist-row">
              {artists.map((artist, i) => {
                return (
                  <Card
                    sx={{ maxWidth: 200 }}
                    className="artist-card card-shadow"
                    key={i}
                    onClick={() => selectArtist(artist)}
                  >
                    <CardMedia
                      sx={{ height: 200 }}
                      image={artist.images[0]?.url || ''}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h7" component="div">
                        {artist.name}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Albumes;
