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

const CLIENT_ID = '194e1f971c73499ca3e70d29189aae94';
const CLIENT_SECRET = 'f092a8aaf35f4fe293c0b7a8b0f9532c';

const Albumes = () => {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [albums, setAlbums] = useState([]);
  const [artista, setArtista] = useState([]);

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

  async function Search() {
    console.log('Buscando ...', searchInput);

    //Get request using search to get the Artist ID

    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    };

    //Acá hago la búsqueda artistas por Nombre
    var artistID = await fetch(
      'https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist',
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setArtista(data.artists.items[0]);
        console.log('ARTISTAs:', data);

        return data.artists.items[0].id;
      });

    //.then(data => console.log( 'ARTISTA:', data ))

    //console.log("Artist ID is " + artistID);
    //

    //Acá hago la búsqueda de albumes por ID de ARtista
    var returnedAlbums = await fetch(
      'https://api.spotify.com/v1/artists/' +
        artistID +
        '/albums' +
        '?include_groups=album&market=US&limit=50',
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('INFO DE ALBUMES', data.items);
        setAlbums(data.items);
      });

    console.log('returnedAlbums', returnedAlbums);
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
      >
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          placeholder="Artista:"
          type="input"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              Search();
            }
          }}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
        />

        <Button variant="contained" onClick={Search}>
          Buscar
        </Button>
      </Box>

      <Container>
        <div className="album-row">
          {albums.map((album, i) => {
            return (
              <Card sx={{ maxWidth: 200 }} className="album-card card-shadow" key={i}>
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
                    to={`/second/${encodeURIComponent(
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
      </Container>
    </div>
  );
};

export default Albumes;
