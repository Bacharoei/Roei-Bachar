import React from 'react';
import spinner from '../../img/spinner.gif';


const Spinner = () => {
    return (
 

<div className="page-wrap d-flex flex-row align-items-center container ">
<div className="container mt-5">
  <div className="row justify-content-center mt-5">
    <div className="col-md-12 text-center ">
    <img 
            src={spinner} 
            style={{width: '30rem', margin: 'auto', display: 'block' }} 
            alt='loading' />
      <h1 >Loading...</h1>
 

    </div>
  </div>
</div>
</div>
    )
}

export default Spinner
