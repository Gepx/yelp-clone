const mongoose = require("mongoose");
const Place = require("../models/place");
const { getImageFromUnsplash } = require("../utils/unsplash");
const { geometry } = require("../utils/hereMaps");

mongoose
  .connect("mongodb://127.0.0.1/bestpoints")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

async function seedPlaces() {
  const places = [
    {
      title: "Taman Mini Indonesia Indah",
      price: 20000,
      description:
        "Taman hiburan keluarga dengan berbagai replika bangunan dari seluruh Indonesia",
      location: "Taman Mini Indonesia Indah, Jakarta",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Pantai Kuta",
      price: 0,
      description:
        "Pantai yang terkenal di Bali dengan pemandangan sunset yang indah",
      location: "Pantai Kuta, Kuta, Badung Regency, Bali",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Borobudur",
      price: 0,
      description:
        "Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah",
      location: "Borobudur, Magelang, Central Java",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Kawah Putih",
      price: 0,
      description:
        "Kawah vulkanik dengan danau berwarna putih di Bandung, Jawa Barat",
      location: "Kawah Putih, Ciwidey, West Java",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Malioboro",
      price: 0,
      description:
        "Jalan utama di Yogyakarta dengan berbagai toko dan kuliner khas",
      location: "Jl. Malioboro, Yogyakarta City, Special Region of Yogyakarta",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Pantai Tanjung Aan",
      price: 10000,
      description:
        "Pantai dengan pasir berwarna putih dan air laut yang jernih di Lombok, Nusa Tenggara Barat",
      location: "Pantai Tanjung Aan, Lombok, West Nusa Tenggara",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Bukit Bintang",
      price: 0,
      description: "Kawasan perbelanjaan dan hiburan di Kuala Lumpur, Malaysia",
      location:
        "Bukit Bintang, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Candi Prambanan",
      price: 25000,
      description:
        "Candi Hindu terbesar di Indonesia yang terletak di Yogyakarta",
      location: "Candi Prambanan, Sleman, Special Region of Yogyakarta",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Danau Toba",
      price: 0,
      description:
        "Danau vulkanik terbesar di Indonesia yang terletak di Sumatera Utara",
      location: "Danau Toba, North Sumatra",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Kawah Ijen",
      price: 100000,
      description:
        "Kawah vulkanik dengan fenomena blue fire di Banyuwangi, Jawa Timur",
      location: "Kawah Ijen, Banyuwangi, East Java",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Pantai Sanur",
      price: 0,
      description:
        "Pantai di Bali yang cocok untuk berenang dan melihat matahari terbit",
      location: "Pantai Sanur, Denpasar, Bali",
      image: await getImageFromUnsplash(786923),
    },

    {
      title: "Candi Borobudur",
      price: 25000,
      description:
        "Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah",
      location: "Candi Borobudur, Borobudur, Magelang, Central Java",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Pulau Komodo",
      price: 5000000,
      description:
        "Pulau di Indonesia yang terkenal dengan komodo, hewan terbesar di dunia",
      location: "Pulau Komodo, East Nusa Tenggara",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Taman Nasional Gunung Rinjani",
      price: 150000,
      description:
        "Taman nasional yang terletak di Lombok dan memiliki gunung tertinggi kedua di Indonesia",
      location: "Taman Nasional Gunung Rinjani, Lombok, West Nusa Tenggara",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Bukit Tinggi",
      price: 0,
      description:
        "Kota kecil yang terletak di Sumatera Barat dengan arsitektur khas Eropa",
      location: "Bukit Tinggi, West Sumatra",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Pulau Weh",
      price: 0,
      description:
        "Pulau yang terletak di ujung barat Indonesia dengan keindahan bawah laut yang luar biasa",
      location: "Pulau Weh, Sabang, Aceh",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Pulau Lombok",
      price: 0,
      description:
        "Pulau di Indonesia yang terkenal dengan keindahan pantainya",
      location: "Pulau Lombok, West Nusa Tenggara",
      image: await getImageFromUnsplash(786923),
    },
    {
      title: "Tanjung Lesung",
      price: 100000,
      description:
        "Kawasan wisata pantai di Banten yang cocok untuk bersantai dan berenang",
      location: "Tanjung Lesung, Pandeglang, Banten",
      image: await getImageFromUnsplash(786923),
    },
  ];

  // const newPlace = await Promise.all(places.map(async (place) => {
  //     let geoData = await hereMaps.geometry(place.location);
  //     if (!geoData) {
  //         geoData = { type: 'Point', coordinates: [116.32883, -8.90952] }
  //     }
  //     return {
  //         ...place,
  //         author: '643d36579773b789e91ef660',
  //         images: {
  //             url: 'public\\images\\image-1681876521153-260851838.jpg',
  //             filename: 'image-1681876521153-260851838.jpg'
  //         },
  //         geometry: { ...geoData }
  //     }
  // }))

  try {
    const newPlace = await Promise.all(
      places.map(async (place) => {
        let geoData = await geometry(place.location);
        if (!geoData) {
          geoData = { type: "Point", coordinates: [116.32883, -8.90952] };
        }
        return {
          ...place,
          author: "66fa44b4f960621acb83414d",
          images: {
            url: "public\\images\\image-1727943982271-147103225.avif",
            filename: "image-1727943982271-147103225.avif",
          },
          geometry: geoData,
        };
      })
    );
    await Place.deleteMany({});
    await Place.insertMany(newPlace);
    console.log("Data berhasil disimpan");
  } catch (err) {
    console.log("Terjadi kesalahan saat menyimpan data:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedPlaces();
