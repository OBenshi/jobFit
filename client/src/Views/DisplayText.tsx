import React from "react";
import bg from "../img/bg2.jpg";
import DisplayTextComp from "../components/DisplayTextComp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { useQuery, gql } from '@apollo/client'
import { DATING_TEXT } from '../GraphQL/Queries';

const DisplayText: React.FC= () => {

  const { error, loading, data } = useQuery(DATING_TEXT);
  
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
      

      {loading && <p>loading</p>}
      {error !== undefined && <p>{error.message}</p>}
      {data !== undefined && data.allTexts.map((allText: any, index:number) => {
        return <DisplayTextComp key={index} allText={allText} />
 })} 
      </div>
      );
};
export default DisplayText;
