import { useEffect, useState } from "react";

const IOS_EDGE_DRAG_NAVIGATION_THRESHOLD = 25;

export const useCheckSwipeDevises = () => {
 const [isEdgeDragNavigationVar, setIsEdgeDragNavigationVar] = useState(false);

 useEffect(() => {
  let timer: ReturnType<typeof setTimeout>;
  const handleTouchStart = (e: TouchEvent) => {
   if (
    e.touches[0].pageX > IOS_EDGE_DRAG_NAVIGATION_THRESHOLD &&
    e.touches[0].pageX < window.innerWidth - IOS_EDGE_DRAG_NAVIGATION_THRESHOLD
   )
    return;

   setIsEdgeDragNavigationVar(true);
   if (timer) clearTimeout(timer);
  };
  const handleTouchEnd = () => {
   timer = setTimeout(() => setIsEdgeDragNavigationVar(false), 200);
  };

  document.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("touchend", handleTouchEnd);

  return () => {
   document.removeEventListener("touchstart", handleTouchStart);
   document.removeEventListener("touchend", handleTouchEnd);
   if (timer) clearTimeout(timer);
  };
 }, []);

 return isEdgeDragNavigationVar;
};
