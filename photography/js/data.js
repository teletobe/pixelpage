/* ===========================================
   data.js — Zine definitions for the exhibition.
   Each zine has a title, subtitle, cover image,
   and a list of photos for the reader.
   =========================================== */

const ZINES = [
  {
    id: "portfolio",
    title: "Portfolio",
    subtitle: "selected works · 2022–2024",
    cover: "img/zines/portfolio/pf1.jpg",
    photos: Array.from({ length: 96 }, (_, i) => ({
      src: `img/zines/portfolio/pf${i + 1}.jpg`,
    })),
  },
  {
    id: "portrait",
    title: "Portraits",
    subtitle: "people & faces · 2023",
    cover: "img/zines/portrait/portrait1.jpg",
    photos: Array.from({ length: 28 }, (_, i) => ({
      src: `img/zines/portrait/portrait${i + 1}.jpg`,
    })),
  },
  {
    id: "artsy",
    title: "Artsy",
    subtitle: "experimental · 2024",
    cover: "img/zines/artsy/art1.jpg",
    photos: Array.from({ length: 17 }, (_, i) => ({
      src: `img/zines/artsy/art${i + 1}.jpg`,
    })),
  },
  {
    id: "berg",
    title: "Berg",
    subtitle: "hikes · 2019–2025",
    cover: "img/zines/berg/berg22.jpg",
    photos: Array.from({ length: 95 }, (_, i) => ({
      src: `img/zines/berg/berg${i + 1}.jpg`,
    })),
  },
  {
    id: "japan",
    title: "Japan",
    subtitle: "trip to japan in · 2024",
    cover: "img/zines/japan/japan22.jpg",
    photos: Array.from({ length: 53 }, (_, i) => ({
      src: `img/zines/japan/japan${i + 1}.jpg`,
    })),
  },
  {
    id: "street",
    title: "Street",
    subtitle: "streety stuff",
    cover: "img/zines/street/street5.jpg",
    photos: Array.from({ length: 22 }, (_, i) => ({
      src: `img/zines/street/street${i + 1}.jpg`,
    })),
  },
];
