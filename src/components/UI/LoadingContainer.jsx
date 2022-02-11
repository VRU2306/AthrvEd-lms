import React from "react";
import LoadingScreenSmall from "./LoadingScreenSmall";

function LoadingContainer({ isLoading, children }) {
  if (isLoading) return <LoadingScreenSmall />;
  else return <>{children}</>;
}

export default LoadingContainer;
