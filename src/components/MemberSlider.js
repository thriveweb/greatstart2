import React, { Component } from 'react'

import Slider from 'react-slick/dist/react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from './Image'
import Content from './Content'
import MemberPopup from './MemberPopup'
import './MemberSlider.css'

class MemberSlider extends Component {

	state = {
		popupActive: null
	}

	handlePopup = (index = null) => {
		this.setState({
			popupActive: index
		})

		document.body.style.overflow = index ? 'hidden' : 'auto'
		document.documentElement.style.overflow = index ? 'hidden' : 'auto'
	}

  	render() {
		const settings = {
		  className: "center",
		  infinite: true,
		  centerPadding: "60px",
		  slidesToShow: 3,
		  swipeToSlide: true,
		  slidesToScroll: 1,
		  autoplay: true,
		  speed: 1500,
		  autoplaySpeed: 4000,
		  arrows: true,
		  dots: true,
		  responsive: [
	        {
	          breakpoint: 1000,
	          settings: {
	            slidesToShow: 2,
	          }
	        },
	        {
	          breakpoint: 700,
	          settings: {
	            slidesToShow: 1,
	          }
	        },
	        {
	          breakpoint: 600,
	          settings: {
	          	slidesToShow: 1,
	           	arrows: false,
	          }
	        }
	      ]
		};

	    const { members = [] } = this.props

		if(!members.length) return null

		return <section className='TeamMember--slider'>
			<Slider {...settings}>
				{members && members.map(( member, index ) => {
					const {name, title, image, excerpt, description} = member

					return (
						<div
							key={`member-${index}`}
							className='slide member hasShadowHover'
							onClick={() => this.handlePopup(index)}
						>
							{image && <Image background src={image} alt={`${name} profile image`}/>}
							<div className='member-info'>
								{name && <h4>{name}</h4>}
								{title && <p>{title}</p>}
								<p className='readmore Button'>Read Full Bio</p>
							</div>
						</div>
					)
				})}
			</Slider>
			{members && members.map(( member, index ) => {
				const {name, title, image, excerpt, description} = member

				return (
					<MemberPopup
						key={`service-popup-${index}`}
						image={image}
						title={title}
						name={name}
						excerpt={excerpt}
						description={description}
						active={this.state.popupActive === index}
						handlePopup={() => this.handlePopup()}
					/>
				)
			})}
	    </section>
	}
}

export default MemberSlider
