// Loading skeleton to show while widget is being rendered
import { type FunctionComponent, useEffect, useState } from "react";
import { Skeleton } from "@mantine/core";

export interface WidgetSkeletonComponentProps {
  delay?: number;
}

export const WidgetSkeletonComponent: FunctionComponent<WidgetSkeletonComponentProps> = ({
  delay = 300,
}) => {
  const [show, setShow] = useState(false);

  // Effect for delaying the display of the skeleton (to prevent flickers)
  useEffect(() => {
    const timerRef = setTimeout(() => setShow(true), delay);
    return () => {
      clearTimeout(timerRef);
    };
  }, [delay]);

  return show && <Skeleton height="100%" />;
};
