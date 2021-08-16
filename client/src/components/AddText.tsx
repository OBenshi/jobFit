import { useMutation, useQuery } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { AuthContext } from "../context/AuthContext";
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { ADD_DATING } from "../GraphQL/Mutations";
import { TONE_OF_TEXT } from "../GraphQL/Queries";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      width: 360,
      margin: `${theme.spacing(0)} auto`,
    },
  })
);

const AddText: React.FC = (props) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const [AddDatingTextMutation, { error: addTextErr }] =
    useMutation(ADD_DATING);
  const [datingText, setDatingText] = useState<IAddText>({
    // owner: user?._id,
    text: "",
    postDate: new Date().toISOString(),
    private: false,
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
  const [buttonNum, setButtonNum] = useState<number>(1);
  const handleChange = (e: ChangeEvent<any>): void =>
    setDatingText({ ...datingText, [e.target.name]: e.target.value });
  const handleSubmit = async () => {
    // console.log(123, toneData);
    console.log(datingText);
    try {
      await AddDatingTextMutation({
        variables: {
          addDatingTextText: {
            // owner: datingText.owner,
            text: datingText.text,
            postDate: datingText.postDate,
            xprivate: datingText.private,
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
    <div>
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        style={{ backgroundColor: " white" }}
        // onSubmit={handleSubmit}
      >
        <TextareaAutosize
          aria-label="minimum height"
          minRows={10}
          placeholder="Add your own dating text here and click upload"
          name="text"
          value={datingText.text}
          onChange={handleChange}
        />
        {/* <FormControlLabel
        control={
          <Checkbox
            name="xprivate"
            color="primary"
            value={datingText.private}
            onChange={handleChange}
          />
        }
            label="Private"
                />  */}
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Todays date"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="button"
          name="update_button2"
          onClick={async (e) => {
            setTextAnal(datingText.text);
          }}
        >
          Let's analyze your text
        </Button>
        {toneData !== undefined &&
          textAnal !== "" &&
          (toneData?.aTone && Object.keys(toneData.aTone).length !== 0 ? (
            Object.entries(toneData.aTone).map(([key, value]) => (
              <p>
                {key}:{value}
              </p>
            ))
          ) : !toneLoading ? (
            <p>text too short</p>
          ) : (
            <p>loading</p>
          ))}
        <Button
          variant="contained"
          color="primary"
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
      </form>
    </div>
  );
};
export default AddText;
///TODO watson and edit your dating text.
