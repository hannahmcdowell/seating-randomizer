import React from 'react';
import { Link } from 'react-router-dom';

const Card = props => {

  const list = props.members.map((member, index) => {
    return (
      <li key={'group' + index}>{member}</li>
    );
  });

  return (
    <div className="card">
      <h3 className="cardTitle">Group: {props.number}</h3>
      <ul>
        {list}
      </ul>
    </div>
  )
}

export default Card;