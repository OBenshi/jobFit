import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import NoUserHome from '../components/NoUserHome';
import UserHome from '../components/UserHome';

const Home: React.FC = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  return user && isAuthenticated ? <UserHome /> : <NoUserHome />;
};

export default Home;
