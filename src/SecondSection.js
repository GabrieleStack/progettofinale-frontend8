import React, { useEffect, useState, useRef } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function SecondSection({ searchResults, addToCart, removeFromCart }) {
  const [cards, setCards] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [showingAll, setShowingAll] = useState(false);
  const [bouncingCardId, setBouncingCardId] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (searchResults.length > 0) {
      setCards(searchResults);
    } else {
      fetchAllCards();
    }
  }, [searchResults]);

  const fetchAllCards = () => {
    fetch('http://localhost:3001/api/wine?tipology=Bianco')
      .then(res => {
        if (!res.ok) {
          throw new Error('Errore nella fetch');
        }
        return res.json();
      })
      .then(data => {
        setCards(data);
      })
      .catch(err => {
        console.error('Errore nella richiesta della fetch', err);
      });
  };

  const toggleCardsVisibility = () => {
    if (showingAll) {
      setVisibleCount(4);
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setVisibleCount(cards.length);
      setTimeout(() => {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
    setShowingAll(!showingAll);
  };

  const handleCardClick = (cardId) => {
    setBouncingCardId(cardId);
    setTimeout(() => {
      setBouncingCardId(null); 
    }, 500);
  };

  const displayedCards = cards.slice(0, visibleCount);

  return (
    <div className="contenitorecard" ref={containerRef}>
      <Row className="g-5">
        {displayedCards.length > 0 ? displayedCards.map((card) => (
          <Col md={3} key={card._id}>
            <Card
              className={`cardintera ${bouncingCardId === card._id ? 'bounce' : ''}`}
              style={{ width: '18rem' }}
              onClick={() => handleCardClick(card._id)}
            >
              <Card.Img className="imgcard" variant="top" src={card.image} />
              <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <Card.Text>Tipo: {card.tipology}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item className="list-item-year">Annata: {card.year}</ListGroup.Item>
                <ListGroup.Item className="list-item-price">EUR: {card.price}</ListGroup.Item>
              </ListGroup>
                <Button className="bottonecarrello" variant="primary" onClick={() => { console.log("Adding to cart", card); addToCart(card); }}>Aggiungi al Carrello</Button>
                <Button className="bottonecarrello2" variant="danger" onClick={() => { console.log("Removing from cart", card); removeFromCart(card); }}>Rimuovi dal Carrello</Button>
            </Card>
          </Col>
        )) : (
          <p>No cards available</p>
        )}
      </Row>
      <div className="contenitorebottone">
        <div className="lineabottone"></div>
        {cards.length > 4 && (
          <Button variant="primary" className="bottonedipiù" onClick={toggleCardsVisibility}>
            {showingAll ? 'Visualizza di meno' : 'Visualizza di più'}
          </Button>
        )}
        <div className="lineabottone"></div>
      </div>
    </div>
  );
}
