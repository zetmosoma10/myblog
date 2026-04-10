import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const TopLoader = () => {
  const isLoading = useRouterState({
    select: (state) => state.isLoading,
  });

  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  return null;
};

export default TopLoader;
