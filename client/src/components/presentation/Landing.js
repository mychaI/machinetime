import React, { useEffect } from 'react';

const Landing = () => {

  return (
	<>
	  <div id='landing-page'>
	    <div className='landing-bg'>
		</div>
		<section id='hero'>
		  <h1>Welcome to MachineTime</h1>
		</section>
		<section id='details'>
		  <h2> Details about MachineTime </h2>
		  <figure className='detail-item'>
		    <div className='image-frame'>

			</div>
			<div className='animated fadeInRight'>
			</div>
		  </figure>

		  <figure className='detail-item'>
		  </figure>
		</section>
		<section id='about'>
		  <h2> About the Workshop </h2>
		  <div className='about-item'>
		    <p>Shop Hours </p>
			<p>Contact </p>
		  </div>
		</section>
	  </div>

	</>
  )
}

export default Landing;
