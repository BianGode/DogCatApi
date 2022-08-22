import React from 'react'

export default function Cat(props) {

  document.querySelector('.CatImage').style.backgroundImage = "url(" + props.src + ")"
  return (
    <div className='CatImage'></div>
  )
}
