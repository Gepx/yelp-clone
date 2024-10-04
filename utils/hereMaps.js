const ExpressError = require("./ErrorHandler");
const baseUrl = "https://geocode.search.hereapi.com/v1";
const apiKey = "aptfx9xzcpTOepAf02R70CUdsddyJB-1Nlmu3le06IM";

const geocode = async (address) => {
  const url = `${baseUrl}/geocode?q=${address}&limit=1&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    // const lat = data.item[0].position.lat
    // const lng = data.item[0].position.lng
    // return { lat, lng }
    return data.items[0];
  } catch (error) {
    throw new ExpressError(error.message, 500);
  }
};

const geometry = async (address) => {
  try {
    const { position } = await geocode(address);
    return {
      type: "Point",
      coordinates: [position.lng, position.lat],
    };
  } catch (error) {
    throw new ExpressError(error.message, 500);
  }
};

module.exports = {
  geocode,
  geometry,
};
