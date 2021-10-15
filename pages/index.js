import { useContext } from "react";
import { useRouter } from "next/router";

import { myState } from "../stateContext/stateContext";

import StundentDataTile from "../components/StundentDataTile";

export default function StudentInfoDisplay() {
  const state = useContext(myState);
  const router = useRouter();

  return (
    <div className="parent">
      <div className="tableWrapper">
        <div
          className="addButton addNewButton"
          onClick={() => router.push("/add")}
        >
          Add New
        </div>
        <StundentDataTile
          name="Student Name"
          registrationNo="Reg No"
          cgpa="Cgpa"
          editButtonLable="#"
          deleteButtonLable="#"
        />
        {state.studentData.map(({ name, registrationNo, cgpa }) => (
          <StundentDataTile
            key={registrationNo}
            name={name}
            registrationNo={registrationNo}
            cgpa={cgpa}
          />
        ))}
        {state.studentData.length === 0 && (
          <span className="alertMsg">No record available !</span>
        )}
      </div>
    </div>
  );
}
