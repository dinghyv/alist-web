import {
  Center,
  ElementType,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  MenuTriggerProps,
  Spinner,
  useColorModeValue,
} from "@hope-ui/solid"
import { useI18n } from "@solid-primitives/i18n"
import { createSignal, For, Show } from "solid-js"
import { langMap, languages, loadedLangs, setLang } from "~/app/i18n"
// import { TbLanguageHiragana } from "solid-icons/tb";
import { IoLanguageOutline } from "solid-icons/io"
import { Portal } from "solid-js/web"
import { IoBoat } from 'solid-icons/io'
import { IoMail, IoSettings } from 'solid-icons/io'
import { IconButton } from "@hope-ui/solid"
import { Tooltip } from "@hope-ui/solid"
import { AiOutlineUser } from "solid-icons/ai"
import { FaSolidBlog } from 'solid-icons/fa'


const [fetchingLang, setFetchingLang] = createSignal(false)

export const SwitchLanguage = <C extends ElementType = "button">(
  props: MenuTriggerProps<C>,
) => {
  const [, { locale, add }] = useI18n()
  const switchLang = async (lang: string) => {
    if (!loadedLangs.has(lang)) {
      setFetchingLang(true)
      add(lang, (await langMap[lang]()).default)
      setFetchingLang(false)
      loadedLangs.add(lang)
    }
    locale(lang)
    setLang(lang)
    localStorage.setItem("lang", lang)
  }
  return (
    <>
      <Menu>
        <MenuTrigger cursor="pointer" {...props} />
        <MenuContent>
          <For each={languages}>
            {(lang, i) => (
              <MenuItem
                onSelect={() => {
                  switchLang(lang.code)
                }}
              >
                {lang.lang}
              </MenuItem>
            )}
          </For>
        </MenuContent>
      </Menu>
      <Show when={fetchingLang()}>
        <Portal>
          <Center
            h="$full"
            w="$full"
            pos="fixed"
            top={0}
            bg={useColorModeValue("$blackAlpha4", "$whiteAlpha4")()}
            zIndex="9000"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="$neutral4"
              color="$info10"
              size="xl"
            />
          </Center>
        </Portal>
      </Show>
    </>
  )
}

export const SwitchLanguageWhite = () => {
  return (
    <Tooltip label="切换语言" placement="top">
      <IconButton boxSize="$8" p="$0_5" variant="ghost">
        <SwitchLanguage as={IoLanguageOutline} size="1.5em"  />
      </IconButton>
    </Tooltip>
  )
}

export const DinghyHomepage = () => {
  return (
    <Tooltip label="安稳主页" placement="top">
      <IconButton 
        onClick={() => window.open("https://antwen.com", "_blank")} 
        boxSize="$8" 
        p="$0_5"
        variant="ghost"
      >
        <IoBoat size="1.5em" />
      </IconButton>
    </Tooltip>
  )
}

export const SendMeEmail = () => {
  return (
    <Tooltip label="给我邮件" placement="top">
      <IconButton 
        onClick={() => window.location.href = "mailto:me@antwen.info"} 
        boxSize="$8" 
        p="$0_5"
        variant="ghost"
      >
        <IoMail size="1.5em" />
      </IconButton>
    </Tooltip>
  )
}

export const UserLogin = () => {
  return (
    <Tooltip label="账号登录" placement="top">
      <IconButton 
        onClick={() => window.open("https://share.antwen.com/@login", "_blank")}
        boxSize="$8" 
        p="$0_5"
        variant="ghost"
      >
        <AiOutlineUser size="1.5em" />
      </IconButton>
    </Tooltip>
  )
}

export const UserAdmin = () => {
  return (
    <Tooltip label="管理后台" placement="top">
      <IconButton 
        onClick={() => window.open("https://share.antwen.com/@manage", "_blank")}
        boxSize="$8" 
        p="$0_5"
        variant="ghost"
      >
        <IoSettings size="1.5em" />
      </IconButton>
    </Tooltip>
  )
}

export const VisitAC = () => {
  return (
    <Tooltip label="安稳博客" placement="top">
      <IconButton 
        onClick={() => window.open("https://antwen.art", "_blank")}
        boxSize="$8" 
        p="$0_5"
        variant="ghost"
      >
        <FaSolidBlog size="1.5em" />
      </IconButton>
    </Tooltip>
  )
}