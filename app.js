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
  console.log(query);

  // Make the API request
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`
  );
  const data = await response.json();

  // Check if the API returned any results
  if (data.meals === null) {
    // Display an error message if no results were found
    const errorMessage = document.getElementById('modal');
    errorMessage.style.display = 'block';
    console.log('Error');
  } else {
    // Display the results on the page
    const results = data.meals;
    results.forEach((meal) => {
      // Create a new list item for each meal
      const li = document.createElement('li');
      li.textContent = meal.strMeal;
      // Append the list item to the results list
      const resultsList = document.getElementById('results-list');
      resultsList.appendChild(li);
    });
  }
}

document.getElementById('close').onclick = function () {
  modal.style.display = 'none';
};
