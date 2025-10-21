import { useState } from "react";

function PincodeFinder(){

    const [query, setQuery] = useState("");
    const [type, setType] = useState("postoffice");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setError("");
        setData(null);

        if (!query) {
            setError("Please enter a valid input!");
            return;
        }

        try {
            const url = type === "pincode" 
                            ? `https://api.postalpincode.in/pincode/${query}`
                            : `https://api.postalpincode.in/postoffice/${query}`;

            const response = await fetch(url);
            const result = await response.json();

            if (result[0].Status === "Success") {
                setData(result[0].PostOffice);
            } else{
                setError(result[0].Message);
            }

        } catch (err) {
            setError("Somthing went wrong!");
        }
    }


    return (
        <div className="container">
        <h1>📮 Postal PIN Code Finder</h1>

        <div className="form">
            <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="postoffice">Search by Branch Name / City</option>
            <option value="pincode">Search by PIN Code</option>
            </select>

            <input
            type="text"
            placeholder={
                type === "postoffice" ? "Enter Post Office / City" : "Enter PIN Code"
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <button onClick={handleSearch}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {data && (
            <div className="results">
            {data.map((office, index) => (
                <div key={index} className="card">
                <h3>{office.Name}</h3>
                <p>District: {office.District}</p>
                <p>State: {office.State}</p>
                <p>Pincode: {office.Pincode}</p>
                <p>Branch Type: {office.BranchType}</p>
                </div>
            ))}
            </div>
        )}
        </div>
    );

}
export default PincodeFinder