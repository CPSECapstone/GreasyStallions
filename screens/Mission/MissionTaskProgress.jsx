import React, { useState, useEffect } from 'react';

import { useQuery} from '@apollo/client';
import { Typography, Paper, Grid } from '@material-ui/core';
import { MISSION_TASKS, TASK_PROGRESS } from './MissionQueries'

let MissionTaskProgress = ({ id }) => {
   const {data, error, loading} = useQuery(MISSION_TASKS, 
      {
         variables: {
            missionID: id
         }
      });
   console.log(id)
   if (loading) {
      return <div>Loading...</div>
   }
   if (error) {
      return <div>error...</div>
   }
   console.log(data)
   return (
      <div>DATA</div>
   )
}

export default MissionTaskProgress;

