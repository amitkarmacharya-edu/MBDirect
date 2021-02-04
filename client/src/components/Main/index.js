import React from "react";
import BusinessCategory from "../BusinessCategory";
function Main() {
    const [state, dispatch] = useMeetingContext();
    return (
            <main className="container-md">
                <div className="row">
                <BusinessCategory header={"Top 10 business"} bList={""} />      
                </div>
                
            </main>
    );
}
export default Main;