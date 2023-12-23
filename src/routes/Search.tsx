import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    console.log(keyword);
    return (
        <>
            <Helmet>
                <title>Search</title>
            </Helmet>
        </>
    );
}

export default Search;
