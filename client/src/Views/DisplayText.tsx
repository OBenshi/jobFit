import React from "react";
import bg from "../img/head.jpeg";
import backGround from "../img/head.jpeg";
import DisplayTextComp from "../components/DisplayTextComp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useQuery, gql } from "@apollo/client";
import { DATING_TEXT } from "../GraphQL/Queries";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      backgroundImage:  `url(${backGround})`,
      backgroundPosition: "center",
      width: "100vw",
      height: "150px",
      paddingTop: 70
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  })
);

const DisplayText: React.FC = () => {
  const { error, loading, data } = useQuery(DATING_TEXT);
  const classes = useStyles();

  const backgroundStyles = {
    backgroundImage: `url(${bg})`,
    // backgroundPosition: "center",
    // backgroundSize: "cover",
    // backgroundRepeat: "repeat",
    width: "100%",
    // height: "10%",
    resizeMode: "repeat"
  };
  return (
    <>
      <div style={backgroundStyles}>
        
        <Typography
          className={classes.title}
          component="h5"
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          <Box fontWeight="fontWeightBold" fontFamily="Arial" bgcolor="white">
            Dating Texts 📪
          </Box>
        </Typography>

        {loading && <p>loading</p>}
        {error !== undefined && <p>{error.message}</p>}
        {data !== undefined &&
          data.allTexts.map((allText: any, index: number) => {
            console.log(`allText222`, allText);
            return <DisplayTextComp key={index} allText={allText} />;
          })}
      </div>
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          ❤️‍🔥 SWAT 2021 All rights reserved ©
        </Typography>
      </footer>
    </>
  );
};
export default DisplayText;
