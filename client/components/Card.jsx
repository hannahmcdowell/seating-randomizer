import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Card = props => {
  return (
    <div>
      <div>Group: {props.number}</div>
      <div>Group members: {JSON.stringify(props.members)}</div>
    </div>
  )
}

export default Card;