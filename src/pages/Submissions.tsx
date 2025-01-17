import { useState } from "react";
import Nav from "../components/Nav";
import SubmissionsTable from "../components/SubmissionsTable";
import Footer from "../components/Footer";
import SecondLevelMenu from "../components/SecondLevelMenu";

function Submissions(){
  const[filter, setFilter] = useState<"all" | "accepted" | "failed">("all"); //according to this fetch data with useEffect

  return(
    <>
      <div className="">
        <Nav logged={false} role="guest"/>
        <div className="h-[100px] w-[100vw] bg-white text-center align-middle pt-[10px]">
          <h1 className="font-[500] text-[30px] leading-[100px]">User Submissions</h1>
        </div>

        <div className="w-[100vw]">
          <SecondLevelMenu options={["all", "accepted", "failed"]} labels={["All", "Accepted", "Failed"]} selected={filter} select={setFilter}/>
        </div>
        
      </div>

      <div className="flex flex-col  items-center  bg-[#D9D9D9] py-[30px] w-[100vw] min-h-[calc(100vh-260px)]">
            <SubmissionsTable/>
      </div>

      <Footer/>
    </>

  );
}

export default Submissions;