import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
  Typography,
  Grid,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthContext } from "../context/AuthContext";
import { ADD_DATING } from "../GraphQL/Mutations";
import { TONE_OF_TEXT } from "../GraphQL/Queries";
import { AmberSwitch, StyledRating } from "../style/useStyles";
import FavoriteIcon from "@material-ui/icons/Favorite";

const AddText: React.FC = (props) => {
  const { user } = useContext(AuthContext);
  const [AddDatingTextMutation, { error: addTextErr }] =
    useMutation(ADD_DATING);
  const [datingText, setDatingText] = useState<IAddText>({
    // owner: user?._id,
    text: "",
    postDate: new Date().toISOString(),
    xprivate: false,
    display: true,
  });
  const [submit, setSubmit] = useState<boolean>(false);
  const textRef = useRef<HTMLInputElement>(null);
  const [textAnal, setTextAnal] = React.useState<string>("");
  const {
    loading: toneLoading,
    data: toneData,
    refetch: toneRefetch,
  } = useQuery(TONE_OF_TEXT, {
    variables: {
      aToneText: textAnal,
    },
  });
  const handleChange = (e: ChangeEvent<any>): void =>
    setDatingText({ ...datingText, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    // console.log(123, toneData);
    // console.log(datingText);
    try {
      await AddDatingTextMutation({
        variables: {
          addDatingTextText: {
            // owner: datingText.owner,
            text: datingText.text,
            postDate: datingText.postDate,
            xprivate: datingText.xprivate,
            display: datingText.display,
            toneResults: toneData.aTone,
          },
        },
      });
      console.log("text was uploaded");
    } catch (err) {
      if (addTextErr) {
        console.log(addTextErr);
      }
      console.log(`err`, err);
    }
    console.log(datingText.text);
    setSubmit(false);
  };

  useEffect(() => {
    console.log(`toneData from Ue`, toneData);
    const thv = async () => {
      await toneData;
      console.log(`submit`, submit);
      submit && handleSubmit();
      console.log("submit", submit);
    };
    thv();
  }, [toneData, submit]);
  return (
    <Grid
      container
      // direction="column"
      // spacing={2}
      // alignContent="center"
      // alignItems="center"
      // style={{ marginLeft: "1rem", marginRight: "1rem" }}
    >
      <Grid item xs={12}>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={10}
          placeholder="Add your own dating text here and click upload"
          name="text"
          value={datingText.text}
          onChange={handleChange}
          style={{
            width: "100%",
            // alignSelf: "center",
            // alignItems: "center",
            // alignContent: "center",
          }}
        />
      </Grid>
      <Grid item xs={12} style={{ display: "flex" }}>
        <FormControlLabel
          control={
            <AmberSwitch
              checked={datingText.xprivate}
              onChange={(event) => {
                setDatingText({
                  ...datingText,
                  xprivate: event.target.checked,
                });
              }}
              name="xprivate"
            />
          }
          label="Draft"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          name="update_button2"
          onClick={async (e) => {
            setTextAnal(datingText.text);
          }}
        >
          Let's analyze your text
        </Button>
      </Grid>
      {textAnal !== "" &&
        (toneData?.aTone && Object.keys(toneData.aTone).length !== 0 ? (
          Object.keys(toneData.aTone).map((tone) => {
            console.log(`toneData.aTone[tone]`, toneData.aTone[tone]);
            return (
              <span>
                <Typography component="span">{tone}</Typography>
                <StyledRating
                  name="customized-color"
                  defaultValue={Math.round(toneData.aTone[tone] * 100) / 10}
                  getLabelText={(value: number) =>
                    `${value} Heart${value !== 1 ? "s" : ""}`
                  }
                  precision={0.5}
                  max={10}
                  readOnly={true}
                  icon={<FavoriteIcon fontSize="inherit" />}
                />
              </span>
            );
          })
        ) : !toneLoading ? (
          <p>text too short</p>
        ) : (
          <p>loading</p>
        ))}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          name="update_button"
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await setTextAnal(datingText.text);
            await setSubmit(true);
          }}
        >
          Upload your text
        </Button>{" "}
      </Grid>
      <Grid item xs={12}>
        <button onClick={() => console.log(`datingText`, datingText)}>
          datingText
        </button>
      </Grid>
    </Grid>
  );
};
export default AddText;
