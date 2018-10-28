const searchBtn = document.getElementById('search-btn');
const searchForm = document.getElementById('search-form');
const list = document.querySelector('.list');
const favoriteList = document.querySelector('.favourite-list');

let restrurants = [];
let favourites = [];

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
      <button class="add-favourite fas fa-plus fa-2x"><g/button>
     </div>
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
    console.log(restrurants);
    display(restrurants, list);
  })

  console.log('form submitted');
}

const addToFavourite = e => {
  e.preventDefault();
  if(e.target.classList.contains('add-favourite')) {
    const itemIndex = e.target.parentElement.id;
    favourites.push(restrurants[itemIndex]);
    display(favourites, favoriteList);
  }
}

searchForm.addEventListener("submit", searchRestrurants);
list.addEventListener('click', addToFavourite);