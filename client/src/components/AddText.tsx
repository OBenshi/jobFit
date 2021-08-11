import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  MouseEvent,
  TouchEvent,
} from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { useMutation, useQuery } from "@apollo/client";
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
interface IAddText {
  owner: string;
  text: string;
  postDate: string;
  display: boolean;
  private: boolean;
}

const AddText: React.FC = (props) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const classes = useStyles();
  const [AddDatingTextMutation, { error: addTextErr }] =
    useMutation(ADD_DATING);

  const [datingText, setDatingText] = useState<IAddText>({
    owner: "610aab87b019d20496f334c8",
    text: "",
    postDate: new Date().toISOString(),
    private: false,
    display: true,
  });
  // const [ tone, setTone ] = useState<Object>({});
  const {
    loading,
    data: toneData,
    refetch,
    error: toneErr,
  } = useQuery(TONE_OF_TEXT, {
    variables: {
      aToneText: datingText.text,
    },
  });

  const handleChange = (e: ChangeEvent<any>): void =>
    setDatingText({ ...datingText, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(datingText);
    AddDatingTextMutation({
      variables: {
        addDatingTextText: {
          owner: datingText.owner,
          text: datingText.text,
          postDate: datingText.postDate,
          private: datingText.private,
          display: datingText.display,
        },
      },
    });
    if (addTextErr) {
      console.log(addTextErr);
    } else {
      console.log("text was uploaded");
    }
    console.log(datingText.text);
  };
  const handleAnalyze = async (e: PointerEvent | MouseEvent<any>) => {
    e.preventDefault();

    try {
      await refetch();
      console.log(`toneData`, toneData);
      // await setTone(toneData);
    } catch (err) {
      console.log(`e`, err, toneErr);
    }
  };
  useEffect(() => {
    console.log(`data`, toneData);
  }, []);
  return (
    <div>
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        style={{ backgroundColor: " white" }}
        onSubmit={handleSubmit}
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
          onClick={(e: PointerEvent | MouseEvent) => {
            handleAnalyze(e);
          }}
        >
          Let's analyze your text
        </Button>
        {/* {data !== undefined && props.aTone} */}
        <Button variant="contained" color="primary" type="submit">
          Upload your text
        </Button>
      </form>
      {/* {
        tone && <>{tone.aTone}</>
      } */}
    </div>
  );
};

export default AddText;

///TODO watson and edit your dating text.