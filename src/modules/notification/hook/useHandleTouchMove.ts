import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../../core/router/RouteNames";

const routOut = RouteNames.NOTIFICATION;
const routeIn = `${RouteNames.NOTIFICATION}/${RouteNames.IN_COMING_NOTIFICATION}`;

export const useHandleTouch = () => {
  const navigate = useNavigate();
  const [touchPosition, setTouchPosition] = useState<null | { x: number; y: number }>(null);

  const touchFu = (key: "start" | "move", e: React.TouchEvent) => {
    if (key === "start") {
      const touchDown = e.touches[0].clientX;
      setTouchPosition({ x: touchDown, y: e.touches[0].clientY });
    } else {
      const touchDown = touchPosition;
      if (touchDown === null) return;

      const currentTouch = e.touches[0].clientX;
      const currentTouchY = e.touches[0].clientY;
      const diff = touchDown.x - currentTouch;

      if (touchPosition && touchPosition?.y - currentTouchY > 10) return null;

      if (diff > 20) navigate(routeIn);
      if (diff < -20) navigate(routOut);
      setTouchPosition(null);
    }
  };

  return touchFu;
};