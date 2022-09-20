const URL = 'https://restcountries.com/v3.1/name/';
const countryFilter = '?field=name,capital,population,flags,languages';

export default function fetchCountries(name) {
  return fetch(`${URL}${name}${countryFilter}`).then(r => {
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json();
  });
}