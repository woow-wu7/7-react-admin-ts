import React from 'react'
import styled from 'styled-components'


const NotFound = () => {
	const renderRandom = () => {
		const index = Math.floor(Math.random() * 2) + 1;
		return (
			<Wrap>
				<Image src={require(`../../assets/iamges/404-${index}.jpg`)} alt="" />
			</Wrap>
		)
	}
	return renderRandom()
}

const Wrap = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`
const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`

export default NotFound
