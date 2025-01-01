// import styled from "styled-components";
// // GLOBAL CUSTOM COMPONENTS
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import NextImage from "@component/NextImage";
// import Typography from "@component/Typography";

// // STYLED COMPONENT
// const StyledImage = styled(NextImage)`
//   border-radius: 5px;
//   object-fit: cover;
// `;

// // ==============================================================
// type MobileCategoryImageBoxProps = {
//   icon?: string;
//   title: string;
//   imgUrl?: string;
// };
// // ==============================================================

// export default function MobileCategoryImageBox({
//   icon,
//   title,
//   imgUrl
// }: MobileCategoryImageBoxProps) {
//   return (
//     <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
//       {imgUrl ? (
//         <StyledImage src={imgUrl} width={69} height={60} alt="bonik" />
//       ) : (
//         icon && <Icon size="48px">{icon}</Icon>
//       )}

//       <Typography
//         className="ellipsis"
//         textAlign="center"
//         fontSize="11px"
//         lineHeight="1"
//         mt="0.5rem">
//         {title}
//       </Typography>
//     </FlexBox>
//   );
// }


import styled from "styled-components";
// GLOBAL CUSTOM COMPONENTS
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import NextImage from "@component/NextImage";
import Typography from "@component/Typography";
import Image from 'next/image';

// STYLED COMPONENT
const StyledImage = styled(NextImage)`
  border-radius: 5px;
  object-fit: cover;
`;

const DefaultIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 50%;
  width: 69px;
  height: 60px;
`;

// ==============================================================
type MobileCategoryImageBoxProps = {
  icon?: string;
  title: string;
  imgUrl?: string;
};
// ==============================================================

export default function MobileCategoryImageBox({
  icon,
  title,
  imgUrl
}: MobileCategoryImageBoxProps) {

  // console.log(imgUrl);
  return (
    <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
      {/* {imgUrl ? (
        <StyledImage src={imgUrl} width={69} height={60} alt="bonik" />
      ) : (
        
        // icon && <Icon size="48px">{icon}</Icon>
        <DefaultIconContainer>
        <Image
          src="/icons/default-icon.png"
          width={48}
          height={48}
          alt="Default Icon"
        />
      </DefaultIconContainer>
      )} */}

      <Typography
        className="ellipsis"
        textAlign="center"
        fontSize="11px"
        lineHeight="1"
        mt="0.5rem">
        {title}
      </Typography>
    </FlexBox>
  );
}