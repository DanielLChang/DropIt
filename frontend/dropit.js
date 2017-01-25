import Animations from './animations';
import Start from './start';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  Start(ctx, canvas);
  Animations(ctx, canvas);

  const modal = document.getElementById('myModal');

  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    $('#myModal').addClass('fadeOut');
  });

  window.onclick = (e) => {
    e.preventDefault();
    if (e.target === modal)  {
      $('#myModal').addClass('fadeOut');
    }
  };

});
