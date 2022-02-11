import React from "react";
import LoadingScreenSmallPdf from "./LoadingscreenSmallPdf";

function Pdfloading({ isLoading, children }) {
    if (isLoading) return <LoadingScreenSmallPdf />;
    else return <>{children}</>;
}

export default Pdfloading;
