import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import SecondSection from './SecondSection.js';
import ThirdSection from './ThirdSection.js';

function MainSection({ searchResults, addToCart, removeFromCart }) {
  return (
    <div className='carosello'>
      <Carousel>
        <Carousel.Item>
          <Image className='img1' src='https://casalevallechiesa.it/gallery/we_13.jpg' />
          <Carousel.Caption>
            <h3 className='h3'>Presenti dal 1998</h3>
            <p className='p'>La nostra azienda prende a cuore la qualità dei prodotti e li indirizza a buongustai!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className='img1' src='https://casalevallechiesa.it/gallery/we_14.jpg' />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className='img1' src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/b6/65/b3/majesty-everywhere.jpg?w=1000&h=800&s=1' />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className='header-with-lines'>
        <div className='line left-line'></div>
        <h1 className='title'>Cosa offriamo</h1>
        <div className='line right-line'></div>
      </div>
      <div className='vini'>
        <div className='linea left-line'></div>
        <h1 className='titolovini'>Vini bianchi</h1>
        <div className='linea right-line'></div>
      </div>
      <div id="second-section">
        <SecondSection searchResults={searchResults} addToCart={addToCart} removeFromCart={removeFromCart} />
      </div>
      <div className='vinirossi'>
        <div className='linea left-line'></div>
        <h1 className='titolovinirossi'>Vini Rossi</h1>
        <div className='linea right-line'></div>
      </div>
      <div id='third-section'>
        <ThirdSection />
      </div>
    </div>
  );
}

export default MainSection;
