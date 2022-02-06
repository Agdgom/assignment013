interface MovieInfo {
  Runtime: string;
  Country: string;
}
interface Population {
  population: number;
}
export default async function calcMinutesPopulation(
  titleList: string[],
  key: string,
): Promise<void> {
  try {
    let countriesList: string[] = [];
    let moviesRuntime: number = 0;
    let allPopulation: number = 0;
    if (titleList.includes('')) {
      alert('All three fields must be filled in');
      return;
    }
    for (let i = 0; i < titleList.length; i++) {
      const title = titleList[i];
      const { Runtime, Country }: MovieInfo = await (
        await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${key}`)
      ).json();
      const movieCountyList = Country.split(',').map((el) => el.trim()); // removing unnecessary spaces
      countriesList.push(...movieCountyList);
      moviesRuntime += parseInt(Runtime);
    }
    countriesList = Array.from(new Set(countriesList)); // to get no duplicated countries
    for (let i = 0; i < countriesList.length; i++) {
      const country = countriesList[i];
      const counrtyInfo: Population = (
        await (await fetch(`https://restcountries.com/v3.1/name/${country}`)).json()
      )[0];

      allPopulation += counrtyInfo.population;
    }
    // DOM elements and added them to page
    const countriesPopulationEl = document.createElement('p');
    const moviesDurationEl = document.createElement('p');
    countriesPopulationEl.innerText = `Countries Population: ${allPopulation}`;
    moviesDurationEl.innerText = `Duration of all movies: ${moviesRuntime}`;
    document.querySelector('.assignment2-block')?.append(moviesDurationEl, countriesPopulationEl);
  } catch (er) {
    console.log(er);
    alert('Some error, please check if you have entered the names of the films correctly');
  }
}
