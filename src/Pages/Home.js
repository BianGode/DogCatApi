import React from 'react';
import CatWrapper from '../Components/CatWrapper';
import DogWrapper from '../Components/DogWrapper';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const Home = () => {
  return (
    <div className='home'>
      <Header/>
      <div className='DogCatWrapper'>
        <DogWrapper/>
        <CatWrapper/>
      </div>
      {/* <Footer/> */}
    </div>
  ); 
}

export default Home;
