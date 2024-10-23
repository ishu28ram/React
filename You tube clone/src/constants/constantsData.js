import {
  AiOutlineHome,
  AiOutlineHtml5,
  AiOutlineShopping,
  AiOutlineFire,
} from "react-icons/ai";
import { BiLogoReact, BiCameraMovie, BiNews } from "react-icons/bi";
import { IoLogoJavascript } from "react-icons/io5"; // Use io5 for the latest version of react-icons
import { DiCss3 } from "react-icons/di";
import { BsMusicNote, BsLightbulb } from "react-icons/bs";
import { SiYoutubegaming } from "react-icons/si";
import { TfiCup } from "react-icons/tfi";
import { GiHanger } from "react-icons/gi";

export const sideBarData = [
  { id: "home", name: "New", icon: <AiOutlineHome /> },
  { id: "React", name: "React JS", icon: <BiLogoReact /> },
  { id: "javascript", name: "JavaScript", icon: <IoLogoJavascript /> },
  { id: "html", name: "HTML", icon: <AiOutlineHtml5 /> },
  { id: "css", name: "CSS", icon: <DiCss3 /> },
  { id: "trending", name: "Trending", icon: <AiOutlineFire /> },
  { id: "shopping", name: "Shopping", icon: <AiOutlineShopping /> },
  { id: "movies", name: "Movies", icon: <BiCameraMovie /> },
  { id: "music", name: "Music", icon: <BsMusicNote /> },
  { id: "gaming", name: "Gaming", icon: <SiYoutubegaming /> },
  { id: "news", name: "News", icon: <BiNews /> },
  { id: "games", name: "Games", icon: <TfiCup /> },
  { id: "learning", name: "Learning", icon: <BsLightbulb /> },
  { id: "fashion-beauty", name: "Fashion", icon: <GiHanger /> },
];
