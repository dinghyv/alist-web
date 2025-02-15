import { createResource } from "solid-js"
import { Markdown, MaybeLoading } from "~/components"
import { useT, useManageTitle } from "~/hooks"

const fetchReadme = async () =>
  await (
    await fetch("https://lsky-pro.f4a6f8c599ed275b972992612dff7350.r2.cloudflarestorage.com/gta-online-updates/index.md?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=a40126431059a039f9bcfb94631673a4%2F20250215%2FAPAC%2Fs3%2Faws4_request&X-Amz-Date=20250215T055103Z&X-Amz-Expires=14400&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27index.md&X-Amz-Signature=118c83d113852928eebb16cd826e13f40e03cd8e0e4c9f56775c8bfb827e24ab")
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
