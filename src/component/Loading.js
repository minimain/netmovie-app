import React from 'react'
import styled from 'styled-components';

function Loading() {
  return (
    <Loadingdiv>
      <LoadingP>
      NETMINI
      <Loadingspan>
        MOVIE
      </Loadingspan>
      </LoadingP>
    </Loadingdiv>
  )
}

const Loadingdiv = styled.div`
width:100%;
height:100vh;
bakcground: #000;
color:#fff;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;

// font-size: 70px;
// font-weight: bold;
// color: $main-color;
// text-shadow: 5px 4px 2px #d9d9d9;
//margin-top: 300px;

`;
const LoadingP = styled.p`
margin: 0 auto;
text-align: center;
font-size: 70px;
margin-bottom: 100px;
text-shadow: 5px 4px 2px #501313;
color:#c30000;
font-weight: bold;
animation: ani1 1s ease-out 0s infinite;
}
@keyframes ani1 {
  0%{margin-bottom: 100px;}
  35%{margin-bottom: 150px;}
}
`;
const Loadingspan = styled.span`
display:block;
`;

export default Loading