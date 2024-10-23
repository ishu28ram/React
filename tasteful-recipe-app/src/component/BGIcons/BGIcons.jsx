import React, { useEffect, useState } from "react";
import { GiShinyApple } from "react-icons/gi";
import { LuBanana } from "react-icons/lu";
import { LuCherry } from "react-icons/lu";
import { GiKiwiFruit } from "react-icons/gi";
import { GiOrange } from "react-icons/gi";
import { PiOrangeSlice } from "react-icons/pi";
import { GiWatermelon } from "react-icons/gi";
import { GiGrapes } from "react-icons/gi";

import "./BGIcons.css";

export const fruits = [
  { id: 1, name: "Apple", icon: <GiShinyApple /> },
  { id: 2, name: "Banana", icon: <LuBanana /> },
  { id: 3, name: "Cherry", icon: <LuCherry /> },
  { id: 4, name: "Kiwi", icon: <GiKiwiFruit /> },
  { id: 5, name: "Orange", icon: <GiOrange /> },
  { id: 6, name: "Orange Slice", icon: <PiOrangeSlice /> },
  { id: 7, name: "Watermelon", icon: <GiWatermelon /> },
  { id: 8, name: "Grapes", icon: <GiGrapes /> },
];

const BGIcons = () => {
  const [allIcons, SetIcons] = useState([]);
  const icons = [];
  function handleRandomIcon() {
    for (let i = 0; i < fruits.length; i++) {
      const randomIcon = Math.floor(Math.random() * fruits.length);
      const top = Math.random() * 100 + "vw";
      const left = Math.random() * 100 + "vw";
      const bottom = Math.random() * 100 + "vw";
      const right = Math.random() * 100 + "vh";
      icons.push({
        icon: fruits[randomIcon].icon,
        top: top,
        left: left,
        bottom: bottom,
        right: right,
      });
    }
    SetIcons(icons);
  }
  useEffect(() => {
    handleRandomIcon();
  }, []);
  return (
    <div className="bg_icons">
      {allIcons.map((icon) => {
        return (
          <div
            style={{
              zIndex: -999,
              position: "fixed",
              top: icon.top,
              left: icon.left,
            }}
          >
            {icon.icon}
          </div>
        );
      })}
    </div>
  );
};

export default BGIcons;
