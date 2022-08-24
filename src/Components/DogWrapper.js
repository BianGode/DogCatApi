import React, { useState, useEffect, createElement } from 'react'


const DogWrapper = () => {

  const [error, setError] = useState(null)

  let DogList = []
  let BreedList = []
  let SearchResult = []

  function RenderDogs(list) {
    list.map((el) => {

      // Cats.push(<Cat src={el.url} />)
      const dogWrap = document.createElement('div')
      dogWrap.classList.add('DogWrap', 'card')

      const DogImg = document.createElement('img')
      DogImg.classList.add('DogImage')
      DogImg.src = el
      DogImg.onclick = () => {
        DogImg.classList.toggle('enlarge')
        // DogImg.classList.toggle('DogImage')
      }
      // console.log(DogImg)
      dogWrap.append(DogImg)
      document.querySelector('.DogDogWrapper').append(dogWrap)
      // document.querySelector('.CatCatWrapper').removeChild(document.querySelector('.CatCatWrapper').firstChild)
    })

  }

  function SetBreed() {
    document.querySelector('.DogDogWrapper').innerHTML = ''
    SearchResult.map((el) => {
      const dogWrap = document.createElement('div')
      dogWrap.classList.add('DogWrap', 'card')
      const DogImg = document.createElement('img')
      DogImg.classList.add('DogImage')
      DogImg.src = el
      DogImg.onclick = () => {
        DogImg.classList.toggle('enlarge')
        DogImg.classList.toggle('DogImage')
        console.log('1337')
      }
      // console.log(DogImg)
      dogWrap.append(DogImg)
      document.querySelector('.DogDogWrapper').append(dogWrap)
    })
  }

  async function SelectBreed() {
    let bred = document.getElementById('DogBreeds').value
    await fetch('https://dog.ceo/api/breed/' + bred + '/images/random/6')
      .then(BreedRes => BreedRes.json())
      .then(
        (result) => {
          SearchResult = result.message
          SetBreed()

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
            document.getElementsByClassName('DogWrap')[name].append(funName)
          }
        }
      )
  }

  function LoadBreeds() {
    for (const breed in BreedList) {
      let breedEl = document.createElement("option")
      breedEl.value = breed
      breedEl.innerText = breed

      document.getElementById('DogBreeds').append(breedEl)
    }
  }


  function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random/6")
      .then(DogRes => DogRes.json())
      .then(
        (DogResult) => {
          DogList = DogResult.message
          RenderDogs(DogList)
          // setIsLoaded(true)
        },

        (error) => {
          // setIsLoaded(true)
          setError(error)
        }
      );




    fetch("https://dog.ceo/api/breeds/list/all")
      .then(DogBreedRes => DogBreedRes.json())
      .then(
        (DogBreedResult) => {
          BreedList = DogBreedResult.message
          LoadBreeds(BreedList)
        },
        (error) => {
          // setIsLoaded(true)
          console.log(error)
        }
      )

    // VERDER GAAN HIER MEE!
    fetch('https://api.parser.name/?api_key=83b5cf6421f0c3c6b417b3ad582e2aae&endpoint=generate&results=6')
      .then(res => res.json())
      .then(
        (names) => {
          for (const name in names.data) {
            // console.log(names.data[name].name);
            let funName = document.createElement('h3')
            funName.classList.add('funName')
            funName.innerText = names.data[name].name.firstname.name + " " + names.data[name].name.lastname.name
            document.getElementsByClassName('DogWrap')[name].append(funName)
            // console.log(document.getElementsByClassName('DogWrap'))
          }
        }
      )
  }, [])
  function GetDogs() {
    fetch("https://dog.ceo/api/breeds/image/random/6")
      .then(DogRes => DogRes.json())
      .then(
        (DogResult) => {
          DogList = DogResult.message
          RenderDogs(DogList)
          // setIsLoaded(true)
        },

        (error) => {
          // setIsLoaded(true)
          setError(error)
        }
      )
  }
  return (
    <div className='DogWrapper'>
      <h2 className='hone' onClick={GetDogs}>Random Dog!</h2>
      <select name='DogBreeds' id='DogBreeds' placeholder='SELECT DOG' onChange={SelectBreed}>

      </select>
      <div className='DogDogWrapper'>
        {/* {DogList ? DogList.map((el) => <Cat />) : null} */}
      </div>
    </div>
  );
}

export default DogWrapper;
