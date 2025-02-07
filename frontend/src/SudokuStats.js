import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SudokuStats = () => {
    
    const [stats, setStats] = useState({ totalBoards: 0, solvedBoards: 0 }); // Default values
    const [showStats, setShowStats] = useState(false);

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
                 <div className={`stats ${showStats ? "showstats" : ""}`}>
                    
                    
                    <p>Total Boards: {stats.totalBoards}</p>
                    <p>Solved Boards: {stats.solvedBoards}</p>

                </div>
           
            </div>
           

    );
}

    export default SudokuStats;