import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import DropFile from "../components/DropFile";
import { getProblemById } from "../api/problems";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import NotFound from "./NotFound";

function Submit() {
  const { id } = useParams();
  const [droppedCode, setDroppedCode] = useState<string|null>(null);
  const [pastedCode, setPastedCode] = useState<string|null>(null);
  const [problem, setProblem] = useState<ProblemInfo|null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  const handleSubmit = () => {

  };

  useEffect(() => {
    const getProblem = async () => {
      if(id && !isNaN(parseInt(id))){
        try {
          const res = await getProblemById(parseInt(id));
          setProblem(res.data);
        } catch (e) {
          if(e instanceof AxiosError && e.status == 404){
            setNotFound(true);
          }
        }
      }
    };
    getProblem();
  }, []);

  if(problem){
    return (
      <>
      <Nav/>
      <div className="w-[100vw] min-h-[calc(100vh-80px)] bg-white flex flex-col items-center py-[30px] gap-[30px]">
        <div className="h-[200px] flex flex-col items-center justify-around">
          <h3 className="text-main text-[20px] font-[400]">Submit your solution</h3>
          <h1 className="text-[45px] font-[400]">{problem.name}</h1>
          <svg width={60} height={3}>
            <rect x={0} y={0} width={60} height={3} fill="#959393"/>
          </svg>
          <div className="text-[#ABABAB] text-[15px] font-[700] text-center">
            <p>Make sure your solution is in C++</p>
            <p>You can drag and drop or paste your code</p>
          </div>
        </div>
  
        <div>
          <h3 className="text-main text-[20px] font-[300]">Drag and drop</h3>
          <div className="w-[950px] h-[165px]">
            <DropFile fileExtension=".cpp" contentSetter={setDroppedCode}/>
          </div>
        </div>
  
        <div>
          <h3 className="text-main text-[20px] font-[300]">Paste your code</h3>
          <div className="w-[950px] ">
              <textarea
                className="w-full h-[410px] p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 font-mono resize-none"
                placeholder="Paste your C++ code here"
                value={pastedCode ? pastedCode : ''}
                onChange={(e) => {setPastedCode(e.target.value)}}
              />
            </div>
        </div>
  
        <button className="w-[130px] h-[38px] bg-main text-white rounded-[5px] text-[20px]" 
          onClick={() => handleSubmit()}>Submit
        </button>
      </div>
      <Footer/>
      </>
    );
  } else {
    if(notFound){
      return <NotFound/>;
    } else {
      return <p>Loading...</p>;
    }
  }


}

export default Submit;
