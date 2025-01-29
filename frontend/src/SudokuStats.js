import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SudokuStats = () => {
    
    const [stats, setStats] = useState({ totalBoards: 0, solvedBoards: 0 }); // Default values
    const [showStats, setShowStats] = useState(true);

    const toggleStats = () => {
      setShowStats((prevState) => !prevState); // Toggle the state
    };

        const getStats =  async () => {
            toggleStats();
            try {
            const response = await axios.get(`http://localhost:2999/stats`);
            setStats(response.data);  
            } catch (error) {
            console.error('Error fetching Stats:', error);
            }
        }

        useEffect(() => {
            

        getStats();

        }, []); // Empty dependency array ensures this runs only once on mount;

      return (

            
            <div> 
                <button onClick={getStats}> {showStats ? "Hide Stats" : "Show Stats"}</button>
                <div className={`stats ${showStats ? "showstats" : ""}`}>
                    
                    <h2>Sudoku Stats</h2>
                    <p>Total Boards: {stats.totalBoards}</p>
                    <p>Solved Boards: {stats.solvedBoards}</p>

                </div>
           
            </div>
           

    );
}

    export default SudokuStats;