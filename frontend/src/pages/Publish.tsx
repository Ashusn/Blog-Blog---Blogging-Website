import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const navigate=useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
          />
          <TextEditor
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button
            onClick={async () => {
              const response=await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content:description,
              },{
                headers:{
                  Authorization:"Bearer "+localStorage.getItem("token")
                }
              });
              navigate(`/blog/${response.data.id}`)
            }}
            type="submit"
            className=" inline-flex items-center px-2.5 py-2.5 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-blue-200 "
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

const TextEditor = ({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className="mt-4">
      <div className="w-full mb-4  ">
        <div className="flex items-center justify-between  ">
          <div className=" py-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={8}
              className="pl-2 pt-2 rounded-lg block w-full px-0 text-sm text-gray-800 bg-gray-50 border border-gray-300  "
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};