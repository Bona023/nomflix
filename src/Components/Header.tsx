import { useState } from "react";
import { styled } from "styled-components";
import { motion, useAnimation, useMotionValueEvent, useScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// styled
const Nav = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 55px;
    position: fixed;
    top: 0;
    padding: 10px 60px 5px 60px;
    font-size: 14px;
`;
const Col = styled.div`
    display: flex;
    align-items: center;
`;
const Logo = styled(motion.svg)`
    margin-right: 20px;
    width: 100px;
    height: 30px;
    fill: ${(props) => props.theme.red};
    path {
        stroke-width: 1px;
        stroke: white;
    }
`;
const Items = styled.ul`
    display: flex;
    align-items: center;
`;
const Item = styled.li`
    margin-right: 20px;
    color: ${(props) => props.theme.white.darker};
    transition: color 0.3s ease-in-out;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.white.lighter};
    }
`;
const Search = styled.form`
    color: white;
    display: flex;
    align-items: center;
    svg {
        cursor: pointer;
        height: 25px;
    }
`;
const Circle = styled(motion.span)`
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 6px;
    height: 6px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.red};
`;
const SearchInput = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    right: 60px;
    width: 250px;
    padding: 7px 10px;
    padding-left: 40px;
    z-index: -1;
    color: white;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.white.lighter};
`;

// variants
const LogoVariants = {
    normal: {
        fillOpacity: 1,
    },
    active: {
        fillOpacity: [0, 1, 0],
        transition: {
            repeat: Infinity,
        },
    },
};
const navVariants = {
    top: { backgroundColor: "rgba(0,0,0,0)" },
    scroll: { backgroundColor: "rgba(0,0,0,1)" },
};

interface IForm {
    keyword: string;
}

function Header() {
    const navigate = useNavigate();
    const [searchOpen, setSearchOpen] = useState(false);
    const homeMatch = useMatch("/");
    const tvMatch = useMatch("/tv");
    const inputAnimation = useAnimation();
    const navAnimation = useAnimation();
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", () => {
        if (scrollY.get() > 80) {
            navAnimation.start("scroll");
        } else {
            navAnimation.start("top");
        }
    });
    const toggleSearch = () => {
        if (searchOpen) {
            inputAnimation.start({
                scaleX: 0,
            });
        } else {
            inputAnimation.start({
                scaleX: 1,
            });
        }
        setSearchOpen((prev) => !prev);
    };
    const { register, handleSubmit } = useForm<IForm>();
    const onValid = (data: IForm) => {
        navigate(`/search?keyword=${data.keyword}`);
    };
    return (
        <Nav
            variants={navVariants}
            animate={navAnimation}
            initial={"top"}
        >
            <Col>
                <Logo
                    variants={LogoVariants}
                    initial="normal"
                    whileHover="active"
                    xmlns="http://www.w3.org/2000/svg"
                    width="750"
                    height="300"
                    viewBox="0 0 198.438 79.375"
                >
                    <motion.path d="M1.062 1.954h9.194l7.128 45.4h.133v-45.4h6.529v75.848h-7.528l-8.794-55.37H7.59v55.37H1.06Zm42.943 76.931q-5.396 0-8.26-4.984-2.865-4.984-2.865-14.086V19.94q0-9.101 2.864-14.086Q38.61.87 44.005.87q5.396 0 8.261 4.984 2.865 4.985 2.865 14.086v39.875q0 9.102-2.865 14.086t-8.26 4.984zm0-10.835q3.798 0 3.798-7.477V19.182q0-7.476-3.798-7.476-3.797 0-3.797 7.476v41.391q0 7.477 3.797 7.477zm19.96-66.096h10.459l4.663 54.285h.134l4.663-54.285h10.46v75.848h-6.93V20.374h-.132l-5.33 57.428h-6.13l-5.329-57.428h-.133v57.428h-6.396Zm39.745 0h19.386v10.835h-12.058v21.13h9.46v10.835h-9.46v33.048h-7.328zm26.82 0h7.33v65.012h12.058v10.836H130.53zm26.822 0h7.328v75.848h-7.328Zm23.157 37.057-8.061-37.057h7.728l4.93 24.488h.133l5.063-24.488h6.929L189.17 39.01l8.46 38.79h-7.727l-5.33-26.438h-.133l-5.463 26.439h-6.929z" />
                </Logo>
                <Items>
                    <Link to="/">
                        <Item>Home {homeMatch && <Circle layoutId="circle" />}</Item>
                    </Link>
                    <Link to="tv">
                        <Item>TV Shows {tvMatch && <Circle layoutId="circle" />}</Item>
                    </Link>
                </Items>
            </Col>
            <Col>
                <Search onSubmit={handleSubmit(onValid)}>
                    <motion.svg
                        onClick={toggleSearch}
                        animate={{ x: searchOpen ? -215 : 0 }}
                        transition={{ type: "linear" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </motion.svg>
                    <SearchInput
                        {...register("keyword", { required: true, minLength: 2 })}
                        animate={inputAnimation}
                        initial={{ scaleX: 0 }}
                        transition={{ type: "linear" }}
                        placeholder="Search for movie or TV Show ..."
                    />
                </Search>
            </Col>
        </Nav>
    );
}
export default Header;
