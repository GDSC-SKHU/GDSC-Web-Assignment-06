import { useRouter } from "next/router";
import Usage from "../components/Usage";
import styled from "styled-components";

export default function Home() {
  const router = useRouter();

  const Todo = () => {
    router.push({
      pathname: "/todo",
    });
  };

  return (
    <>
      <StyledH1>When we use Todo?</StyledH1>
      <StyledWrpper>
        <UsageWrpper>
          <Usage id={1} content="일정을 등록하고 싶을 때" imgSrc="/일정.png" />
        </UsageWrpper>
        <UsageWrpper>
          <Usage id={2} content="계획적인 생활을 꿈꿀 때" imgSrc="/계획.png" />
        </UsageWrpper>
        <UsageWrpper>
          <Usage id={3} content="할 일을 기억하고 싶을 때" imgSrc="/기억.png" />
        </UsageWrpper>
        <UsageWrpper>
          <Usage
            id={4}
            content="보다 체계적으로 리스트를 작성하고 싶을 때"
            imgSrc="/체계.jpeg"
          />
        </UsageWrpper>
      </StyledWrpper>
      <BtnBox>
        <StyledBtn onClick={Todo}>사용해보기</StyledBtn>
      </BtnBox>
    </>
  );
}

// 4개의 이미지들을 윈도우창처럼 배열하고 싶은데 어떻게 할 수 있나욤 

const StyledH1 = styled.h1`
  margin-top: 5rem;
  text-align: center;
`;

const StyledWrpper = styled.div`
  margin: 4rem 0;
  gap: 5rem;
  display: flex;
  justify-content: center;
`;

const UsageWrpper = styled.div`
  width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 20px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledBtn = styled.button`
  padding: 0.6em 1.5em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing-button-85 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  @keyframes glowing-button-85 {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #222;
    left: 0;
    top: 0;
    border-radius: 10px;
  }
`;
