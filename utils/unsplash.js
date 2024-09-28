const fetch = require("node-fetch");

const accessKey = "LJ9kZ-LO-JI3VIzHm9g_sgNq3cED6j7q4NwqKxNJwAE";

async function getImageFromUnsplash(collectionId) {
  // try {
  //   const response = await fetch(
  //     `https://api.unsplash.com/photos/random/?client_id=${accessKey}&collections=${collectionId}&count=1`
  //   );
  //   const data = await response.json();
  //   return data[0].urls.regular; // Mengembalikan URL gambar
  // } catch (err) {
  //   console.log("Error fetching image from Unsplash:", err);
  // }
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random/?client_id=${accessKey}&collections=${collectionId}&count=1`
    );
    const data = await response.json();
    const imageUrl = `${data[0].urls.raw}&w=1280&h=720&fit=crop`; // Menambahkan parameter resolusi
    return imageUrl;
  } catch (err) {
    console.log("Error fetching image:", err);
  }
}

module.exports = { getImageFromUnsplash };
