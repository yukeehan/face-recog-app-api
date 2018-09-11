import React from 'react';

const Rank = ({ name, entries })=>{
	return(
		<div>
			<div className='f3 white'>
				{ `${name}, You current entry count is..`}
			</div>
			<div className='f2 white'>
				{`#${entries}`}
			</div>
		</div>
	)
}

export default Rank;