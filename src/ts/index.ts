import getInfoAboutMovie from './getInfoAboutMovie';
import calcMinutesPopulation from './calcMinutesPopulation';
const OMDB_API_KEY: string = '40324148';
const firstAssignment1Btn: any = document.querySelector('.assignment1-send-btn'); // #1 assignments button
const secondAssignment1Btn: any = document.querySelector('.assignment2-send-btn'); // #2 assignments button

firstAssignment1Btn.addEventListener('click', () => {
  const inputValue: any = document.querySelector('#movie-input');
  inputValue.value === ''
    ? alert('Enter a movie')
    : getInfoAboutMovie(inputValue.value, OMDB_API_KEY);
});
secondAssignment1Btn.addEventListener('click', () => {
  console.log('Clicked');
  const inputs: any = document.querySelectorAll('.movie-input');
  calcMinutesPopulation([inputs[0].value, inputs[1].value, inputs[2].value], OMDB_API_KEY);
});
