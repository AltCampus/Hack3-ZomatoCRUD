const searchBtn = document.getElementById('search-btn');

const searchRestrurants = e => {
  const searchValue = document.getElementById(".search-value");

  const url = `https://developers.zomato.com/api/v2.1/search?q=${searchValue.value}`;

  console.log(url);
}

searchBtn.addEventListener("click", searchRestrurants);