const plants = [
  {
    name: "String of Pearls",
    description:
      "The String of Pearls (Senecio rowleyanus) is a unique succulent with trailing stems adorned by bead-like leaves. It's a favorite for hanging planters, adding visual interest and elegance. It thrives in bright, indirect light and needs minimal watering.",
    category: "hanging",
    basePrice: 22.99,
    defaultVariant: "2",
    variants: [
      {
        id: "1",
        name: "Small Plant",
        price: 22.99,
        img: "https://i.ibb.co/ynRHG7Jw/string-of-pearls-orange-pot.jpg",
        stock: 25,
      },
      {
        id: "2",
        name: "Large Plant",
        price: 39.99,
        img: "https://i.ibb.co/TxzSbCJt/string-of-pearls-white-pot.jpg",
        stock: 12,
      },
    ],
    more_images: [
      "https://i.ibb.co/Zp7z76gx/string-of-pearls-extra.jpg",
      "https://i.ibb.co/ymDfgn1s/string-of-pears-orange-pot-extra.jpg",
    ],
  },
  {
    name: "Boston Fern",
    description:
      "Boston Ferns are lush, classic hanging plants with arching fronds that bring softness and vibrant greenery to any space. They thrive in high humidity and indirect light, making them great for bathrooms or kitchens.",
    category: "hanging",
    basePrice: 18.99,
    defaultVariant: "Small",
    variants: [
      {
        id: "Small",
        name: "Small Plant",
        price: 18.99,
        img: "https://i.ibb.co/vZ5JKW0/boston-fern.jpg",
        stock: 30,
      },
      {
        id: "Large",
        name: "Large Plant",
        price: 32.99,
        img: "https://i.ibb.co/YDP0hMk/boston-fern-large.jpg",
        stock: 10,
      },
    ],
    more_images: [
      "https://i.ibb.co/Wsxv4qB/boston-fern-extra.jpg",
      "https://i.ibb.co/84nbzHk/boston-fern-extra-2.jpg",
    ],
  },
  {
    name: "English Ivy",
    description:
      "English Ivy is a fast-growing vine perfect for hanging baskets. Its trailing vines and lobed leaves add classic charm to interiors and help purify indoor air. It thrives in moderate light and prefers moist soil.",
    category: "hanging",
    basePrice: 17.99,
    defaultVariant: "2",
    variants: [
      {
        id: "1",
        name: "Small Plant",
        price: 17.99,
        img: "https://i.ibb.co/k2fRg08G/english-ivy-orange-pot.jpg",
        stock: 28,
      },
      {
        id: "2",
        name: "Large Plant",
        price: 29.99,
        img: "https://i.ibb.co/391zvFQr/english-ivy-white-pot.jpg",
        stock: 14,
      },
    ],
    more_images: [
      "https://i.ibb.co/DDzz7t15/english-ivy-extra.jpg",
      "https://i.ibb.co/yBQCbhXy/english-ivy-extra-2.jpg",
    ],
  },
  {
    name: "Pothos",
    description:
      "Pothos is a versatile and hardy trailing plant that adapts well to low light and inconsistent watering. It’s perfect for hanging baskets and known for air purification. Its heart-shaped leaves come in vibrant green or variegated varieties.",
    category: "hanging",
    basePrice: 16.99,
    defaultVariant: "2",
    variants: [
      {
        id: "1",
        name: "Small Plant",
        price: 16.99,
        img: "https://i.ibb.co/nNg2TGYq/satin-pothos.jpg",
        stock: 35,
      },
      {
        id: "2",
        name: "Large Plant",
        price: 28.99,
        img: "https://i.ibb.co/bkPCjNb/golden-pothos.jpg",
        stock: 18,
      },
    ],
    more_images: [
      "https://i.ibb.co/b543xd6t/satin-pothos-extra.jpg",
      "https://i.ibb.co/xKx5dt3x/golden-pothos-extra.jpg",
      "https://i.ibb.co/Y4zFmmsM/golden-pothos-extra-2.jpg",
    ],
  },
  {
    name: "Burro’s Tail",
    description:
      "Burro’s Tail (Sedum morganianum) is a succulent with long, trailing stems covered in plump, blue-green leaves. It's perfect for sunny windows and hanging planters. It requires minimal watering and thrives in bright light.",
    category: "hanging",
    basePrice: 24.99,
    defaultVariant: "Small",
    variants: [
      {
        id: "Small",
        name: "Small Plant",
        price: 24.99,
        img: "https://i.ibb.co/Kj5c3Zr/burros-tail.jpg",
        stock: 20,
      },
      {
        id: "Large",
        name: "Large Plant",
        price: 39.99,
        img: "https://i.ibb.co/S3VVL0L/burros-tail-large.jpg",
        stock: 8,
      },
    ],
    more_images: [
      "https://i.ibb.co/kBJwvDz/burros-tail-extra.jpg",
      "https://i.ibb.co/F5NkDJc/burros-tail-extra-2.jpg",
    ],
  },
  {
    name: "String of Hearts",
    description:
      "String of Hearts (Ceropegia woodii) features delicate heart-shaped leaves on slender vines. Its pink and green tones and trailing nature make it ideal for hanging. It thrives in bright, indirect light and needs minimal care.",
    category: "hanging",
    basePrice: 21.99,
    defaultVariant: "Small",
    variants: [
      {
        id: "Small",
        name: "Small Plant",
        price: 21.99,
        img: "https://i.ibb.co/fkHHzzV/string-of-hearts.jpg",
        stock: 22,
      },
      {
        id: "Large",
        name: "Large Plant",
        price: 37.99,
        img: "https://i.ibb.co/YDFxYmd/string-of-hearts-large.jpg",
        stock: 9,
      },
    ],
    more_images: [
      "https://i.ibb.co/n0qgZk1/string-of-hearts-extra.jpg",
      "https://i.ibb.co/wKMNHYT/string-of-hearts-extra-2.jpg",
    ],
  },
  {
    name: "Spider Plant",
    description:
      "Spider Plants are classic hanging houseplants with arching green-and-white striped leaves. They grow quickly and produce baby ‘spiderettes’ that dangle from the mother plant. They’re easy to grow and tolerant of various conditions.",
    category: "hanging",
    basePrice: 15.99,
    defaultVariant: "Small",
    variants: [
      {
        id: "Small",
        name: "Small Plant",
        price: 15.99,
        img: "https://i.ibb.co/ydjRCt2/spider-plant.jpg",
        stock: 33,
      },
      {
        id: "Large",
        name: "Large Plant",
        price: 27.99,
        img: "https://i.ibb.co/cJ8C2bm/spider-plant-large.jpg",
        stock: 13,
      },
    ],
    more_images: [
      "https://i.ibb.co/GVTvfsr/spider-plant-extra.jpg",
      "https://i.ibb.co/DVXZc0F/spider-plant-extra-2.jpg",
    ],
  },
  {
    name: "Philodendron Brasil",
    description:
      "Philodendron Brasil is a colorful trailing plant with variegated green and yellow heart-shaped leaves. It’s low-maintenance, grows well in hanging baskets, and purifies indoor air. It thrives in bright, indirect light.",
    category: "hanging",
    basePrice: 20.99,
    defaultVariant: "Small",
    variants: [
      {
        id: "Small",
        name: "Small Plant",
        price: 20.99,
        img: "https://i.ibb.co/zFV8vNv/philodendron-brasil.jpg",
        stock: 27,
      },
      {
        id: "Large",
        name: "Large Plant",
        price: 36.99,
        img: "https://i.ibb.co/NZWgjxF/philodendron-brasil-large.jpg",
        stock: 11,
      },
    ],
    more_images: [
      "https://i.ibb.co/YDdxzWx/philodendron-brasil-extra.jpg",
      "https://i.ibb.co/YfwxnJK/philodendron-brasil-extra-2.jpg",
    ],
  },
  {
    name: "Wandering Jew",
    description:
      "Wandering Jew (Tradescantia zebrina) is a striking trailing plant with purple and silver striped leaves. It’s fast-growing and looks great in hanging baskets. It loves bright light and moist, well-drained soil.",
    category: "hanging",
    basePrice: 19.49,
    defaultVariant: "Small",
    variants: [
      {
        id: "Small",
        name: "Small Plant",
        price: 19.49,
        img: "https://i.ibb.co/b17gR8N/wandering-jew.jpg",
        stock: 30,
      },
      {
        id: "Large",
        name: "Large Plant",
        price: 33.49,
        img: "https://i.ibb.co/xSXmMCs/wandering-jew-large.jpg",
        stock: 10,
      },
    ],
    more_images: [
      "https://i.ibb.co/7GZ9gF1/wandering-jew-extra.jpg",
      "https://i.ibb.co/X2bDR5n/wandering-jew-extra-2.jpg",
    ],
  },
  {
    name: "Hoya Carnosa",
    description:
      "Hoya Carnosa, also called the Wax Plant, is a trailing beauty with thick, glossy leaves and sweet-scented star-shaped flowers. It’s excellent for hanging baskets and thrives in bright, indirect light.",
    category: "hanging",
    basePrice: 23.99,
    defaultVariant: "Small",
    variants: [
      {
        id: "Small",
        name: "Small Plant",
        price: 23.99,
        img: "https://i.ibb.co/JKVBvZ2/hoya-carnosa.jpg",
        stock: 24,
      },
      {
        id: "Large",
        name: "Large Plant",
        price: 38.99,
        img: "https://i.ibb.co/CKqkSnf/hoya-carnosa-large.jpg",
        stock: 10,
      },
    ],
    more_images: [
      "https://i.ibb.co/1rtvDks/hoya-carnosa-extra.jpg",
      "https://i.ibb.co/Jv6gS3v/hoya-carnosa-extra-2.jpg",
    ],
  },
];
