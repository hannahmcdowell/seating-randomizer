import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Card = props => {

  const list = props.members.map((member, index) => {
    return (
      <li key={'group' + index}>{member}</li>
    );
  });

  return (
    <div>
      <div>Group: {props.number}</div>
      <div>Group members:</div>
      <ul>
        {list}
      </ul>
    </div>
  )
}

export default Card;