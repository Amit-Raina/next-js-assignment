import { useState } from "react";
import { myState, mySetState } from "../stateContext/stateContext";

import "../styles/globals.css";
import "../styles/studentInfoEntry.css";
import "../styles/studentInfoDisplay.css";

import "../components/StundentDataTile/index.css";

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    studentData: [
      {
        name: "Sahil",
        registrationNo: 212341,
        cgpa: 7.6,
      },
    ],
    updateStudentDataRegNo: null,
  });

  return (
    <myState.Provider value={state}>
      <mySetState.Provider value={setState}>
        <Component {...pageProps} />
      </mySetState.Provider>
    </myState.Provider>
  );
}

export default MyApp;
