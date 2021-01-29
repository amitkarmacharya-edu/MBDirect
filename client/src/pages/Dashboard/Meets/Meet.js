import React, { useState, useEffect} from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Container from "../../../components/Container";






function Meet() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  

  useEffect(() => {
   
  }, [])

 
  return (
    <>
      <Navbar sidebar={sidebar} isActive={showSidebar} />
      <Container
        sidebar={sidebar}
        isActive={showSidebar}
        style={{ marginTop: 30 }}
      >
      <div className="meets">
        <h1>Meets</h1>
      </div>
      </Container>
    </>
  );
}

export {Meet};
