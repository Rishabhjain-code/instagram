import './App.css';
import React from 'react';
import NavBar from './Components/NavBar/NavBar.jsx';
import Feeds  from "./Components/Feeds/Feeds.jsx";
import ProfileView from './Components/ProfileView/ProfileView';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="home-view">
        <Feeds></Feeds>
      {/* feeds and profile view componenets flexed view*/}
      <ProfileView></ProfileView>
      </div>
    </React.Fragment>
  );
}

export default App;
