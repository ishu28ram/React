import React, { useEffect, useState } from "react";
import fetchData, { exerciseOption, youtubeOptions } from "../utils/fetchData";
import { Box } from "@mui/material";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercise from "../components/SimilarExercise";
import { useParams } from "react-router-dom";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentMuscleExercises, setEquipmentMuscleExercises] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbURL = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const exercisesDetailData = await fetchData(
        `${exerciseDbURL}/exercises/exercise/${id}`,
        exerciseOption
      );
      const exerciseYoutubeVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exercisesDetailData.name}`,
        youtubeOptions
      );
      const targetMuscleExercisesData = await fetchData(
        `${exerciseDbURL}/exercises/target/${exercisesDetailData.target}`,
        exerciseOption
      );
      const equipmentMuscleExercisesData = await fetchData(
        `${exerciseDbURL}/exercises/equipment/${exercisesDetailData.equipment}`,
        exerciseOption
      );
      setExerciseDetail(exercisesDetailData);
      setExerciseVideos(exerciseYoutubeVideosData.contents);
      setTargetMuscleExercises(targetMuscleExercisesData);
      setEquipmentMuscleExercises(equipmentMuscleExercisesData);
    };
    fetchExercisesData();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercise
        targetMuscleExercises={targetMuscleExercises}
        equipmentMuscleExercises={equipmentMuscleExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
