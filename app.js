// For getting a random meal when page reloads

fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then((response) => response.json())
  .then((data) => {
    // Get the name and image URL of the meal
    const name = data['meals'][0]['strMeal'];
    const imageUrl = data['meals'][0]['strMealThumb'];

    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (data['meals'][0][`strIngredient${i}`]) {
        ingredients.push(data['meals'][0][`strIngredient${i}`]);
      }
    }
    console.log(ingredients);

    // Insert the data into the relevant elements on the page
    document.getElementById('meal-name').innerHTML = name;
    document.getElementById('meal-image').src = imageUrl;
  });

// For displaying the ingredients

// Search Functionality

const button = document.getElementById('search');
button.addEventListener('click', searchMeals);

// Define the searchMeals function
async function searchMeals(event) {
  // Prevent the form from being submitted and reloading the page
  event.preventDefault();

  // Get the search query from the form
  const query = document.getElementById('input').value;

  // Make the API request
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`
  );
  const data = await response.json();

  // Check if the API returned any results

  if (data.meals === null) {
    // Display an error message if no results were found

    const errorMessage = document.getElementById('error');
    errorMessage.innerHTML = 'No Search Result Found  :(';
  } else {
    // For clearing the previously fetched results

    const errorMessage = document.getElementById('error');
    errorMessage.innerHTML = '';
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    // Display the results on the page

    const results = data.meals;
    var name = '';
    results.forEach((meal) => {
      if (meal.strMeal.length >= 35) {
        name = 'Click to Open';
      } else {
        name = meal.strMeal;
      }
      const div = document.createElement('div');
      div.setAttribute('class', 'searchResult');
      div.innerHTML +=
        `<img src="` + meal.strMealThumb + `"><h5>` + name + '</h5>';
      searchResults.appendChild(div);
    });
    window.scrollTo({
      top: 700,
      behavior: 'smooth',
    });
  }
}
