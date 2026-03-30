import "../styles/codedash.css";
import { useEffect, useState } from "react";

function Codedashboard(){

    const [problemData, setProblemData] = useState(null);
    const [code, setCode] = useState("");
    const [review, setReview] = useState("");

    useEffect(()=>{
        fetch("http://localhost:5000/api/problem")
        .then(res=>res.json())
        .then(data=>setProblemData(data))
        .catch(err=>console.log(err));
    },[]);

    if(!problemData) return <h2>Loading.....</h2>;

    const handlesubmit = async()=>{
        try{
            const res = await fetch("http://localhost:5000/api/review",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    code,
                    problem:problemData
                })
            })

            const data = await res.json();
            setReview(data.review);
        }catch(err){
            console.log(err);
        }
    }
    return(
        <>
        
        <div className="codedash">

            <div className="problem">
                <h1>DSA Problem:</h1>
                <h2>{problemData.title}</h2>

                <h3>Problem:</h3>
                <p>{problemData.problem}</p>

                <h2>Example Input</h2>
                <textarea 
                    value={problemData.input} 
                    readOnly 
                    rows={4}
                 />

                <h2>Example Output:</h2>
                <textarea 
                    value={problemData.output} 
                    readOnly 
                    rows={4}
                />

                <h2>Constrains</h2>
                <ul>
                    {problemData.constraints?.map((c,index)=>(
                        <li key={index}>{c}</li>
                    ))}
                </ul>
            </div>

            <div className="solution">
                <textarea 
                name="codeinput" 
                id="codeinput"
                value={code}
                onChange={(e)=>setCode(e.target.value)}
                />
                <button 
                className="codes"
                onClick={handlesubmit}>Submit</button>
            </div>
        </div>

        <div className="review">
            <h2>AI Review:</h2>
            <pre>{review}</pre>
        </div>
        
        
        
        </>
    )
}

export default Codedashboard;