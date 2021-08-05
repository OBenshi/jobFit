import React from "react";
import bg from "../img/bg2.jpg";
import DisplayTextComp from "../components/DisplayTextComp";
import AddComment from "../components/AddComment";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


const DisplayText: React.FC = () => {
  const backgroundStyles = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  };
  return (
    <div style={backgroundStyles}>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        <Box
          fontWeight="fontWeightBold"
          fontSize={92}
          letterSpacing={14}
          fontFamily="Monospace"
          color="#FFD700"
        >
          SWAT
        </Box>
      </Typography>
      <DisplayTextComp />
        <AddComment />
    </div>
  );
};
export default DisplayText;
