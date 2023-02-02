import { Box, Typography, styled } from "@mui/material";

const Image = styled(Box)`
  width: 100vw;
  background: url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fEJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)
    center/100% #000;
  height: 55vh;
  display: flex;
  background-repeat: no-repeat;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled(Typography)`
  font-size: 70px;
  color: #FFF;
  line-height: 1;
`;

const Subheading = styled(Typography)`
  font-size: 20px;
  background: #FFF;
`;

const Banner = () => {
  return (
    <Image>
      <Heading>BLOGPOINT</Heading>
      <Subheading>Create your own personal blog</Subheading>
    </Image>
  );
};

export default Banner;
