import axios from "axios";

export const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: { part: "snippet", maxResults: 50 },
  headers: {
    "X-RapidAPI-Key": "29ae91e43cmsha088b5dfcdda3bep1f1235jsnb95b834e1d80",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
