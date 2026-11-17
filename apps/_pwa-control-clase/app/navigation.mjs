export function swipeDirection(start,end){
  const dx=end.x-start.x,dy=end.y-start.y;
  if(Math.abs(dx)<65||Math.abs(dx)<Math.abs(dy)*1.5)return 0;
  return dx<0?1:-1;
}
