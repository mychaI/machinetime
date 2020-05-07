import React from 'react';

const Services = () => {
  return (
    <>
	  <section id='about'>

		<h2 id='about-title'> Other Services</h2>

		<div id='about-content'>
		  <div className='about-item'>
			<p>Woodworking classes for all levels</p>
			<ul>
			  <li>Beginner (No prior experience required)</li>
			  <li>Intermediate</li>
			  <li>Advanced</li>
			</ul>

			<p>CNC and Laser classes</p>
			<p>Hand and Spray Finishing classes</p>
			<p>Metalworking/Blacksmithing (coming soon)</p>
			<p>To find out more or register, please call: </p>

		  </div>

		  <div id='about-middle'></div>

		  <div className='about-image'>
			<img src='https://via.placeholder.com/400' />
		  </div>
		</div>

	  </section>
	</>
  )
}

export default Services;
