import anime from 'animejs';
import Howler from './howler';

const Animations = (ctx, canvas) => {

  debugger;

  //Set default state;
  let typing = false;
  let canvasWidth, canvasHeight;
  let numOfCircles = 20;

  let colorSets = [
    ["#84dccf", "#a6d9f7", "#bccce0", "#bf98a0"],
    ["#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D"],
    ["#5B618A", "#9EADC8", "#B9E28C", "#D6D84F"],
    ["#daffef", "#d0ffd6", "#d5e2bc", "#d3c0d2"],
    ["#f6e8ea", "#ef626c", "#acbed8", "#84dccf"]
  ];

  const drawRipple = (x, y) => {
    let ripple = {};
    ripple.x = x;
    ripple.y = y;
    ripple.color = '#78c8e8';
    ripple.radius = 0;
    ripple.alpha = 1;
    ripple.lineWidth = 5;

    ripple.draw = function() {
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 2 * Math.PI, false);
      ctx.lineWidth = ripple.lineWidth;
      ctx.strokeStyle = ripple.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    return ripple;
  };

  const drawCircle = (x, y) => {
    //Choose a random colorset
    let colorSet = colorSets[anime.random(0, colorSets.length - 1)];
    let circle = {};
    circle.x = x;
    circle.y = y;
    circle.color = colorSet[anime.random(0, colorSet.length - 1)];
    circle.radius = 12;

    circle.draw = function() {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 2 * Math.PI, false);
      ctx.fillStyle = circle.color;
      ctx.fill();
    };

    return circle;
  };

  const drawCircles = (x, y) => {
    let actions = [];
    for (let i = 0; i < 20; i++) {
      let action = drawCircle(x, y);
      actions.push(action);
    }
    return actions;
  };


};

export default Animations;
