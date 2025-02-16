import { createResource } from "solid-js"
import { Markdown, MaybeLoading } from "~/components"
import { useT, useManageTitle } from "~/hooks"

const fetchReadme = async () =>
  await (
    await fetch("https://gh-proxy.com/raw.githubusercontent.com/dinghy421/articles/refs/heads/main/%E5%85%AC%E5%AF%93%E6%8A%A2%E5%8A%AB%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9.md")
  ).text()

const About = () => {
  const t = useT()
  useManageTitle("article.sidemenu.about")
  const [readme] = createResource(fetchReadme)
  return (
    <MaybeLoading loading={readme.loading}>
      <Markdown children={readme()} />
    </MaybeLoading>
  )
}

export default About
