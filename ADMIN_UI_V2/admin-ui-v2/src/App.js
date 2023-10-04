import Directory from "./components/directory/directory.component";

import "./App.css";

export const config = {
  endpoint:
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
};

const App = () => {
  return (
    <div className="App">
      <Directory />
    </div>
  );
};

export default App;
