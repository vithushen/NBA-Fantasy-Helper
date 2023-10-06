import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setPlayerName(event.target.value);
  };

  const fetchPlayerStats = async () => {
    // Validate playerName before making the API call
    if (!playerName) {
      console.error('Please enter a player name');
      return;
    }
  
    setLoading(true);
  
    try {
      // Fetch player ID based on the entered player name
      const playerIdResponse = await fetch(`https://www.balldontlie.io/api/v1/players?search=${playerName}`);
      const playerIdData = await playerIdResponse.json();
  
      // Assuming you want the first player found, you can adjust this logic based on your requirements
      const playerId = playerIdData.data[0].id;
  
      // Define the season (for example, 2018) and player_ids array
      const season = 2022;
      const playerIds = [playerId];
  
      // Fetch player season averages using the season and player_ids parameters
      const response = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${playerIds.join('&player_ids[]=')}`);
  
      if (response.ok) {
        const data = await response.json();
        if (data.data.length > 0) {
          setPlayerStats(data.data[0]); // Assuming you want stats for the latest season
        } else {
          console.error('Player stats not available for the selected player in the specified season.');
        }
      } else {
        console.error('Failed to fetch player stats');
      }
    } catch (error) {
      console.error('Error fetching player stats:', error);
    }
  
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>NBA Player Stats</h1>
      <input
        type="text"
        placeholder="Enter player's name"
        value={playerName}
        onChange={handleInputChange}
      />
      <button onClick={fetchPlayerStats}>Get Stats</button>

      {loading && <p>Loading...</p>}

      {playerStats && (
        <div>
          <h2>{playerStats.name}</h2>
          <p>Season: {playerStats.season}</p>
          <p>Games Played: {playerStats.games_played}</p>
          <p>Points Per Game: {playerStats.pts}</p>
          <p>Assists Per Game: {playerStats.ast}</p>
          <p>Rebounds Per Game: {playerStats.reb}</p>
          <p>Steals Per Game: {playerStats.stl}</p>
          <p>Blocks Per Game: {playerStats.blk}</p>
          <p>Turnover Per Game: {playerStats.turnover}</p>
        </div>
      )}
    </div>
  );
};

export default App;