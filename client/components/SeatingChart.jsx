import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Card from './Card';

// function to randomize elements in an array
// output: new array with elements in a random order
const randomize = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[rand];
    array[rand] = temp;
  }
  return array;
}

// function to generate random groups of a given size
// output: an array of subarrays
// note: no singletons! group work only :)
const randomGroups = (array, size) => {
  const randomArray = randomize(array);
  
  if (size >= randomArray.length) return [randomArray];

  const groups = [];
  for (let i = 0; i < randomArray.length; i += size) {
    const group = randomArray.slice(i, i + size);
    groups.push(group);
  }

  // checks for singletons and adds them to last group
  if (groups.length > 1 && groups[groups.length - 1].length === 1) {
    groups[groups.length - 2].push(groups[groups.length - 1][0]);
    groups.pop();
  }

  return groups;
}

const SeatingChart = props => {

  const groups = randomGroups(props.classRoster, props.groupSize);
  const groupCards = groups.map((group, index) => {
    return (
      <Card 
        members={group} 
        number={index + 1} 
        key={'group' + (index + 1)} 
      />
    );
  })

  return (
    <section>
      <header>
        <h3>Period: {props.period}</h3>
        <h3>Group Size: {props.groupSize}</h3>
      </header>
      <div>
        {groupCards}
      </div>
    </section>
  )
}

export default SeatingChart;