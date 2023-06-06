import "./App.css";
import axios from "axios";

axios
  .get("http://127.0.0.1:8000")
  .then((response) => {
    console.log("Test");
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

function App() {
  return (
    <div>
      <h2>FRUIT CLASSIFIER</h2>
      <button>UPLOAD IMAGE</button>
    </div>
  );
}

export default App;
