import React, { useState } from 'react';
import axios from 'axios';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);
  const [coordinates, setCoordinates] = useState({ x: 2, y: 2 });

  function getXY(direction) {
    let x = coordinates.x;
    let y = coordinates.y;
    switch (direction) {
      case 'left':
        x = x - 1;
        break;
      case 'up':
        y = y - 1;
        break;
      case 'right':
        x = x + 1;
        break;
      case 'down':
        y = y + 1;
        break;
      default:
        break;
    }
    return { x, y };
  }

  function getXYMessage() {
    const { x, y } = coordinates;
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    setIndex(initialIndex);
    setSteps(initialSteps);
    setEmail(initialEmail);
    setMessage(initialMessage);
    setCoordinates({ x: 2, y: 2 });
  }

  function move(evt) {
    const direction = evt.target.id;
    const { x, y } = getXY(direction);
    const nextIndex = calculateNextIndex(direction);

    if (nextIndex !== index) {
      setIndex(nextIndex);
      setSteps(steps + 1);
      setCoordinates({ x, y });
    } else {
      setMessage(`You can't go ${direction}`);
    }
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  async function onSubmit(evt) {
    evt.preventDefault();
    setMessage('');

    try {
      const { x, y } = coordinates;
      const response = await axios.post('http://localhost:9000/api/result', {
        x,
        y,
        steps,
        email,
      });
      setMessage(response.data.message);
      setEmail(initialEmail);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Ouch: an error occurred. Please try again.');
      }
    }
  }

  // Calculate the next index based on direction
  function calculateNextIndex(direction) {
    const x = index % 3;
    const y = Math.floor(index / 3);

    switch (direction) {
      case 'left':
        return x > 0 ? index - 1 : index;
      case 'up':
        return y > 0 ? index - 3 : index;
      case 'right':
        return x < 2 ? index + 1 : index;
      case 'down':
        return y < 2 ? index + 3 : index;
      default:
        return index;
    }
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">{`You moved ${steps} time${steps !== 1 ? 's' : ''}`}</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === index ? ' active' : ''}`}
            onClick={() => move(idx)}
          >
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          RESET
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="Type email"
          value={email}
          onChange={onChange}
        />
        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}