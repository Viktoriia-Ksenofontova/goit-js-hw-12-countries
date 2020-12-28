import './styles.css';
import toastr from 'toastr';
import options from './js/toastr.options';
import debounce from 'lodash.debounce';


import fetchCountries from './js/fetchCountries';
import itemsTemplate from './templates/items.hbs';
import 'toastr/build/toastr.min.css';

toastr.options = options;

const refs = {
  countriesInput: document.querySelector('#countries-input'),
  countriesOutput: document.querySelector('#countries-output')
}

refs.countriesInput.addEventListener('input', debounce(handleTextareaInput, 500));

function handleTextareaInput(e) {
  const searchText = e.target.value;
  
  fetchCountries(searchText).then(result => {
    if (result.length > 10) {
      toastr["warning"]('Too many matches found. Please enter a more specific query!');
      return;
    }
    else if (result.length === 1) {
      const markup = itemsTemplate(result);
      refs.countriesOutput.innerHTML=`${markup}`;
      return;
    }
    const list = result.map(el => `<li> ${el.name}</li>`).join('');
    refs.countriesOutput.innerHTML=`${list}`;

  })
    .catch(result => {
      toastr["error"]('Country with this name not found');
      refs.countriesOutput.innerHTML = ``;
    });
  }