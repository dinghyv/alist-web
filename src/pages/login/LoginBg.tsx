import { Box } from "@hope-ui/solid"

const LoginBg = () => {
  return (
    <Box
      bgImage="url('https://images-cdn.vyhd.xyz/lsky-pro/2025/02/13/67ad924c66986.webp')" // 替换为你的自定义图片路径
      bgSize="cover"
      bgPosition="center"
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