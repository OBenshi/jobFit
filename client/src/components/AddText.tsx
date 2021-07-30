import React, {
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { useMutation } from "@apollo/client";
import {ADD_DATING} from '../GraphQL/Mutations'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
    display: "flex",
    flexDirection:'column',
    flexWrap: "wrap",
    width: 360,
    margin: `${theme.spacing(0)} auto`,
    }
  })
);
interface IAddText {
    owner: string
    text: string
    postDate: string
    display: boolean
    xprivate: boolean
}

const AddText: React.FC = (props) => {
     const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
    const classes = useStyles();
    const [AddDatingTextMutation, { error }] = useMutation(ADD_DATING);
    const [datingText, setDatingText] = useState <IAddText>({
    owner: "",
    text: "",
    postDate: new Date().toISOString(),
    xprivate: false,
    display: true
    })

   const handleChange = (e: ChangeEvent<any>): void =>
   setDatingText({ ...datingText, [e.target.name]: e.target.value }
    );
 
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(datingText);
        AddDatingTextMutation({
          variables: {
              "addDatingTextInput": {
               "owner": datingText.owner,
               "text": datingText.text, 
               "postDate": datingText.postDate,
               "xprivate": datingText.xprivate,
               "display": datingText.display
            }
          }
        })
        if (error) {
          console.log(error)
        } else {
          console.log("text was uploaded")
      }
      console.log(datingText.text)
  } 
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off" style ={{backgroundColor:" white"}} onSubmit={handleSubmit}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={10}
            placeholder="Add your own dating text here and click upload"
            name="text"
            value={datingText.text}
        onChange={handleChange} />
        <FormControlLabel
        control={
          <Checkbox
            name="xprivate"
            color="primary"
            value={datingText.xprivate}
            onChange={handleChange}
          />
        }
            label="Private"
                /> 
         <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Todays date"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <Button variant="contained" color="primary" type="submit">Upload your text for analyse</Button>
        </form>
        </div>
    )
}

export default AddText;

///TODO watson and edit your dating text.