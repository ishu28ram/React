import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SimilarExercise = ({
  targetMuscleExercises,
  equipmentMuscleExercises,
}) => {
  return (
    <Box sx={{ mt: { lg: "100px", xs: "0" } }}>
      <Typography variant="h3" mb={6}>
        Exercises that{" "}
        <span style={{ color: "#ff2625", textTransform: "capitalize" }}>
          {" "}
          target
        </span>{" "}
        the same Muscle group
      </Typography>
      <Stack
        direction="row"
        sx={{
          p: "2",
          position: "relative",
        }}
      >
        {targetMuscleExercises.length && (
          <HorizontalScrollbar data={targetMuscleExercises} />
        )}
      </Stack>

      <Typography variant="h3" mb={6} mt={10}>
        Exercises that use the same{" "}
        <span style={{ color: "#ff2625", textTransform: "capitalize" }}>
          equipment
        </span>
      </Typography>
      <Stack
        direction="row"
        sx={{
          p: "2",
          position: "relative",
        }}
      >
        {equipmentMuscleExercises.length && (
          <HorizontalScrollbar data={equipmentMuscleExercises} />
        )}
      </Stack>
    </Box>
  );
};

export default SimilarExercise;
