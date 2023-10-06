import React, { useState } from 'react';
import './App.css';

const PlayerStatsTable = ({ playerName, playerStats }) => {
    const statsHeaders = [
        'Player',
        'Games Played',
        'Field Goal Percentage',
        'Free Throw Percentage',
        'Three Points Made',
        'Points',
        'Assists',
        'Rebounds',
        'Steals',
        'Blocks',
        'Turnover',
        'Actions'
    ];

    const [savedRows, setSavedRows] = useState([]);

    const handleSave = () => {
        const newRow = { playerName, ...playerStats };
        setSavedRows([...savedRows, newRow]);
    };

    const handleDelete = (index) => {
        const updatedRows = [...savedRows];
        updatedRows.splice(index, 1);
        setSavedRows(updatedRows);
    };

    return (
        <div className="player-stats-table">
            <table>
                <thead>
                    <tr>
                        {statsHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='row1'>{playerName}</td>
                        <td>{playerStats.games_played}</td>
                        <td>{playerStats.fg_pct}</td>
                        <td>{playerStats.ft_pct}</td>
                        <td>{playerStats.fg3m}</td>
                        <td>{playerStats.pts}</td>
                        <td>{playerStats.ast}</td>
                        <td>{playerStats.reb}</td>
                        <td>{playerStats.stl}</td>
                        <td>{playerStats.blk}</td>
                        <td>{playerStats.turnover}</td>
                        <td><button className='saveButton' onClick={handleSave}>Save</button></td>
                    </tr>
                </tbody>
            </table>

            {savedRows.length >= 1 && (
                <div>
                    <h2>Saved Players</h2>
                    <table>
                        <thead>
                            <tr>
                                {statsHeaders.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {savedRows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.playerName}</td>
                                    <td>{row.games_played}</td>
                                    <td>{row.fg_pct}</td>
                                    <td>{row.ft_pct}</td>
                                    <td>{row.fg3m}</td>
                                    <td>{row.pts}</td>
                                    <td>{row.ast}</td>
                                    <td>{row.reb}</td>
                                    <td>{row.stl}</td>
                                    <td>{row.blk}</td>
                                    <td>{row.turnover}</td>
                                    <td><button className='deleteButton' onClick={() => handleDelete(index)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PlayerStatsTable;