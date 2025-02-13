import { Center, Heading } from "@hope-ui/solid"
import { useManageTitle } from "~/hooks"

const Dashboard = () => {
  useManageTitle("article.sidemenu.dashboard")
  return (
    <Center h="$full">
      <Heading>Dashboard</Heading>
    </Center>
  )
}

export default Dashboard
