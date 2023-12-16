import React, { useState } from "react";
import { Box } from "@mui/material";
import HeroBanner from "../components/HeroBanner";
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";
// import Banner from "../assets/images/banner.png";

const Home = () => {
  const [bodyPart, setBodyPart] = useState("all");
  const [exercises, setExercises] = useState([]);

  console.log(bodyPart);
  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        exercises={exercises}
        setBodyPart={setBodyPart}
      />
    </Box>

    // <div className="home_container">
    //   <div className="home_content">
    //     <h2>Fitness Club</h2>
    //     <p className="p1">
    //       Sweet, Smile
    //       <br /> And Repeat
    //     </p>
    //     <p className="p2">
    //       Check out the most effective exercises personalized to you.
    //     </p>
    //     <button>Explore Exercises</button>
    //   </div>

    //   <div className="banner">
    //     <img src={Banner} alt="banner" />
    //   </div>
    // </div>
  );
};

export default Home;
