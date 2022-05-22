import React from 'react'
import { ChevronRight, ChevronLeft } from 'react-feather'
import Swiper from 'react-id-swiper/lib/custom'
import 'react-id-swiper/src/styles/css/swiper.css'

import Image from './Image'
import './Gallery.css'

export default ({ images = [], alt = '' }) => {
  const params = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    autoHeight: true,
    grabCursor: true,
    renderPrevButton: () => (
      <button className="SwiperButton swiper-button-prev">
        <ChevronLeft />
      </button>
    ),
    renderNextButton: () => (
      <button className="SwiperButton swiper-button-next">
        <ChevronRight />
      </button>
    )
  }

  return (
    <div className="Gallery">
      <Swiper {...params}>
        {images.map((image, index) => (
          <div key={`GalleryImage${index}`}>
            <Image key={image + index} src={image} alt={alt} />
          </div>
        ))}
      </Swiper>
    </div>
  )
}
