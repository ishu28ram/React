import React from "react";
import { Link } from "react-router-dom";

const ImproveSkill = () => {
  const lists = [
    "Learn new recipes",
    "Experiment with food",
    "Write your own recipes",
    "Know nutrition facts",
    "Get cooking tips",
    "Get ranked",
  ];

  return (
    <div className="section improve-skills">
      <div className="col img">
        <img src="/Images/gallery/img_10.jpg" alt="skills" />
      </div>
      <div className="col typography">
        <h1 className="title">Improve Your Culinary Skills</h1>
        {lists.map((list, index) => {
          return (
            <p className="skill-item" key={index}>
              {list}
            </p>
          );
        })}
        <Link to={"/recipes"}>
          <button className="btn">Explore Now</button>
        </Link>
      </div>
    </div>
  );
};

export default ImproveSkill;
