import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { myState, mySetState } from "../../stateContext/stateContext";

export default function StudentInfoEntry() {
  const [name, setName] = useState(" ");
  const [registrationNo, setRegistrationNo] = useState(0);
  const [cgpa, setCgpa] = useState(0);

  const state = useContext(myState);
  const setState = useContext(mySetState);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addStudentData = () => {
    setState({
      ...state,
      studentData: [
        ...state.studentData,
        { name: name, registrationNo: registrationNo, cgpa: cgpa },
      ],
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
            onChange={(e) => setCgpa(e.target.value)}
          />
          {errors.cgpa && <p>{errors.cgpa.message}</p>}
          <input type="submit" value="Add" className="addButton" />
        </form>
      </div>
    </div>
  );
}
