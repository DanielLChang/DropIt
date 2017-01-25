import anime from 'animejs';
import { Sounds } from './sounds';
import Howler from './howler.min.js';

const Animations = (ctx, canvas) => {

  //Set default state;
  let numOfCircles = 20;
  let distance = 150;
  let actions = [];

  let colorSets = [
    ["#f8ffe5", "#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D"],
    ["#5b507a", "#5B618A", "#9EADC8", "#B9E28C", "#D6D84F"],
    ["#5bc0eb", "#f9c80e", "#41ead4", "#fdfffc", "#b91372"],
    ["#f6e8ea", "#ef626c", "#de1a1a", "#acbed8", "#84dccf"]
  ];

  let fontSize = () => {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
  };

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const removeAction = (action) => {
    let idx = actions.indexOf(action);
    if (idx > -1) actions.splice(idx, 1);
  };

  const changeColorSet = () => {
    let temp = colorSets.shift();
    colorSets.push(temp);
  };

  const drawRipple = (x, y) => {
    //Choose a random colorset
    let colorSet = colorSets[0];
    let ripple = {};

    ripple.x = x;
    ripple.y = y;
    ripple.color = colorSet[anime.random(0, colorSet.length - 1)];
    ripple.radius = 0;
    ripple.alpha = 1;
    ripple.lineWidth = 5;

    ripple.draw = function() {
      ctx.globalAlpha = ripple.alpha;
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
    let colorSet = colorSets[0];
    let circle = {};
    circle.x = x;
    circle.y = y;
    circle.color = colorSet[anime.random(0, colorSet.length - 1)];
    circle.radius = anime.random(fontSize(), fontSize() * 2);

    circle.draw = function() {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 2 * Math.PI, false);
      ctx.fillStyle = circle.color;
      ctx.fill();
    };

    return circle;
  };

  const drawCircles = (x, y) => {
    let circles = [];
    for (let i = 0; i < numOfCircles; i++) {
      let circle = drawCircle(x, y);
      circles.push(circle);
    }
    return circles;
  };

  const animateCircles = (x, y) => {
    resizeCanvas();

    //Draw shapes
    let circles = drawCircles(x, y);
    let ripple1 = drawRipple(x, y);
    let ripple2 = drawRipple(x, y);
    let ripple3 = drawRipple(x, y);

    //Animate shapes
    let circleAnimation = anime({
      targets: circles,
      x: (circle) => {
        return circle.x + anime.random(-distance, distance);
      },
      y: (circle) => {
        return circle.y + anime.random(-distance, distance);
      },
      radius: 0,
      duration: () => {
        return anime.random(1000, 1300);
      },
      easing: 'easeOutExpo',
      complete: removeAction
    });

    //Animate ripple 1
    let ripple1Animation = anime({
      targets: ripple1,
      radius: () => {
        return anime.random(fontSize() * 3, fontSize() * 5);
      },
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: () => {
          return anime.random(300, 500);
        }
      },
      duration: () => {
        return anime.random(1000, 1300);
      },
      easing: 'easeOutExpo',
      complete: removeAction
    });

    //Animate ripple 2
    let ripple2Animation = anime({
      targets: ripple2,
      radius: () => {
        return anime.random(fontSize() * 5, fontSize() * 7);
      },
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: () => {
          return anime.random(300, 500);
        }
      },
      duration: () => {
        return anime.random(1000, 1300);
      },
      easing: 'easeOutExpo',
      complete: removeAction
    });

    //Animate ripple 3
    let ripple3Animation = anime({
      targets: ripple3,
      radius: () => {
        return anime.random(fontSize() * 7, fontSize() * 9);
      },
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: () => {
          return anime.random(300, 500);
        }
      },
      duration: () => {
        return anime.random(1000, 1300);
      },
      easing: 'easeOutExpo',
      complete: removeAction
    });

    actions.push(circleAnimation);
    actions.push(ripple1Animation);
    actions.push(ripple2Animation);
    actions.push(ripple3Animation);
  };

  const animate = anime({
    duration: Infinity,
    update: () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      actions.forEach((action) => {
        action.animatables.forEach((animatable) => {
          animatable.target.draw();
        });
      });
    }
  });

  //Update coordinates after animation
  let x, y;

  const updateCoords = () => {
    x = Math.random() * (canvas.width);
    y = Math.random() * (canvas.height);
  };

  document.addEventListener('keydown', (e, fake) => {
    e.preventDefault();

    //Spacebar to play/pause song
    if (e.keyCode === 32) {
      changeColorSet();
    }

    //Number and letter key to play sound
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      updateCoords();
      animateCircles(x, y);

      var sound = new Howl({
        src: Sounds[e.keyCode]
      });
      sound.play();
    }

  });

  window.addEventListener('resize', resizeCanvas);

  return {
    boom: animate
  };

};

export default Animations;
