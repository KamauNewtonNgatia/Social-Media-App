import React from "react";
import Header from "../Header";

const layoutStyle = {
  marginTop: "4rem",
};

function Layout({ children }) {
  return (
    <div className="Overall-header-component">
      <Header />
      <main style={layoutStyle}>{children}</main>
    </div>
  );
}

export default Layout;
