import img1 from "../../../public/images/img1.jpg";
import img2 from "../../../public/images/img2.jpg";
import img3 from "../../../public/images/img3.jpg";
import img4 from "../../../public/images/img4.jpg";
import img5 from "../../../public/images/img5.jpg";
import chicken from "../../assets/images/chicken.jpg";
import icecream from "../../assets/images/icecream.jpg";
import indian from "../../assets/images/indian.jpg";
import japanese from "../../assets/images/japanese.jpg";
import pasta from "../../assets/images/pasta.jpg";
import pizza from "../../assets/images/pizza.jpg";
import salsa from "../../assets/images/salsa.jpg";
import smoothie from "../../assets/images/smoothie.jpg";
import soup from "../../assets/images/soup.jpg";

export const navlinks_Data = [
  {
    to: "/recipes",
    name: "Recipes",
  },
  {
    to: "/about",
    name: "About",
  },
  {
    to: "/contact",
    name: "Contact",
  },
  {
    to: "/favorites",
    name: "Favorites",
  },
  {
    to: "/search",
    name: "Search",
  },
];

export const foods_quotes = [
  {
    quote:
      "The food you eat can be either the safest medicine or the slowest poison.",
    author: "— Ann Wigmore",
    img: img1,
  },
  {
    quote:
      "You don't have to cook fancy or complicated masterpieces just good food from fresh ingredients.",
    author: "— Julia Child",
    img: img2,
  },
  {
    quote: "Let food be thy medicine and medicine be thy food.",
    author: "— Hippocrates",
    img: img3,
  },
  {
    quote: "To eat is a necessity, but to eat intelligently is an art.",
    author: "— François de La Rochefoucauld",
    img: img4,
  },
  {
    quote: "Take care of your body. It's the only place you have to live.",
    author: "—  Jim Rohn",
    img: img5,
  },
];

export const categories = [
  { name: "Pizza", img: pizza },
  { name: "Smoothie", img: smoothie },
  { name: "Indian", img: indian },
  { name: "Japanese", img: japanese },
  { name: "Ice Cream", img: icecream },
  { name: "Chicken", img: chicken },
  { name: "Salsa", img: salsa },
  { name: "Soup", img: soup },
  { name: "Pasta", img: pasta },
];
