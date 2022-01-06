const API_KEY = "f60dc1588d1b92e483f83fa137b9f5ab";

export async function getPopularPeople() {
  try {
    const myHeaders = new Headers({ "user-key": API_KEY });
    const url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=fr-FR&page=1`;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getPopularPeople ${error.message}`);
    throw error;
  }
}

export async function getPopularPeopleDetails(peopletID) {
  try {
    const myHeaders = new Headers({ "user-key": API_KEY });
    const url = `https://api.themoviedb.org/3/person/${peopletID}?api_key=${API_KEY}&language=fr-FR`;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getRestaurantDetails ${error.message}`);
    throw error;
  }
}
