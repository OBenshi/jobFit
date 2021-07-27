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
    const [addDatingText, { error }] = useMutation(ADD_DATING);
    const [datingText, setDatingText] = useState <IAddText>({
    owner: "",
    text: "",
    postDate: new Date().toISOString(),
    xprivate: false
    })

  const handleChange = (e: ChangeEvent<any>): void =>
  setDatingText({ ...datingText, [e.target.name]: e.target.value }
    );
 
    const handleCLick = (e: FormEvent<HTMLFormElement>) => {
        console.log(datingText)
        e.preventDefault();
        addDatingText({
          variables: {
              "addDatingTextInput": {
               "owner": datingText.owner,
               "text": datingText.text, 
               "postDate": datingText.postDate,
               "xprivate": datingText.xprivate, 
            }
          }
        })
        if (error) {
          console.log(error)
        } else {
          console.log("text was uploaded")
      }
  }
    return (
        <div>
        <form className={classes.container} noValidate autoComplete="off" style ={{backgroundColor:" white"}} onSubmit={handleCLick}>
        <TextareaAutosize aria-label="minimum height" minRows={7} placeholder="Add your own dating text here and click upload" name="text"
        onChange={handleChange} />
        <FormControlLabel
        control={
          <Checkbox
            name="checkedB"
            color="primary"
          />
        }
        label="Private"
                />
         <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <Button variant="contained" color="primary" type="submit">Upload</Button>
        </form>
        </div>
    )
}

export default AddText;