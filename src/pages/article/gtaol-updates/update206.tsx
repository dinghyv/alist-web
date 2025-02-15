import { createResource } from "solid-js"
import { Markdown, MaybeLoading } from "~/components"
import { useT, useManageTitle } from "~/hooks"

const fetchReadme = async () =>
  await (
    await fetch("https://lsky-pro.f4a6f8c599ed275b972992612dff7350.r2.cloudflarestorage.com/gta-online-updates/206.md?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=a40126431059a039f9bcfb94631673a4%2F20250215%2FAPAC%2Fs3%2Faws4_request&X-Amz-Date=20250215T054831Z&X-Amz-Expires=14400&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27206.md&X-Amz-Signature=7311f69eb527e9dd47eb548956b67cb72e21e9aff7f45b20a54793333937d1e8")
  ).text()

const About = () => {
  const t = useT()
  useManageTitle("article.sidemenu.test11")
  const [readme] = createResource(fetchReadme)
  return (
    <MaybeLoading loading={readme.loading}>
      <Markdown children={readme()} />
    </MaybeLoading>
  )
}

export default About
