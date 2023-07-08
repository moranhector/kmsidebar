import React from 'react';
import { Card } from 'react-bootstrap';

function AlbumCard({ tapaAlbum }) {
  return (
    <Card>
      <Card.Img variant="top" src={tapaAlbum} />
      <Card.Body>
        <Card.Title>Álbum</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default AlbumCard;
