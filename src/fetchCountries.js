const URL = 'https://restcountries.com/v3.1/';
const ENDPOINT = 'name/';
const PARAMETRES = 'fields=languages,capital,population,name,flags'
  



  function fetchCountries(name){
    const allURL = `${URL}${ENDPOINT}${name}?${PARAMETRES}`
    
    return fetch(allURL).then( response => {
        if (!response.ok){
            throw new Error ('Error!!!');
        }
        return response.json()
    })
}

export { fetchCountries };

