import anime from 'animejs';
import { soundSet1 } from './sounds/sound_set_1';
import Howler from './howler.min.js';

const Start = (ctx, canvas) => {

  let numOfCircles = 25;
  let distance = 300;
  let actions = [];
  let sound;

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

  const drawRipple = (x, y) => {
    //Choose a random colorset
    let colorSet = ["#f8ffe5", "#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D"];
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
    let colorSet = ["#f8ffe5", "#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D"];
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

  const animateRipple = (ripple, size) => {
    return anime({
      targets: ripple,
      radius: () => {
        return anime.random(fontSize() * size, fontSize() * (size + 2));
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

    //Animate ripples
    let ripple1Animation = animateRipple(ripple1, 5);
    let ripple2Animation = animateRipple(ripple2, 7);
    let ripple3Animation = animateRipple(ripple3, 9);

    actions.push(circleAnimation);
    actions.push(ripple1Animation);
    actions.push(ripple2Animation);
    actions.push(ripple3Animation);
  };

  const removeContainer = () => {
    $('#title').removeClass('bounceIn');
    $('#description').removeClass('bounceIn');
  };

  const pulseContainer = () => {
    $('#title').addClass('bounceIn');
    $('#description').addClass('bounceIn');
    setTimeout(
      removeContainer
      , 300);
  };

  const removeLogo = () => {
    $('#logo').removeClass('bounceIn');
  };

  const pulseLogo = () => {
    $('#logo').addClass('bounceIn');

    let el = $('#logo');
    let offset = el.offset();

    animateCircles(offset.left, offset.top);
    const animate = anime({
      duration: 1000,
      update: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        actions.forEach((action) => {
          action.animatables.forEach((animatable) => {
            animatable.target.draw();
          });
        });
      }
    });

    sound = new Howl({
      src: soundSet1[65]
    });
    sound.play();

    setTimeout(
      removeLogo
      , 300);
  };

  setTimeout(pulseContainer, 800);
  setTimeout(pulseLogo, 1000);

};

export default Start;
