import React from 'react';

const Navigation = ({ routeChange, isLoggedIn })=>{
	if(isLoggedIn){
		return(
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p onClick={ ()=>routeChange('logout') } className='f5 link dim black pointer pa3 underline mb0'>Sign Out</p>
			</nav>
		)
	} else {
		return(
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p onClick={ ()=>routeChange('signin') } className='f5 link dim black pointer pa3 underline mb0'>Sign In</p>
				<p onClick={ ()=>routeChange('register') } className='f5 link dim black pointer pa3 underline mb0'>Register</p>			
			</nav>
		)
	}
}

export default Navigation;