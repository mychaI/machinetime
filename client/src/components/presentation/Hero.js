import React from 'react';

const Hero = () => {

  const logo = 'https://res.cloudinary.com/cloudforest/image/upload/v1586664910/MachineTime/MachineTimeLogo.png'; 

  return (
    <section id='hero'>
	  <div id='hero-description'>
	    <div className='logo-frame'>
		  <img className='logo' src={logo} alt='logo' />
		</div>
		
		<div className='subtitle'>
		  <h2> Reserve time on shop machines Made easy </h2>
		</div>

	  </div>
	</section>
  );
};

export default Hero;


