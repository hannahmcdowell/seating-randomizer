import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SeatingChart = props => {
  return (
    <div>
      <div>Period: {props.period}</div>
      <div>Group Size: {props.groupSize}</div>
      <div>Roster: {JSON.stringify(props.classRoster)}</div>
    </div>
  )
}

export default SeatingChart;