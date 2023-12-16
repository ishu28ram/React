// export let REACT_API_KEY = process.env.API_KEY;
// export let REACT_API_ID = process.env.API_ID;
// export let API_URL = `https://api.edamam.com/search?q=chicken&app_id=${REACT_API_ID}&app_key=${REACT_API_KEY}`;

export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "29ae91e43cmsha088b5dfcdda3bep1f1235jsnb95b834e1d80",
    "X-RapidAPI-Host": "themealdb.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log("data" + data);
};
