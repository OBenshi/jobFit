import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { SEARCH_TEXT } from '../GraphQL/Queries';
import { Typography, Box } from '@material-ui/core';
import DisplayTextComp from '../components/DisplayTextComp';
import bg from '../img/head.jpeg';

type srchParams = {
  searchTerm: string;
};
interface Props {}

const SrchRes = (props: Props) => {
  const { searchTerm: orginalTerm } = useParams<srchParams>();
  const [searchTerm, setSearchTerm] = useState<string>(orginalTerm);
  const {
    error: srchErr,
    loading: srchLoading,
    data: srchData,
  } = useQuery(SEARCH_TEXT, {
    variables: {
      searchTextSearchTerm: orginalTerm,
    },
  });
  const backgroundStyles = {
    backgroundImage: `url(${bg})`,
    // backgroundPosition: "center",
    // backgroundSize: "cover",
    // backgroundRepeat: "repeat",
    width: '100%',
    // height: "10%",
    resizeMode: 'repeat',
  };

  useEffect(() => {
    console.log(`srchData`, srchData);
  }, [srchData]);
  console.log(`useParams`, searchTerm);
  return (
    <div style={backgroundStyles}>
      {srchLoading && <p>loading</p>}
      {srchErr !== undefined && <p>{srchErr.message}</p>}
      {srchData !== undefined &&
        srchData.searchText.map((text: any, index: number) => {
          // console.log(`allText222`, allText);
          return <DisplayTextComp key={index} allText={text} />;
        })}
    </div>
  );
};

export default SrchRes;
