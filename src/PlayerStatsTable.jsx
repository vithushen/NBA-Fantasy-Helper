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

    const getGamesPlayedColorClass = (gamesPlayed) => {
        if (gamesPlayed >= 65) {
            return 'greenCell';
        } else if (gamesPlayed >= 40 && gamesPlayed < 65) {
            return 'yellowCell';
        } else {
            return 'redCell';
        }
    };

    const getThreePointsColorClass = (threePoints) => {
        if (threePoints >= 2) {
            return 'greenCell';
        } else if (threePoints >= 1 && threePoints < 2) {
            return 'yellowCell';
        } else {
            return 'redCell';
        }
    };

    const getPointsColorClass = (points) => {
        if (points >= 25) {
            return 'greenCell';
        } else if (points >= 15 && points < 25) {
            return 'yellowCell';
        } else {
            return 'redCell';
        }
    };

    const getAssitsColorClass = (assits) => {
        if (assits >= 7) {
            return 'greenCell';
        } else if (assits >= 4 && assits < 7) {
            return 'yellowCell';
        } else {
            return 'redCell';
        }
    };

    const getReboundsColorClass = (rebounds) => {
        if (rebounds >= 9) {
            return 'greenCell';
        } else if (rebounds >= 4 && rebounds < 9) {
            return 'yellowCell';
        } else {
            return 'redCell';
        }
    };

    const getStealsColorClass = (steals) => {
        if (steals >= 1.5) {
            return 'greenCell';
        } else if (steals >= 1 && steals < 1.5) {
            return 'yellowCell';
        } else {
            return 'redCell';
        }
    };

    const getBlocksColorClass = (blocks) => {
        if (blocks >= 1.5) {
            return 'greenCell';
        } else if (blocks >= 1 && blocks < 1.5) {
            return 'yellowCell';
        } else {
            return 'redCell';
        }
    };

    const getTurnoverColorClass = (to) => {
        if (to <= 2) {
            return 'greenCell';
        } else if (to > 2 && to <= 3) {
            return 'yellowCell';
        } else {
            return 'redCell';
        }
    };

    const getFGColorClass = (fg) => {
        if (fg >= 0.600) {
            return 'greenCell';
        } else if (fg >= 0.450 && fg < 0.600) {
            return 'yellowCell';
        } else {
            return 'redCell';
        }
    };

    const getFTColorClass = (ft) => {
        if (ft >= 0.900) {
            return 'greenCell';
        } else if (ft >= 0.800 && ft < 0.900) {
            return 'yellowCell';
        } else {
            return 'redCell';
        }
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
                        <td className={getGamesPlayedColorClass(playerStats.games_played)}>{playerStats.games_played}</td>
                        <td className={getFGColorClass(playerStats.fg_pct)}>{playerStats.fg_pct}</td>
                        <td className={getFTColorClass(playerStats.ft_pct)}>{playerStats.ft_pct}</td>
                        <td className={getThreePointsColorClass(playerStats.fg3m)}>{playerStats.fg3m}</td>
                        <td className={getPointsColorClass(playerStats.pts)}>{playerStats.pts}</td>
                        <td className={getAssitsColorClass(playerStats.ast)}>{playerStats.ast}</td>
                        <td className={getReboundsColorClass(playerStats.reb)}>{playerStats.reb}</td>
                        <td className={getStealsColorClass(playerStats.stl)}>{playerStats.stl}</td>
                        <td className={getBlocksColorClass(playerStats.blk)}>{playerStats.blk}</td>
                        <td className={getTurnoverColorClass(playerStats.turnover)}>{playerStats.turnover}</td>
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
                                    <td className={getGamesPlayedColorClass(row.games_played)}>{row.games_played}</td>
                                    <td className={getFGColorClass(row.fg_pct)}>{row.fg_pct}</td>
                                    <td className={getFTColorClass(row.ft_pct)}>{row.ft_pct}</td>
                                    <td className={getThreePointsColorClass(row.fg3m)}>{row.fg3m}</td>
                                    <td className={getPointsColorClass(row.pts)}>{row.pts}</td>
                                    <td className={getAssitsColorClass(row.ast)}>{row.ast}</td>
                                    <td className={getReboundsColorClass(row.reb)}>{row.reb}</td>
                                    <td className={getStealsColorClass(row.stl)}>{row.stl}</td>
                                    <td className={getBlocksColorClass(row.blk)}>{row.blk}</td>
                                    <td className={getTurnoverColorClass(row.turnover)}>{row.turnover}</td>
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