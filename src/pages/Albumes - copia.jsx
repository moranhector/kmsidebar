import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const CLIENT_ID = '194e1f971c73499ca3e70d29189aae94'
const CLIENT_SECRET = 'f092a8aaf35f4fe293c0b7a8b0f9532c'


const Albumes = () => {


    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);

    const [artista, setArtista] = useState([]);

    useEffect(() => {
        // API Acces Token
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            // .then(data => console.log(data.access_token))
            .then(data => setAccessToken(data.access_token))
    }, [])

    async function Search() {
        console.log(" Buscando ...", searchInput);

        //Get request using search to get the Artist ID

        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        //Acá hago la búsqueda artistas por Nombre
        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => response.json())
            .then(data => {

                setArtista(data.artists.items[0])
                console.log('ARTISTAs:', data );

                return data.artists.items[0].id
            }
            )




        //Acá hago la búsqueda de albumes por ID de ARtista
        var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID +
            '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
            .then(response => response.json())
            .then(data => {
                console.log("INFO DE ALBUMES", data.items);
                setAlbums(data.items);
            });


            console.log('returnedAlbums',returnedAlbums)



        }

    return (
        <div>
            <h1>Albumes page</h1>






             
                <InputGroup>
                    <FormControl
                        placeholder="Artista:"
                        type="input"
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                Search();
                            }
                        }}
                        onChange={event => { setSearchInput(event.target.value) }}
                    />
                    <Button onClick={Search}>
                        Buscar
                    </Button>

                </InputGroup>
            
            
                <Row>
                    {albums.map((album, i) => {
                        //console.log(album);
                        return (
                            <Card>
                                <Card.Img src={album.images[0].url} />
                                <Card.Body>
                                    <Card.Title>{artista.name}</Card.Title>
                                    <Card.Title>{album.name}</Card.Title>
                                    <Link to={`/second/${encodeURIComponent(album.id)}/${encodeURIComponent(accessToken)}`}>Ver Canciones</Link>
                                </Card.Body>
                            </Card>
                            )

                    })}
                </Row>
             

       







        </div>
    );
};

export default Albumes;