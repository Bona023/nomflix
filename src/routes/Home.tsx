import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { IMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { useState } from "react";
import { makeImagePath } from "../utilities";
import { motion } from "framer-motion";

const Wrapper = styled.div`
    background-color: black;
`;
const Loader = styled.div`
    height: 20vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
    background-size: cover;
`;
const Title = styled.h2`
    font-size: 64px;
    margin-bottom: 20px;
    text-shadow: 6px 6px 10px rgba(0, 0, 0, 0.8);
`;
const Overview = styled.p`
    font-size: 26px;
    width: 50%;
`;
const Slider = styled(motion.div)``;
const Row = styled(motion.div)``;

function Home() {
    const { data, isLoading } = useQuery<IMoviesResult>(["movies", "nowPlaying"], getMovies);
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Wrapper>
                {isLoading ? (
                    <Loader>Loading...</Loader>
                ) : (
                    <>
                        <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                            <Title>{data?.results[0].title}</Title>
                            <Overview>{data?.results[0].overview}</Overview>
                        </Banner>
                    </>
                )}
            </Wrapper>
        </>
    );
}

export default Home;
