import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onImageSubmit })=>{
	return(
		<div>
			<p>
				{'This Magic Brain will detact faces in your pictures. Give it a try!'}
			</p>
			<div className='center'>
				<div className='center pa4 br3 shadow-5 form'>
					<input className='f4 w-70 pa2' type='text' onChange={onInputChange}/>
					<button 
						className='f5 w-30 grow link dib bg-light-purple white br2'
						onClick={onImageSubmit}>
						{'Submit'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default ImageLinkForm;