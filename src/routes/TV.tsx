import { Helmet } from "react-helmet";

function Tv() {
    return (
        <>
            <Helmet>
                <title>TV Show</title>
            </Helmet>
            <div style={{ backgroundColor: "black", height: "200vh" }}>
                <h1 style={{ color: "white", marginTop: "80px" }}>TV SHOW</h1>
            </div>
        </>
    );
}

export default Tv;
