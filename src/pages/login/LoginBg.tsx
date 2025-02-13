import { Box } from "@hope-ui/solid"

const LoginBg = () => {
  return (
    <Box
      class="login-bg"
      pos="fixed"
      top="0"
      left="0"
      overflow="hidden"
      zIndex="-1"
      w="100vw"
      h="100vh"
    />
  )
}

export default LoginBg