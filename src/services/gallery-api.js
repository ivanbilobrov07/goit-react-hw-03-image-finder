import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37108036-8a6d23bc06a2bda3e904321d5';

const chechResponse = (response, imagesPerPage) => {
  const hitsAmount = response.data.hits.length;
  const numberOfPage = response.config.params.page;

  if (hitsAmount === 0) {
    if (numberOfPage === 1) {
      throw new Error("Couldn't find images on this topic");
    }

    throw new Error('No more images');
  }

  return true;
};

export const fetchImages = async ({ page = 1, topic, imagesPerPage = 12 }) => {
  const config = {
    params: {
      q: topic,
      image_type: 'photo',
      page,
      orientation: 'horizontal',
      per_page: imagesPerPage,
      key: API_KEY,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.get(`${BASE_URL}`, config).catch(() => {
    throw new Error('No more images');
  });

  if (chechResponse(response, imagesPerPage)) {
    return response;
  }
};
