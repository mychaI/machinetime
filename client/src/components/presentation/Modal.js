import React from 'react';
import Popup from 'reactjs-popup';

const Modal = props => (
  <Popup open={props.open} closeOnDocumentClick onClose={props.closeModal}>
    <div className='modal'>
	  <a className='close' onClick={props.closeModal}>
	    &times;
	  </a>
	  <div className='modal-header'>
	    {props.title}
	  </div>
	  <div className='modal-content'>
		<span className='modal-machine'><b>Machine:</b> {props.title}</span>
		<span className='modal-start'><b>Start:</b> {props.start}</span>
		<span className='modal-end'><b>End:</b> {props.end}</span>
	  </div>
	</div>
  </Popup>
);

export default Modal;
