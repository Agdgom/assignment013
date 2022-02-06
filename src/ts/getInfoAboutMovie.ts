interface MovieInfo {
  Title: string;
  Year: number;
  Actors: string;
  Country: string;
}
interface CountryInformation {
  currencies: Object;
  flags: {
    png: string;
  };
}
export default async function getInfoAboutMovie(title: string, key: string): Promise<void> {
  try {
    const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${key}`);
    const movieInfo: MovieInfo = await response.json();
    //DOM ELements
    const sectionElement = document.createElement('section');
    const titleElement = document.createElement('h1');
    titleElement.innerText = 'Movie Title: ';
    const yearElement = document.createElement('p');
    yearElement.innerText = 'Year: ';
    const actorsElement = document.createElement('p');
    actorsElement.innerText = 'Actors: ';
    const currencyElement = document.createElement('p');
    currencyElement.innerText = 'Currency:    ';
    const flagElement = document.createElement('p');
    flagElement.innerText = 'Flag:     ';
    sectionElement.classList.add('about-movie');
    document.body.appendChild(sectionElement);
    // movie info variables
    const movieTitle: string = movieInfo.Title;
    const movieYear: number = new Date().getFullYear() - movieInfo.Year;
    const movieCountries: string[] = movieInfo.Country.split(',');
    const movieActors: string = movieInfo.Actors.split(',')
      .map((actor: string) => actor.trim().split(' ')[0])
      .join(', ');
    //get countries currency and flag
    movieCountries.forEach(async (country) => {
      const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      const data = await response.json();
      const countryInfo: CountryInformation = data[0];
      const currency: string = Object.keys(countryInfo.currencies).toString();
      const flag: string = countryInfo.flags.png;

      currencyElement.innerText += currency;
      flagElement.innerHTML += `<img src="${flag}" width="36" height="27" />`;
    });
    // Add on the page
    titleElement.innerText += movieTitle;
    yearElement.innerText += `${movieYear} years ago`;
    actorsElement.innerText += movieActors;
    sectionElement.append(titleElement, yearElement, actorsElement, currencyElement, flagElement);
  } catch (error) {
    return;
  }
}
