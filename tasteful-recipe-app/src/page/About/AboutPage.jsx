import React from "react";
import "./AboutPage.css";
import aboutOne from "./aboutImg.jpg";
import aboutTwo from "./abouttwo.jpg";
import useFetchUserData from "../../hooks/useFetchUserData";
import Loading from "../../component/Loading/Loading";

const AboutPage = () => {
  const { userData, error, isLoading } = useFetchUserData();
  return (
    <div className="about_container container">
      <div className="about_section_one">
        <h1>We’re a group of foodies who love cooking and the internet</h1>
        <img src={aboutOne} alt="about page" />
        <p>
          Food qualities braise chicken cuts bowl through slices butternut
          snack. Tender meat juicy dinners. One-pot low heat plenty of time
          adobo fat raw soften fruit. sweet renders bone-in marrow richness
          kitchen, fricassee basted pork shoulder. Delicious butternut squash
          hunk.
        </p>
      </div>
      <div className="about_section_two">
        <div className="section_two_left">
          <h1>Simple, Easy Recipes for all</h1>
          <p>
            Juicy meatballs brisket slammin' baked shoulder. Juicy smoker soy
            sauce burgers brisket. polenta mustard hunk greens. Wine technique
            snack skewers chuck excess. Oil heat slowly. slices natural
            delicious, set aside magic tbsp skillet, bay leaves brown
            centerpiece.
          </p>
        </div>
        <div className="section_two_right">
          <img src={aboutTwo} alt="aboutTwo" />
        </div>
      </div>
      <div className="about_section_three">
        <h1>An incredible team of talented chefs and foodies</h1>
        <div className="user_grid">
          {!isLoading &&
            userData &&
            userData.length > 0 &&
            userData.map((user) => {
              return (
                <div className="user_box" id={user.id}>
                  <img src={user.image} alt={user.firstName} />
                  <h5>{user.firstName}</h5>
                  <p>{user.company.department.split(" ")[0]}</p>
                </div>
              );
            })}
          {isLoading && <Loading />}
        </div>
      </div>
      <div className="about_section_four">
        <h3>Operatring from NYC, Dubai and London</h3>
        <p>
          Gastronomy atmosphere set aside. Slice butternut cooking home.
          Delicious romantic undisturbed raw platter will meld. Thick Skewers
          skillet natural, smoker soy sauce wait roux. slices rosette bone-in
          simmer precision alongside baby leeks. Crafting renders aromatic
          enjoyment.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
