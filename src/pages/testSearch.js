import React, { useState, useEffect } from 'react';

import {ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Search = () => {

  
const notify = () => {
  toast.error('Please fill in all the fields.', {
    position: 'top-center',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: 0,
    theme: 'dark',
});
}
  return (
    <div>
    <button onClick={notify}>BUTTON</button>
    <ToastContainer/>
    </div>
  );
};

export default Search;