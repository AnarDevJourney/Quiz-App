// Function for fetching quiz categories
export async function fetchQuizCategories() {
  try {
    // Sending a GET request to the API endpoint for quiz categories
    const res = await fetch("https://opentdb.com/api_category.php");

    // Checking if the response status is not OK
    if (!res.ok) {
      // If response is not OK, parse the error response and throw an error with the message
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch quiz categories");
    }

    // Parsing the JSON response to get the data
    const data = await res.json();

    // Returning the array of quiz categories from the data
    return data.trivia_categories;
  } catch (error) {
    // Catching any errors that occur during the fetch or parsing process
    // Throwing a new error with the error message
    throw new Error(error.message || "Failed to fetch quiz categories");
  }
}
