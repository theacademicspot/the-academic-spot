import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {

useEffect(() => {


// Disable Ctrl + P

const handleKeyDown = (e) => {

  if (
    e.ctrlKey &&
    e.key.toLowerCase() === "p"
  ) {
    e.preventDefault();
    alert("Printing is disabled");
  }

  // Disable Ctrl + S

  if (
    e.ctrlKey &&
    e.key.toLowerCase() === "s"
  ) {
    e.preventDefault();
    alert("Saving is disabled");
  }

};

// Disable Right Click

const handleContextMenu = (e) => {
  e.preventDefault();
};

window.addEventListener(
  "keydown",
  handleKeyDown
);

document.addEventListener(
  "contextmenu",
  handleContextMenu
);

return () => {

  window.removeEventListener(
    "keydown",
    handleKeyDown
  );

  document.removeEventListener(
    "contextmenu",
    handleContextMenu
  );

};


}, []);

return <AppRoutes />;

}

export default App;
