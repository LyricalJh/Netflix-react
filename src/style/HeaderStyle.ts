import styled from 'styled-components'
import {motion} from 'framer-motion';

export const Nav = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 80px;
    top: 0;
    font-size: 14px;
    padding: 20px 60px;
    color: white;
    z-index: 99;
`;

export const Col = styled.div`
    display: flex;
    align-items: center;
`;

export const Logo = styled(motion.svg)`
    margin-right: 50px;
    width: 95px;
    height: 25px;
    fill: ${(props) => props.theme.red};
    path {
        stroke-width: 6px;
        stroke: white;
    }
`;

export const Items = styled.ul`
    display: flex;
    align-items: center;

`;

export const Item = styled(motion.li)`
    margin-right: 20px;
    color: ${(props) => props.theme.white.darker};
    transition: color 0.3s ease-in-out;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        color: ${(props) => props.theme.white.lighter};
    }
`;
export const Search = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: white;
  svg {
    height: 25px;
  }
`;

export const Circle = styled(motion.div)`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.red};
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    
    
`;

export const Input = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    left: -200px;
    right: 0px;
    padding: 5px 10px;
    padding-left: 40px;
    z-index: -1;
    color: white;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.white.lighter};
    
`;  
export const logoVaraints =  {
    start: {
        pathLength: 0,
        fillOpacity: 0
    },
    end: {
        pathLength: 1,
        fillOpacity:1,
        transition: {
            duration:5
        }
    }
}



export const navVariants = {
    top: {
        backgroundColor: "rgba(0, 0, 0, 0)",
      },
      scroll: {
        backgroundColor: "rgba(0, 0, 0, 1)",
      },
};
