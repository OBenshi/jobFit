import { useMutation, useQuery } from '@apollo/client';
import { flexbox } from '@material-ui/system';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
  Typography,
  Grid,
  Input,
  CircularProgress,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from '../context/AuthContext';
import { ADD_DATING } from '../GraphQL/Mutations';
import { TONE_OF_TEXT } from '../GraphQL/Queries';
import { AmberSwitch, StyledRating } from '../style/useStyles';
import FavoriteIcon from '@material-ui/icons/Favorite';

const AddText: React.FC = (props) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [AddDatingTextMutation, { error: addTextErr }] =
    useMutation(ADD_DATING);
  const [datingText, setDatingText] = useState<IAddText>({
    // owner: user?._id,
    text: '',
    postDate: new Date().toISOString(),
    xprivate: false,
    display: true,
  });
  const [submit, setSubmit] = useState<boolean>(false);
  const textRef = useRef<HTMLInputElement>(null);
  const [textAnal, setTextAnal] = React.useState<string>('');
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
      console.log('text was uploaded');
      history.push('/displaytext');
    } catch (err) {
      if (addTextErr) {
        console.log(addTextErr);
      }
      console.log(`err`, err);
    }
    setSubmit(false);
  };

  useEffect(() => {
    console.log(`toneData from Ue`, toneData);
    const thv = async () => {
      await toneData;
      console.log(`submit`, submit);
      submit && handleSubmit();
      console.log('submit', submit);
    };
    thv();
  }, [toneData, submit]);
  return (
    <Grid
      container
      id='hello0000'
      spacing={1}
      alignContent='center'
      justifyContent='center'>
      <Grid item xs={12}>
        <TextareaAutosize
          aria-label='minimum height'
          minRows={10}
          placeholder='Add your own dating text here and click upload'
          name='text'
          value={datingText.text}
          onChange={handleChange}
          style={{
            width: '100%',
          }}
        />
      </Grid>

      <Grid item xs={12} style={{ display: 'flex' }}>
        <FormControlLabel
          style={{
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '50%',
          }}
          control={
            <AmberSwitch
              checked={datingText.xprivate}
              onChange={(event) => {
                setDatingText({
                  ...datingText,
                  xprivate: event.target.checked,
                });
              }}
              name='xprivate'
            />
          }
          label={datingText.xprivate ? 'Private' : 'Public'}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant='contained'
          color='secondary'
          type='button'
          name='update_button2'
          onClick={async (e) => {
            setTextAnal(datingText.text);
          }}>
          Let's analyze your text
        </Button>
      </Grid>
      {textAnal !== '' &&
        (toneData?.aTone && Object.keys(toneData.aTone).length !== 0 ? (
          <Grid
            container
            direction='row'
            style={{
              background: 'rgba(255,255,255,0.7)',
              // borderRadius: "50%",
            }}
            alignContent='center'
            justifyContent='center'
            // spacing={8}
          >
            {Object.keys(toneData.aTone).map((tone) => {
              console.log(`toneData.aTone[tone]`, toneData.aTone[tone]);
              const toneNum = Math.round(toneData.aTone[tone] * 100) / 10 / 2;
              return (
                <>
                  <Grid item xs={3}>
                    <Typography>{tone}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <StyledRating
                      name='customized-color'
                      defaultValue={toneNum}
                      getLabelText={(value: number) =>
                        `${value} Heart${value !== 1 ? 's' : ''}`
                      }
                      precision={0.1}
                      max={5}
                      readOnly={true}
                      icon={<FavoriteIcon fontSize='inherit' />}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>{toneNum}/5</Typography>
                  </Grid>
                </>
              );
            })}
          </Grid>
        ) : !toneLoading ? (
          <Typography>text to short</Typography>
        ) : (
          <Grid item xs={12}>
            <Grid container alignContent='center' justifyContent='center'>
              <Grid item>
                {' '}
                <CircularProgress />
              </Grid>
            </Grid>
          </Grid>
        ))}
      <Grid item xs={12}>
        <Button
          variant='contained'
          fullWidth
          color='secondary'
          type='button'
          name='update_button'
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await setTextAnal(datingText.text);
            await setSubmit(true);
          }}>
          Save your text
        </Button>{' '}
      </Grid>
    </Grid>
  );
};
export default AddText;
