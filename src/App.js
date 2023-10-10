import React, { useState } from 'react';
import './App.css';
import PlayerStatsTable from './PlayerStatsTable';
import logo from './assets/basketball.png';

const App = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedRows, setSavedRows] = useState([]);

  const handleSaveRow = (row) => {
    setSavedRows([...savedRows, row]);
  };

  const handleInputChange = (event) => {
    setPlayerName(event.target.value);
  };
  
  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchPlayerStats();
    }
  };

  // Dropdown Menu 
  const [selectedYear, setSelectedYear] = useState(2022); 

  const handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value, 10);
    setSelectedYear(selectedYear);
  };

  // Player Data 
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

      // Fetch player details using the player ID
      const playerDetailsResponse = await fetch(`https://www.balldontlie.io/api/v1/players/${playerId}`);
      const playerDetailsData = await playerDetailsResponse.json();

      console.log('Player Details Data:', playerDetailsData); // Log player details data

      // Get first name, last name, and team abbreviation from the playerDetailsData
      const { first_name, last_name } = playerDetailsData;
      const teamAbbreviation = playerDetailsData.team.abbreviation;

      // Define the season and player_ids array
      const season = selectedYear;;
      const playerIds = [playerId];

      // Fetch player season averages using the season and player_ids parameters
      const response = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${playerIds.join('&player_ids[]=')}`);

      if (response.ok) {
        const data = await response.json();
        console.log('Player Stats Data:', data.data); // Log the player stats data array
        if (data.data.length > 0) {
          const playerStatsData = data.data[0];
          setPlayerStats({ ...playerStatsData, firstName: first_name, lastName: last_name, teamAbbreviation });
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
    <div className='background-container'>
      <div className="App">
        <nav className="navbar">
          <div className="left-side">
            <img src={logo} alt="Logo" className="logo" />
            <span className="website-name">NBA Fantasy Helper</span>
          </div>
        </nav>
        <div className='nba-helper-box'>
          <h1 style={{ fontSize: '75px' }}>NBA Fantasy Helper</h1>
          <input
            className='input'
            type="text"
            placeholder="Enter player's name"
            value={playerName}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />

          <select className='dropdown' onChange={handleYearChange} value={selectedYear}>
            {Array.from({ length: 13 }, (_, index) => 2010 + index).map((startYear) => {
              const endYear = startYear + 1;
              const academicYear = `${startYear}-${endYear}`;
              return (
                <option key={academicYear} value={startYear}>
                  {academicYear}
                </option>
              );
            })}
          </select>

          <button className='button nba-button' onClick={fetchPlayerStats}>Get Stats</button>

          {loading && <p>Loading...</p>}

          {playerStats && (<PlayerStatsTable playerName={playerName} playerStats={playerStats} onSave={handleSaveRow} />
          )}

        </div>



      </div>
    </div>
  );
};

export default App;