const searchBtn = document.getElementById('search-btn');
const searchForm = document.getElementById('search-form');
const list = document.querySelector('.list');

let restrurants = [];


const display = (array, parent) => {
  parent.innerHTML = '';

  restrurantCardStr = `
    
  `;

  array.map(item => {
    return parent.innerHTML += restrurantCardStr;
  }).join('');

  array.length === 0 ? "" : array.map(item => {
    parent.innerHTML += 
    `
    <div class="restrurantCard">
      <h1>Name - <span>${item.restaurant.name}</span></h1>
      <a>Url <span>${item.restaurant.url}</span></a>
      <h2>Address <span>${item.restaurant.location.address}</span></h2>
      <h2>Votes <span>${item.restaurant.user_rating.aggregate_rating}</span></h2>
      <h2>Rating <span>${item.restaurant.user_rating.votes}</span></h2>
      <h2>Average Cost of Two <span>${item.restaurant.average_cost_for_two}</span></h2>
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

  console.log('form submitted')
}

searchForm.addEventListener("submit", searchRestrurants);