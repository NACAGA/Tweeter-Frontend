import { NavigateFunction } from "react-router-dom";
import { useEffect } from "react";

export function VerifySessionTokenOrRedirect(
    navigate: NavigateFunction,
    setIsVerified: React.Dispatch<React.SetStateAction<boolean>>
) {
    useEffect(() => {
        let sessionToken = sessionStorage.getItem("sessionToken");

        if (sessionToken == null) {
            navigate("/login");
            return;
        }

        //Verify here
        setIsVerified(true);
    }, []);
}
