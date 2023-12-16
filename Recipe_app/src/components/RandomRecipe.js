import RandomContainer from "./RandomContainer";

const RandomRecipe = () => {
  return (
    <div>
      <h3>Popular picks:</h3>
      <div className="popular-picks-container">
        <RandomContainer />
        <RandomContainer />
        <RandomContainer />
      </div>
    </div>
  );
};

export default RandomRecipe;
