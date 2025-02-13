import { Box } from "@hope-ui/solid"
import CornerBottom from "./CornerBottom"
import CornerTop from "./CornerTop"

const LoginBg = () => {
  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      overflow="hidden"
      zIndex="-1"
      w="100vw"
      h="100vh"
      style={{
        backgroundImage: "url('https://images-cdn.vyhd.xyz/lsky-pro/2025/02/13/67ad924c66986.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        pos="absolute"
        right={{
          "@initial": "-100px",
          "@sm": "-300px",
        }}
        top={{
          "@initial": "-1170px",
          "@sm": "-900px",
        }}
      >
        <CornerTop />
      </Box>
      <Box
        pos="absolute"
        left={{
          "@initial": "-100px",
          "@sm": "-200px",
        }}
        bottom={{
          "@initial": "-760px",
          "@sm": "-400px",
        }}
      >
        <CornerBottom />
      </Box>
    </Box>
  )
}

export default LoginBg