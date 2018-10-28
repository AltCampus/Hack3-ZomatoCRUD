const searchBtn = document.getElementById('search-btn');
const searchForm = document.getElementById('search-form');
const list = document.querySelector('.list');
const favoriteList = document.querySelector('.favourite-list');

let restrurants = [];
let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

const display = (array, parent) => {
  parent.innerHTML = '';

  array.length === 0 ? "" : array.map((item,i) => {
    parent.innerHTML += 
    `
    <div class="restrurantCard" id=${i}>
      <div class="row1">
          <img src="https://source.unsplash.com/100x100/?restaurants" alt="restaurants">
          <h1><a href="${item.restaurant.url}"><span>${item.restaurant.name}</span></a></h1>
          <div class="ratings">
          <div class="rate"><span>${item.restaurant.user_rating.votes}</span></div>
           <span class="vote">${item.restaurant.user_rating.aggregate_rating} votes</span>
          </div>
      </div>
      <div class="row2">
       
          <h3>Address :</h3>
          <div><span>${item.restaurant.location.address}</span></div>
           <h3>Cost for Two :</h3> 
          <div><span>${item.restaurant.average_cost_for_two}</span></div>
        
      </div>
      <div class="row3">
        <button class="add-favourite fas fa-plus fa-2x" data-id=${i}></button>
       </div>
    </div>
    `
  }).join('');
}

const displayFavourite = (array, parent) => {
  parent.innerHTML = '';

  array.length === 0 ? "" : array.map((item,i) => {
    parent.innerHTML += 
    `
    <div class="favoruite-restrurantCard">
    <h1 class="fav-head" Name - <span>${item.restaurant.name}</span></h1>
    <a class="link" href="${item.restaurant.url}"> website </a>
    <h2 class="fav-head2" Address <span>${item.restaurant.location.city}</span></h2>
    <h2 class="fav-vote" Votes <span>${item.restaurant.user_rating.aggregate_rating}</span></h2>
    <button class="delete-favourite"  data-id=${i}>Delete Favourite<g/button>
  </div>
    `
  }).join('');
}

const searchRestrurants = e => {
  e.preventDefault();
  const searchValue = document.getElementById("search-value");

  const url = `https://developers.zomato.com/api/v2.1/search?q=${searchValue.value.toLowerCase()}&count=15`;

  fetch(url, {
	method : 'GET',
	headers : {
		"user-key" : "af90611232a48e9a8cc0279f40717419"
	}
  }).then(res => {console.log(res.status);return res.json()}).then(data => {
    restrurants = data.restaurants;
    console.log(restrurants[0]);
    display(restrurants, list);
  })

  console.log('form submitted');
}

const addToFavourite = e => {
  e.preventDefault();
  if(e.target.classList.contains('add-favourite')) {
    const itemIndex = e.target.dataset.id;
    console.log(itemIndex);
    favourites.push(restrurants[itemIndex]);
    localStorage.setItem("favourites", JSON.stringify(favourites));

    let favouritesArray = JSON.parse(localStorage.getItem('favourites'));
    displayFavourite(favouritesArray, favoriteList);
  }
}

const deleteFavourite = e => {
  e.preventDefault();
  if(e.target.classList.contains('delete-favourite')) {
    const itemIndex = e.target.dataset.id;
    favourites.splice(itemIndex, 1);
    localStorage.setItem("favourites", JSON.stringify(favourites));

    let favouritesArray = JSON.parse(localStorage.getItem('favourites'));
    displayFavourite(favouritesArray, favoriteList);
  }
}
 
searchForm.addEventListener("submit", searchRestrurants);
list.addEventListener('click', addToFavourite);
favoriteList.addEventListener('click', deleteFavourite);
// favoriteList.addEventListener('dragstart', handleDrag)
displayFavourite(favourites, favoriteList);