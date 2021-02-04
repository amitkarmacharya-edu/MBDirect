import React from "react";
function Main() {
    
    return (
            <main className="container-md">
                <div className="row">
                    <BusinessCategory header={"Top 10 business"} bList={""} />
                </div>
                {/* meeting room */}
                { state.meetingStarted === true && <MeetingRoom />}
            </main>
    );
}
export default Main;