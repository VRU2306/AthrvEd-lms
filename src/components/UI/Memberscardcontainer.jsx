import React from "react";
import LoadingScreenSmallmembers from "./Loadingsmallmembers";

function MemberscardLoading({ isLoading, children }) {
    if (isLoading) return <LoadingScreenSmallmembers />;
    else return <>{children}</>;
}

export default MemberscardLoading;
