import React from 'react'
import Content from './Content'
import Image from './Image'
import { ICONClose } from './Icons'
import './MemberPopup.css'

export default ({ title, name, excerpt, description, image, active, handlePopup }) =>
	<div className={`member-popup ${active ? 'active' : ''}`}>
		<div className='popup-close' onClick={handlePopup}>
			<ICONClose />
		</div>
		<div className='container skinny'>
			<div className='popup-header'>
				{image && <Image background src={image} alt={`${name} profile image`} />}
				<div className='member-info'>
					{name && <h4>{name}</h4>}
					{title && <p className='title'>{title}</p>}
					{excerpt && <p>{excerpt}</p>}
				</div>
			</div>
			{description && <Content src={description} />}
		</div>
	</div>
