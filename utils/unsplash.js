const fetch = require("node-fetch");

const accessKey = "6bAsvB7306PHJmUfoaCGOipSegB_5NKzCql_LISRJcc";

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
      `https://api.unsplash.com/photos/random/?client_id=${accessKey}&collections=${collectionId}&count=1`,
      {
        timeout: 10000,
      }
    );
    const data = await response.json();
    const imageUrl = `${data[0].urls.raw}&w=1280&h=720&fit=crop`; // Menambahkan parameter resolusi
    return imageUrl;
  } catch (err) {
    console.log("Error fetching image:", err.message);
  }
}

module.exports = { getImageFromUnsplash };
