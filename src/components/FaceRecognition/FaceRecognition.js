import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, boxes })=>{
	return(
		<div className='center mb5 ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={imageURL} width='400px' height='auto'/>	
				{
					boxes.map((box, i)=>{
						return(
							<div className='bounding-box' key={i}
								 style={{ top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow }}>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default FaceRecognition;