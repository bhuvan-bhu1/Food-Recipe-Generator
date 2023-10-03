import React,{ useEffect, useState} from 'react';
import icon from './images/food.svg';
import search from './images/search.svg';
import filtermain from './images/filter.png';
import save from './images/star.png';
import close from './images/cross.png';
import home from './images/home.png'
import favourite from './images/favourite.png'
import github from './images/github.png'
import linkedin from './images/linkedin.png'


import { Getmodal } from './modal';


// https://api.edamam.com/search?q=groundnuts&app_id=f7eb1d4e&app_key=a26358e2b8c03452e3cdec5458c95cf4 

var dish_global = ''
const Render = () =>{

  var filter = {};
  const [data,setData] = useState([]);
  const [value,setValue] = useState('Chicken');
  const [fill,setFilter] = useState([]);
  const [extra,setExtra] = useState([]);


  const getdata = async(dish_call = 'Chicken') =>{
    const key = 'a26358e2b8c03452e3cdec5458c95cf4';
    const id = 'f7eb1d4e';
    const response = await  fetch(`https://api.edamam.com/search?q=${dish_call}&app_id=${id}&app_key=${key}`)
    const result = await response.json()
    console.log('Hello',result.hits)
    filter['All']= result.hits 
    result['hits'].forEach((ele) => {
      if(filter[ele.recipe.dishType[0]]){
        filter[ele.recipe.dishType[0]].push(ele)
      }
      else{
        filter[ele.recipe.dishType[0]] = []
        filter[ele.recipe.dishType[0]].push(ele);
      }
      setFilter(Object.keys(filter))
    })
    dish_global = dish_call
    document.getElementById('page-name').innerText = dish_call.charAt(0).toUpperCase() + dish_call.slice(1) + ' Items'
    if (result.hits.length > 9){
      result.hits.splice(9,1)
    }
    setData(result.hits)
    setExtra(result.hits)
  }


  const handleClick = (event) => {
    console.log(event.currentTarget.id)
    if (localStorage.getItem('saved_data') == null){
      let saved_list = []
      saved_list.unshift(data[event.currentTarget.id])
      localStorage.setItem('saved_data',JSON.stringify(saved_list))
      alert('Saved Item');
      
 
    }
    else{
      let saved_data = JSON.parse(localStorage.getItem('saved_data'))
      saved_data.unshift(data[event.currentTarget.id])
      console.log(saved_data)
      localStorage.setItem('saved_data',JSON.stringify(saved_data))
      alert('Saved Item')
    }
  };

  const deletesave = (event) => {
    console.log(event.currentTarget.id)
    let saved_data = JSON.parse(localStorage.getItem('saved_data'))
    saved_data.splice(event.currentTarget.id, 1);
    setData(saved_data)
    localStorage.setItem('saved_data',JSON.stringify(saved_data))
    alert('Item Deleted')
  }

  const saved_items = () => {
    document.getElementById('page-name').innerText = 'Saved Items'
    let saved_data = JSON.parse(localStorage.getItem('saved_data'))
    console.log(saved_data)
    document.getElementsByClassName('save').src = icon
    setData(saved_data)
    let elements = document.getElementsByClassName("replace");
    for(var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = ''
        let button = document.createElement('button')
        let image_append = document.createElement('img')
        let span = document.createElement('span')
        span.innerText = 'Delete'
        span.className = 'tool'
        image_append.src = close
        image_append.className = 'save'
        button.className = 'save-option'
        button.id = String(i)
        button.onclick = deletesave;
        button.appendChild(image_append)
        button.appendChild(span)
        elements[i].appendChild(button)
    }
  };


  const make_filter = () =>{
    filter['All'] = extra
    extra.forEach((ele) => {
      if(filter[ele.recipe.dishType[0]]){
        filter[ele.recipe.dishType[0]].push(ele)
      }
      else{
        filter[ele.recipe.dishType[0]] = []
        filter[ele.recipe.dishType[0]].push(ele);
      }
      console.log(filter)
    })
  }

  const homeupdate = () =>{
    document.getElementById('page-name').innerText = dish_global.charAt(0).toUpperCase() + dish_global.slice(1) + ' Items'
    setData(extra)
    let elements = document.getElementsByClassName("replace");

    for(var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = ''
        let button = document.createElement('button')
        let image_append = document.createElement('img')
        let span = document.createElement('span')
        image_append.src = favourite
        span.innerText = 'Save'
        span.className = 'tool'
        image_append.className = 'save'
        button.className = 'save-option'
        button.onclick = handleClick;
        button.appendChild(image_append)
        button.appendChild(span)
        elements[i].appendChild(button)
    }
  }

  const loop = (event) =>{
    let dropvalue = event.target.value
    make_filter()
    console.log(dropvalue)

    setData(filter[dropvalue]) 
  }
    

  const handleOnChange = (event) => {
    console.log("hello", event.target.value);
    setValue(event.target.value);
  };


  useEffect(() => {
        const timeoutId = setTimeout(() => getdata(value), 500);
        return () => clearTimeout(timeoutId);
      }, [value]);


  return(
    <>
    <div className='head-main'>
      <div className='head-main-one'>
        <img src={icon} alt="Food" className='head-icon-name'/> 
        <h2 id="head-name">Food Recipie Generator</h2>
      </div>
      <div className='head-right-icons'>
      <button className='head-save-button' onClick={homeupdate}>
          <img src={home} alt='save-option-head' className='head-save'/>
          <span className='tool'>Home</span>
      </button>
        <button className='head-save-button' onClick={saved_items}>
            <img src={save} alt='save-option-head' className='head-save'/>
            <span className='tool'>Saved</span>
        </button>

      </div>
    </div>
    <div className='head-two'>
      <div className='head-left'>
        <img src={search} alt='searh-icon' className='head-img'/>
        <input type="text" className="head-search" placeholder="Search Recipie" id='search-box' onChange={handleOnChange}/>
      </div>
      <div className='filter'>
        
        <img src={filtermain} alt='filter-icon' className='filter-icon'/>
        <select id='select-filter' onChange={loop} >
        {
          fill.map((one) =>{
            return(
            <option value={one}>{one}</option>
            )
          })
        }
        </select>
      </div>
      </div>
    <div id='page-name'></div>
    <div className='main'>
    {
      data.map((element,index) => {
        return(
          <>
            {/* <Cardcomponent index = {index} element = {element}/> */}
            <div className='hover'>
            <div className='comp-body' key={index}>
              <img src={element.recipe.image} alt='food' className='comp-img'/> 
              <div className='comp-down'>
                <p className='comp-name'>{element.recipe.label}</p>
                <Getmodal label={element.recipe.label} ingrediants = {element.recipe.ingredients} link= {element.recipe.url} totalWeight={element.recipe.totalWeight}/>
                <div className='comp-footer'>
                  <div className='cusine'>Cusine Type : <span className='cusine-name'>{element.recipe.cuisineType[0].charAt(0).toUpperCase() + element.recipe.cuisineType[0].slice(1)}</span></div>
                  <div className='replace'>
                    <button className='save-option' id={index} onClick={handleClick}>
                      <img src= {favourite} alt='Save' className='save'/> 
                      <span className='tool'>Save</span>
                    </button>    
                  </div>
                </div>
              </div>
            </div>  
          </div>
          </>
        )
      })
    }
    </div>
    <div className='footer'>
      <div className='footone'>
        Created By <span className='footspan'>Bhuvan</span>
      </div>
      <div className='foottwo'>
        <a href='https://www.linkedin.com/in/bhuvan-bhu1/' target='_blank'>
          <button className='foot-button'>
            <img src= {linkedin} alt='Linked IN' className='footicon'/> 
          </button>
        </a>
        <a href='https://github.com/bhuvan-bhu1' target='_blank'>
          <button className='foot-button'>
            <img src= {github} alt='GitHub' className='footicon'/>
          </button>
        </a>
      </div>
      
    </div>
    </>
  )

}

function App() {

  return (
    <>
      <Render />
    </>
  );
};
export  {App};