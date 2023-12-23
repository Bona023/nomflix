import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { IMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utilities";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useWindowDimensions from "../useWindowDimension";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    background-color: black;
    padding-bottom: 400px;
`;
const Loader = styled.div`
    height: 20vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Banner = styled.div<{ $bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)), url(${(props) => props.$bgPhoto});
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
    text-wrap: balance;
`;
const Slider = styled.div`
    position: relative;
    top: -150px;
`;
const Row = styled(motion.div)`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    position: absolute;
`;
const Movie = styled(motion.div)<{ $bgPhoto: string }>`
    height: 180px;
    background-image: url(${(props) => props.$bgPhoto});
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;
const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    h4 {
        text-align: center;
        font-size: 16px;
    }
`;
const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
`;
const BigMovie = styled(motion.div)`
    position: fixed;
    width: 35vw;
    height: 80vh;
    background-color: ${(props) => props.theme.black.lighter};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
    overflow: hidden;
`;
const BigCover = styled.div`
    width: 100%;
    height: 350px;
    background-size: cover;
    background-position: center center;
`;
const BigTitle = styled.h2`
    color: ${(props) => props.theme.white.lighter};
    font-size: 24px;
    font-weight: 600;
    padding-left: 20px;
    position: relative;
    top: -60px;
`;
const BigOverview = styled.p`
    width: 100%;
    padding: 20px;
    font-size: 16px;
    text-wrap: balance;
    color: ${(props) => props.theme.white.lighter};
    position: relative;
    top: -60px;
`;
// variants
const offset = 6;
const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -30,
        transition: {
            delay: 0.5,
            duration: 0.3,
            type: "tween",
        },
    },
};
const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.3,
            type: "tween",
        },
    },
};

function Home() {
    const movieMatch: PathMatch<string> | null = useMatch("movies/:movieId");
    const navigate = useNavigate();
    const { data, isLoading } = useQuery<IMoviesResult>(["movies", "nowPlaying"], getMovies);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const windowDimensions = useWindowDimensions();
    const onMovieClick = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };
    const onOverlayClick = () => {
        navigate("/");
    };
    const clickedMovie = movieMatch?.params.movieId && data?.results.find((movie) => String(movie.id) === movieMatch.params.movieId);
    console.log(clickedMovie);
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
                        <Banner
                            onClick={increaseIndex}
                            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
                        >
                            <Title>{data?.results[0].title}</Title>
                            <Overview>{data?.results[0].overview}</Overview>
                        </Banner>
                        <Slider>
                            <AnimatePresence
                                initial={false}
                                onExitComplete={toggleLeaving}
                            >
                                <Row
                                    initial={{ x: windowDimensions + 5 }}
                                    animate={{ x: 0 }}
                                    exit={{ x: -windowDimensions - 5 }}
                                    transition={{ type: "tween", duration: 1 }}
                                    key={index}
                                >
                                    {data?.results
                                        .slice(1)
                                        .slice(offset * index, offset * index + offset)
                                        .map((movie) => (
                                            <Movie
                                                layoutId={movie.id + ""}
                                                onClick={() => onMovieClick(movie.id)}
                                                variants={boxVariants}
                                                initial="normal"
                                                whileHover="hover"
                                                transition={{ type: "tween" }}
                                                key={movie.id}
                                                $bgPhoto={makeImagePath(movie.backdrop_path || movie.poster_path, "w500")}
                                            >
                                                <Info variants={infoVariants}>
                                                    <h4>{movie.title}</h4>
                                                </Info>
                                            </Movie>
                                        ))}
                                </Row>
                            </AnimatePresence>
                        </Slider>
                        <AnimatePresence>
                            {movieMatch ? (
                                <>
                                    <Overlay
                                        onClick={onOverlayClick}
                                        animate={{ opacity: 1 }}
                                    />
                                    <BigMovie layoutId={movieMatch.params.movieId}>
                                        {clickedMovie && (
                                            <>
                                                <BigCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path, "w500")})` }} />
                                                <BigTitle>{clickedMovie.title}</BigTitle>
                                                <BigOverview>{clickedMovie.overview}</BigOverview>
                                            </>
                                        )}
                                    </BigMovie>
                                </>
                            ) : null}
                        </AnimatePresence>
                    </>
                )}
            </Wrapper>
        </>
    );
}

export default Home;
