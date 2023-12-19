import styled from "styled-components";
import errorImg from "../images/error404.png";
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
`;
const ErrorPage = styled.img`
    width: 800px;
    height: 600px;
    display: block;
`;

function NotFound() {
    return (
        <>
            <Helmet>
                <title>ERROR!</title>
            </Helmet>
            <Wrapper>
                <ErrorPage
                    src={errorImg}
                    alt="404_ERROR"
                />
            </Wrapper>
        </>
    );
}

export default NotFound;
