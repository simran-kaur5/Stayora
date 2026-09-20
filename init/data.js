const sampleListings = [
  {
    title: "Beachfront Bungalow in Bali",
    description:
      "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    category: "Pools",
    geometry: {
      type: "Point",
      coordinates: [115.1889, -8.4095],
    },
  },

  {
    title: "Mountain Cabin in Manali",
    description:
      "A cozy wooden cabin surrounded by snow-covered mountains and peaceful pine forests.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Manali",
    country: "India",
    category: "Mountains",
    geometry: {
      type: "Point",
      coordinates: [77.1892, 32.2396],
    },
  },

  {
    title: "Luxury Apartment in Dubai",
    description:
      "Stay in a modern luxury apartment with stunning city views and premium amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=60",
    },
    price: 4200,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Iconic",
    geometry: {
      type: "Point",
      coordinates: [55.2708, 25.2048],
    },
  },

  {
    title: "Glass Dome Under the Stars",
    description:
      "Experience a unique stay in a transparent glass dome surrounded by nature and open skies.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520984032042-162d526883e0?auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Rishikesh",
    country: "India",
    category: "Domes",
    geometry: {
      type: "Point",
      coordinates: [78.2676, 30.0869],
    },
  },

  {
    title: "Royal Castle Stay in Scotland",
    description:
      "Live like royalty in a historic castle surrounded by beautiful Scottish countryside.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=60",
    },
    price: 8500,
    location: "Edinburgh",
    country: "United Kingdom",
    category: "Castles",
    geometry: {
      type: "Point",
      coordinates: [-3.1883, 55.9533],
    },
  },

  {
    title: "Cozy Room in Paris",
    description:
      "A charming private room located close to the heart of Paris and its famous attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Paris",
    country: "France",
    category: "Rooms",
    geometry: {
      type: "Point",
      coordinates: [2.3522, 48.8566],
    },
  },

  {
    title: "Arctic Glass Igloo",
    description:
      "Watch the northern lights from a warm and comfortable glass igloo in the Arctic wilderness.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=800&q=60",
    },
    price: 7200,
    location: "Rovaniemi",
    country: "Finland",
    category: "Arctic",
    geometry: {
      type: "Point",
      coordinates: [25.7294, 66.5039],
    },
  },

  {
    title: "Luxury Houseboat in Kashmir",
    description:
      "Enjoy a peaceful stay on a traditional houseboat surrounded by the beautiful Dal Lake.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Srinagar",
    country: "India",
    category: "Boats",
    geometry: {
      type: "Point",
      coordinates: [74.7973, 34.0837],
    },
  },

  {
    title: "Farmhouse Retreat in Punjab",
    description:
      "Enjoy a relaxing countryside stay with open fields, fresh air, and traditional Punjabi hospitality.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Ludhiana",
    country: "India",
    category: "Farms",
    geometry: {
      type: "Point",
      coordinates: [75.8573, 30.9010],
    },
  },

  {
    title: "Desert Camping Experience",
    description:
      "Spend a night under the stars in a comfortable desert camp surrounded by golden sand dunes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Jaisalmer",
    country: "India",
    category: "Camping",
    geometry: {
      type: "Point",
      coordinates: [70.9083, 26.9157],
    },
  },

  {
    title: "Infinity Pool Villa in Phuket",
    description:
      "A stunning private villa featuring an infinity pool overlooking the tropical coastline.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=60",
    },
    price: 5600,
    location: "Phuket",
    country: "Thailand",
    category: "Pools",
    geometry: {
      type: "Point",
      coordinates: [98.3923, 7.8804],
    },
  },

  {
    title: "Mountain View Chalet",
    description:
      "Wake up to breathtaking mountain views from this peaceful wooden chalet in the Alps.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=800&q=60",
    },
    price: 4800,
    location: "Zermatt",
    country: "Switzerland",
    category: "Mountains",
    geometry: {
      type: "Point",
      coordinates: [7.7491, 46.0207],
    },
  },

  {
    title: "Historic Villa in Rome",
    description:
      "Stay in an elegant historic villa surrounded by Roman architecture and charming streets.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 3900,
    location: "Rome",
    country: "Italy",
    category: "Iconic",
    geometry: {
      type: "Point",
      coordinates: [12.4964, 41.9028],
    },
  },

  {
    title: "Luxury Castle in Ireland",
    description:
      "A beautiful historic castle offering a peaceful countryside escape with elegant interiors.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=800&q=60",
    },
    price: 9000,
    location: "Galway",
    country: "Ireland",
    category: "Castles",
    geometry: {
      type: "Point",
      coordinates: [-9.0568, 53.2707],
    },
  },

  {
    title: "Coastal Room in Santorini",
    description:
      "A bright and comfortable room overlooking the blue waters and white buildings of Santorini.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=60",
    },
    price: 4100,
    location: "Santorini",
    country: "Greece",
    category: "Rooms",
    geometry: {
      type: "Point",
      coordinates: [25.4615, 36.3932],
    },
  },

  {
    title: "Luxury Dome in the Forest",
    description:
      "Relax inside a modern dome surrounded by trees, wildlife, and peaceful forest views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Coorg",
    country: "India",
    category: "Domes",
    geometry: {
      type: "Point",
      coordinates: [75.8069, 12.3375],
    },
  },

  {
    title: "Northern Lights Cabin",
    description:
      "A warm wooden cabin offering incredible views of the northern lights during winter nights.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=800&q=60",
    },
    price: 6500,
    location: "Tromso",
    country: "Norway",
    category: "Arctic",
    geometry: {
      type: "Point",
      coordinates: [18.9553, 69.6492],
    },
  },

  {
    title: "Sailing Boat Stay",
    description:
      "Spend a peaceful night aboard a beautifully designed sailing boat along the Mediterranean coast.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Barcelona",
    country: "Spain",
    category: "Boats",
    geometry: {
      type: "Point",
      coordinates: [2.1734, 41.3851],
    },
  },

  {
    title: "Countryside Farm Cottage",
    description:
      "A peaceful cottage on a working farm with fresh air, greenery, and beautiful countryside views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=800&q=60",
    },
    price: 1900,
    location: "Nashik",
    country: "India",
    category: "Farms",
    geometry: {
      type: "Point",
      coordinates: [73.7898, 19.9975],
    },
  },

  {
    title: "Jungle Camping Retreat",
    description:
      "Reconnect with nature in a comfortable campsite surrounded by dense forests and wildlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Jim Corbett",
    country: "India",
    category: "Camping",
    geometry: {
      type: "Point",
      coordinates: [79.1208, 29.5300],
    },
  },

  {
    title: "Private Pool Villa in Goa",
    description:
      "A stylish tropical villa with a private pool, spacious rooms, and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=60",
    },
    price: 3800,
    location: "Goa",
    country: "India",
    category: "Pools",
    geometry: {
      type: "Point",
      coordinates: [73.8278, 15.4909],
    },
  },

  {
    title: "Snowy Mountain Lodge",
    description:
      "A cozy lodge surrounded by snow-covered peaks, perfect for a peaceful mountain getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=60",
    },
    price: 3600,
    location: "Gulmarg",
    country: "India",
    category: "Mountains",
    geometry: {
      type: "Point",
      coordinates: [74.3874, 34.0484],
    },
  },

  {
    title: "Floating Houseboat in Kerala",
    description:
      "Experience the famous Kerala backwaters from a traditional houseboat with comfortable rooms.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=800&q=60",
    },
    price: 2700,
    location: "Alappuzha",
    country: "India",
    category: "Boats",
    geometry: {
      type: "Point",
      coordinates: [76.3388, 9.4981],
    },
  },

  {
    title: "Luxury Desert Dome",
    description:
      "Enjoy a luxurious desert escape inside a modern dome with panoramic views of the dunes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=60",
    },
    price: 3300,
    location: "Jaisalmer",
    country: "India",
    category: "Domes",
    geometry: {
      type: "Point",
      coordinates: [70.9083, 26.9157],
    },
  },

  {
    title: "Iconic Apartment Near the Eiffel Tower",
    description:
      "Stay in a stylish Parisian apartment just minutes away from one of the world's most famous landmarks.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60",
    },
    price: 4600,
    location: "Paris",
    country: "France",
    category: "Trending",
    geometry: {
      type: "Point",
      coordinates: [2.2945, 48.8584],
    },
  },

  {
    title: "Luxury Alpine Escape",
    description:
      "A peaceful luxury retreat surrounded by dramatic peaks, fresh air, and beautiful alpine scenery.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 5200,
    location: "Interlaken",
    country: "Switzerland",
    category: "Trending",
    geometry: {
      type: "Point",
      coordinates: [7.8632, 46.6863],
    },
  },
];

module.exports = { data: sampleListings };