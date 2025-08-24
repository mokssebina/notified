import { styled } from "goober";
import { keyframes } from 'goober';


export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(10px); }
`;

export const FadeWrapper = styled("div")`
opacity: ${(props) => (props.visible ? 1 : 0)};
animation: ${(props) => (props.visible ? fadeIn : fadeOut)} 0.3s ease forwards;
transition: opacity 0.3s ease;
position: fixed;
width: ${(props) => props.device === 'Mobile' ? '90%' : props.device === 'Tablet' ? '420px' : '420px'};
top: ${(props) => props.position === 'top' && '64px'};
bottom: ${(props) => props.position === 'bottom' && '24px'};
left: 50%;
transform: translateX(-50%);
z-index: 50;
`;


export default FadeWrapper