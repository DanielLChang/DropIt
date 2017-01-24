import Animations from './animations';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  const ctx = root.getContext('2d');
  ctx.root.width = window.innerWidth;
  ctx.root.height = window.innerHeight;

  Animations(ctx, root);

});
