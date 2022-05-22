import React, { Component } from 'react'

import Slider from 'react-slick/dist/react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import quote from '../images/quote.svg'
import './Testimonials.css'

export default class Testimonials extends Component {


  render() {
    const { items } = this.props

    const settings = {
      dots: true,
      arrows: false,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <section className="section col2 Testimonials">
        <div className="container skinny taCenter">
          <h3>Testimonials</h3>
        </div>
        <div className="container skinny taCenter">
          <div className="Testimonials--Slider">
            <div
              className="Testimonials--Slider--Quote"
              style={{ backgroundImage: `url(${quote})` }}
            />
            <Slider {...settings}>
              {items.map((item = {}, index) => {
                return (
                  <div
                    className='Testimonials--Slider--Item'
                    key={item.name}
                  >
                    <p>{item.testimonial}</p>
                    <div className="Testimonials--Slider--Item--Name">
                      – <strong>{item.name}</strong>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>
        </div>
      </section>
    )
  }
}
