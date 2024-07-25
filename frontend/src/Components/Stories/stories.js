import React from 'react';
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

export default function Stories(props) {
    const [width, setWidth] = useState(window.innerWidth);

    function handleResize() {
        setWidth(window.innerWidth);
    }

    const PrevArrow = ({ currentSlide, slideCount, ...arrowProps }) => (
        <ArrowBackIosIcon {...arrowProps} />
    );

    const NextArrow = ({ currentSlide, slideCount, ...arrowProps }) => (
        <ArrowForwardIosIcon {...arrowProps} />
    );

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: width < 400 ? 4 : width < 768 ? 5 : 7,
        slidesToScroll: width < 400 ? 3 : width < 768 ? 4 : 5,
        autoplay: false,
        prevArrow: width < 770 ? <></> : <PrevArrow />,
        nextArrow: width < 770 ? <></> : <NextArrow />
    };

    return (
        <StoriesContainer>
            <StyledSlider {...settings}>
                <UserStory>
                    <img
                        src="https://energies2050.org/wp-content/uploads/2017/01/beweship-contact-placeholder.jpg"
                        alt="user"
                    />
                    <p>Add Story</p>
                </UserStory>
                <UserStory>
                    <img
                        src="https://yt3.ggpht.com/ytc/AAUvwnjBGV2TTTvmiz8eMaDJicjn6RlwmMeGIwbo6KNpcg=s900-c-k-c0x00ffffff-no-rj"
                        alt="user"
                    />
                    <p>BeerBiceps</p>
                </UserStory>
                <UserStory>
                    <img
                        src="https://energies2050.org/wp-content/uploads/2017/01/beweship-contact-placeholder.jpg"
                        alt="user"
                    />
                    <p>Dummy User</p>
                </UserStory>
            </StyledSlider>
        </StoriesContainer>
    )
}

const StoriesContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  padding: 0 20px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 0 40px;
  }
`;

const StyledSlider = styled(Slider)`
  border: 2px solid hsl(147, 7%, 75%);
  border-radius: 4px;
  padding: 10px 0;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  svg {
    color: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const UserStory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  margin: 0 5px; /* Reduced margin to decrease space between images */

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid #8134af;
  }

  p {
    margin-top: 5px; /* Space between the image and the text */
    margin-left: -156px
  }
`;
