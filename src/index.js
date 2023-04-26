import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('input[id="search-box"]');
const countryList = document.querySelector('.country-list');
const oneCountry = document.querySelector('.country-info');





const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt){
    evt.preventDefault();
    let country = evt.target.value.trim();
    



   
    if(country === ''){
        countryList.innerHTML = '';
        oneCountry.innerHTML = '';
    } 
  

     else  {

        fetchCountries(country).then( (res) =>  createMarkup(res))
        .catch( (res) => 
        Notiflix.Notify.failure('Oops, there is no country with that name'));
    
        

     }


}




function createMarkup(arr){
    let length = arr.length;
   
   
 
    if(length > 10){
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    
    
    else if (length === 1) {
       oneCountry.innerHTML = '';
       countryList.innerHTML = '';
       const div = arr.map( ({capital, population, languages, name:{official}, flags:{svg} }) =>
        `<div class="one_country">
        <img width="200" src="${svg}" alt="${official}  ">
        <h2>${official}</h2>
        <p> 
            <h3>Столиця: ${capital}</h3>
            <h3>Мова:${Object.values(languages).join(', ') }</h3>
            <h3>Населення: ${population}</h3>
        </p>
        </div>`).join("");
        return  oneCountry.innerHTML += div;
        
    }

    else {
        countryList.innerHTML = '';
        oneCountry.innerHTML = '';
        const li = arr.map( ({ name:{official}, flags:{svg} }) =>
        `  <li class="li">
        <img width="100", height="50" src="${svg}" alt="${official}  ">
        <h2 class="country">${official}</h2>
        </li>`).join("");
     
        return countryList.innerHTML += li;
    }
   
};



