import Link from "next/link";
import styled from "styled-components";

interface Props {
  id: number;
  content: string;
  imgSrc: string;
  // 번호, 투두 쓰이는 경우
}

const Usage = ({ id, content, imgSrc }: Props) => {
  return (
    <>
      <StyledImgWrapper>
        <Link href="/todo">
          <StyledImg src={imgSrc} alt={content} />
        </Link>
      </StyledImgWrapper>
      <span>
        {id}.{content}
      </span>
    </>
  );
};

export default Usage;

const StyledImgWrapper = styled.div`
  width: 100%;
  height: 20rem;
  overflow: hidden;
  border-radius: 5%;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
