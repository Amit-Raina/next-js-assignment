import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { myState, mySetState } from "../../stateContext/stateContext";
import { route } from "next/dist/server/router";

export default function StudentInfoEntry() {
  const state = useContext(myState);
  const setState = useContext(mySetState);
  const router = useRouter();

  const [name, setName] = useState(" ");
  const [registrationNo, setRegistrationNo] = useState(0);
  const [cgpa, setCgpa] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (state.updateStudentDataRegNo === null) router.push("/");
    else {
      let updateStudentRecord = state.studentData.filter((studentRecord) => {
        if (studentRecord.registrationNo === state.updateStudentDataRegNo)
          return studentRecord;
      });
      updateStudentRecord = updateStudentRecord[0];
      setName(updateStudentRecord.name);
      setRegistrationNo(updateStudentRecord.registrationNo);
      setCgpa(updateStudentRecord.cgpa);
    }
  }, [router, state.studentData, state.updateStudentDataRegNo]);

  const addStudentData = () => {
    const newStudentData = state.studentData.map((studentRecord) => {
      if (studentRecord.registrationNo !== state.updateStudentDataRegNo)
        return studentRecord;
      else return { name: name, registrationNo: registrationNo, cgpa: cgpa };
    });
    setState({
      ...state,
      studentData: newStudentData,
      updateStudentDataRegNo: null,
    });
    router.push("/");
  };

  return (
    <div className="parent">
      <div className="formWrapper">
        <form onSubmit={handleSubmit(addStudentData)} autoComplete="off">
          <input
            {...register("studentName", {
              required: "*Student name is required",
            })}
            type="text"
            placeholder="Student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.studentName && <p>{errors.studentName.message}</p>}
          <input
            {...register("registrationNumber", {
              required: "*Registration number is required",
              maxLength: {
                value: 6,
                message: "*Should not exceed 6 charaters",
              },
            })}
            type="number"
            placeholder="Registration number"
            value={registrationNo}
            onChange={(e) => setRegistrationNo(e.target.value)}
          />
          {errors.registrationNumber && (
            <p>{errors.registrationNumber.message}</p>
          )}
          <input
            {...register("cgpa", {
              required: " *Cgpa is required",
              max: { value: 10, message: "*Should not exceed over 10" },
            })}
            type="number"
            placeholder="Cgpa"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
          />
          {errors.cgpa && <p>{errors.cgpa.message}</p>}
          <input type="submit" value="Update" className="addButton" />
        </form>
      </div>
    </div>
  );
}
