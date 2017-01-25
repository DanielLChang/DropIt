import Animations from './animations';
import Start from './start';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  Start(ctx, canvas);
  Animations(ctx, canvas);

});
