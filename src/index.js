import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountry.addEventListener('input',
    debounce((e) => {
        let nameOfCountry = e.target.value.trim();
        if (nameOfCountry.length === 0) {
            resetMarkup(countryInfo, countryList)
            return
        };

        fetchCountries(nameOfCountry).then(data => {
            if (data.length === 1) {
                resetMarkup(countryInfo, countryList)
                markupInfo(data);
            } else if (data.length > 1 && data.length <= 10) {
                resetMarkup(countryInfo, countryList)
                markupList(data);
            }
            else {
                resetMarkup(countryInfo, countryList);
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
        })
            .catch(error => {
                Notiflix.Notify.failure('Oops, there is no country with that name');
                resetMarkup(countryInfo, countryList)
            })

    }, DEBOUNCE_DELAY));


function resetMarkup(info, list) {
    info.innerHTML = '';
    list.innerHTML = '';
};


function markupList(countries) {
   const contriesArray = countries.map(country => {
       return  `<li class="country-item">
            
            <img src=${country.flags.svg} width="80">
            <span class="country-name">${country.name.official}</span>
        </li>`
    });
    contriesArray.forEach(markupCountry => {
        countryList.insertAdjacentHTML('beforeend', markupCountry)
    });

    
};

function markupInfo(countries) {
    const country = countries[0];
    const info = `<div class="country-info__inner">
            <img src=${country.flags.svg} width="50">
            <span class="country-name__big">${country.name.official}</span>
            </div>
            <p class="country-text"><span class="country-info--accent">Capital:</span> ${country.capital}<p>
            <p class="country-text"><span class="country-info--accent">Population:</span> ${country.population}</p>
            <p class=country-text"><span class="country-info--accent">Languages:</span> ${Object.values(country.languages).join(', ')}</p>`
    
        countryInfo.insertAdjacentHTML('beforeend', info)
};