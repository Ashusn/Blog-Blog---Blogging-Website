import { SignUpInput } from "@ashutosh__sn7/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../config"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate=useNavigate();
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    name: "",
    username: "",
    password: "",
  });

  const sendRequest=async ()=>{
   
    try{
      const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs)
      console.log(response)
      const jwt=response.data.jwt;
      localStorage.setItem("token",jwt)
      navigate("/blogs")

    }catch(error){
      alert("error while signing up")
    }
  }

  const handleInputChange = (field: keyof SignUpInput, value: string) => {
    setPostInputs((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-400 mt-2 flex justify-center">
              {type === "signup"
                ? "Already Have an account?"
                : "Don't have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signup" ? "/signin" : "/signup"}
              >
                {type === "signup" ? "Sign In" : "Sign Up"}
              </Link>
            </div>
          </div>
          <div className="pt-5">
            {type==="signup"?<LabelledInput
              label="Name"
              placeholder="Ashutosh..."
              onChange={(e) => handleInputChange("name", e.target.value)}
            />:null}
            <LabelledInput
              label="Username"
              placeholder="ashu@gmail.com"
              onChange={(e) => handleInputChange("username", e.target.value)}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="123456..."
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <button
              type="button"
              onClick={sendRequest}
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold pt-4 text-black ">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
};
