import { createResource } from "solid-js"
import { Markdown, MaybeLoading } from "~/components"
import { useT, useManageTitle } from "~/hooks"

const fetchReadme = async () =>
  await (
    await fetch("https://gh-proxy.com/raw.githubusercontent.com/dinghy421/articles/refs/heads/main/gtaol-updates/213.md")
  ).text()

const About = () => {
  const t = useT()
  useManageTitle("article.sidemenu.test10")
  const [readme] = createResource(fetchReadme)
  return (
    <MaybeLoading loading={readme.loading}>
      <Markdown children={readme()} />
    </MaybeLoading>
  )
}

export default About
