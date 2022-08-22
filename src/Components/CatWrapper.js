import React, { useState, useEffect } from 'react'
import Cat from './Cat'

export default function CatWrapper() {

  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  let CatList = []
  const Cats = []
  let CatBreedList = []
  function RenderCats(list) {
    list.map((el) => {
      // console.log(el)
      const CatWrap = document.createElement('div')
      CatWrap.classList.add('CatWrap', 'card')
      const CatImg = document.createElement('img')
      CatImg.classList.add('CatImage')
      CatImg.src = el.url
      // console.log(CatImg)
      CatWrap.append(CatImg)
      document.querySelector('.CatCatWrapper').append(CatWrap)
      // document.querySelector('.CatCatWrapper').removeChild(document.querySelector('.CatCatWrapper').firstChild)
    })

  }

  function setCatBreed() {
    let bred = document.getElementById('CatBreeds').value
    fetch('https://api.thecatapi.com/v1/images/search?breed_ids=' + bred + '&limit=6')
      .then(selBreed => selBreed.json())
      .then(
        (results) => {
          document.querySelector('.CatCatWrapper').innerHTML = ''
          RenderCats(results)

          return fetch('https://api.parser.name/?api_key=83b5cf6421f0c3c6b417b3ad582e2aae&endpoint=generate&results=6')
        })
      .then(res => res.json())
      .then(
        (names) => {
          for (const name in names.data) {
            let funName = document.createElement('h3')
            funName.classList.add('funName')
            funName.innerText = names.data[name].name.firstname.name + " " + names.data[name].name.lastname.name
            // console.log(document.getElementsByClassName('CatWrap')[name])
            document.getElementsByClassName('CatWrap')[name].append(funName)
          }
        }
      )

  }

  function LoadBreeds(catbreeds) {
    catbreeds.map((breed) => {
      let breedEl = document.createElement("option")
      breedEl.value = breed.id
      breedEl.innerText = breed.name
      document.getElementById('CatBreeds').append(breedEl)
    })
  }

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=6")
      .then(catRes => catRes.json())
      .then(
        (Catresult) => {
          // console.log(Catresult)
          console.log('test')
          CatList = Catresult
          RenderCats(CatList)
          return fetch('https://api.parser.name/?api_key=83b5cf6421f0c3c6b417b3ad582e2aae&endpoint=generate&results=6')

          // setIsLoaded(true)
        })
      .then(res => res.json())
      .then(
        (names) => {
          for (const name in names.data) {
            let funName = document.createElement('h3')
            funName.classList.add('funName')
            funName.innerText = names.data[name].name.firstname.name + " " + names.data[name].name.lastname.name
            // console.log(document.getElementsByClassName('CatWrap')[name])
            document.getElementsByClassName('CatWrap')[name].append(funName)
          }
        }
      )

    fetch('https://api.thecatapi.com/v1/breeds')
      .then(CatBreedRes => CatBreedRes.json())
      .then(
        (CatBreedResult) => {
          CatBreedList = CatBreedResult
          LoadBreeds(CatBreedList)
        })

  }, [])

  function GetCats() {
    fetch("https://api.thecatapi.com/v1/images/search?limit=5")
      .then(catRes => catRes.json())
      .then(
        (Catresult) => {
          CatList = Catresult
          RenderCats(CatList)
          // setIsLoaded(true)
        },
        (error) => {
          // setIsLoaded(true)
          setError(error)
        }
      )
  }

  return (
    <div className='CatWrapper'>
      <h2 className='hone' onClick={GetCats}>Random Cat!</h2>
      <select name='CatBreeds' id='CatBreeds' placeholder='SELECT Cat' onChange={setCatBreed}>

      </select>
      <div className='CatCatWrapper' >
        {/* {CatList ? CatList.map((el) => <Cat />) : null} */}
      </div>
    </div>
  )
}
