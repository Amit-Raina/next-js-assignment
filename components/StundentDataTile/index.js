import { useContext } from "react";
import { useRouter } from "next/router";

import { myState, mySetState } from "../../stateContext/stateContext";

export default function StundentDataTile({
  name,
  registrationNo,
  cgpa,
  editButtonLable = "",
  deleteButtonLable = "",
}) {
  const state = useContext(myState);
  const setState = useContext(mySetState);
  const router = useRouter();
  const isAllowed = editButtonLable === "";

  const updateStudentData = () => {
    if (isAllowed) {
      setState({ ...state, updateStudentDataRegNo: registrationNo });
      router.push("/update");
    }
  };
  const deleteStudentData = () => {
    const newStudentData = state.studentData.filter((studentRecord) => {
      if (studentRecord.registrationNo !== registrationNo) return studentRecord;
    });
    setState({ ...state, studentData: newStudentData });
  };

  return (
    <div className="dataWrapper">
      <div className="credintailWrapper">
        <div className="field">{name}</div>
        <div className="divider">|</div>
        <div className="field">{registrationNo}</div>
        <div className="divider">|</div>
        <div className="field">{cgpa}</div>
      </div>
      <div className="buttonContainer">
        <div className="button" onClick={updateStudentData}>
          {editButtonLable || "Edit"}
        </div>
        <div className="button" onClick={deleteStudentData}>
          {deleteButtonLable || "Delete"}
        </div>
      </div>
    </div>
  );
}
