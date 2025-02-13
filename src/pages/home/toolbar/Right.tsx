import { Box, createDisclosure, VStack } from "@hope-ui/solid"
import { createMemo, Show } from "solid-js"
import { RightIcon } from "./Icon"
import { CgMoreO } from "solid-icons/cg"
import { TbCheckbox } from "solid-icons/tb"
import { objStore, selectAll, State, toggleCheckbox, userCan } from "~/store"
import { bus } from "~/utils"
import { operations } from "./operations"
import { IoMagnetOutline } from "solid-icons/io"
import { AiOutlineCloudUpload, AiOutlineSetting, AiOutlineUser } from "solid-icons/ai"
import { IoMail } from 'solid-icons/io'
import { RiSystemRefreshLine } from "solid-icons/ri"
import { usePath } from "~/hooks"
import { Motion } from "@motionone/solid"
import { isTocVisible, setTocDisabled } from "~/components"
import { BiSolidBookContent } from "solid-icons/bi"

export const Right = () => {
  const isFolder = createMemo(() => objStore.state === State.Folder)
  const { refresh } = usePath()
  return (
    <Box
      class="left-toolbar-box"
      pos="fixed"
      right={margin()}
      bottom={margin()}
    >
      <VStack
        class="left-toolbar"
        p="$1"
        rounded="$lg"
        spacing="$1"
        bgColor="$neutral1"
        as={Motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.2 }}
      >
        <VStack spacing="$1" class="left-toolbar-in">
          <Show when={isFolder() && (userCan("write") || objStore.write)}>
            <RightIcon
              as={RiSystemRefreshLine}
              tips="refresh"
              onClick={() => {
                refresh(undefined, true)
              }}
            />
            <RightIcon
              as={operations.new_file.icon}
              tips="new_file"
              onClick={() => {
                bus.emit("tool", "new_file")
              }}
            />
            <RightIcon
              as={operations.mkdir.icon}
              p="$1_5"
              tips="mkdir"
              onClick={() => {
                bus.emit("tool", "mkdir")
              }}
            />
            <RightIcon
              as={operations.recursive_move.icon}
              tips="recursive_move"
              onClick={() => {
                bus.emit("tool", "recursiveMove")
              }}
            />
            <RightIcon
              as={operations.remove_empty_directory.icon}
              tips="remove_empty_directory"
              onClick={() => {
                bus.emit("tool", "removeEmptyDirectory")
              }}
            />
            <RightIcon
              as={operations.batch_rename.icon}
              tips="batch_rename"
              onClick={() => {
                selectAll(true)
                bus.emit("tool", "batchRename")
              }}
            />
            <RightIcon
              as={AiOutlineCloudUpload}
              tips="upload"
              onClick={() => {
                bus.emit("tool", "upload")
              }}
            />
          </Show>
          <Show when={isFolder() && userCan("offline_download")}>
            <RightIcon
              as={IoMagnetOutline}
              pl="0"
              tips="offline_download"
              onClick={() => {
                bus.emit("tool", "offline_download")
              }}
            />
          </Show>
          <Show when={isTocVisible()}>
            <RightIcon
              as={BiSolidBookContent}
              tips="toggle_markdown_toc"
              onClick={() => {
                setTocDisabled((disabled) => !disabled)
              }}
            />
          </Show>
          <RightIcon
            tips="email_me"
            as={IoMail}
            onClick={() => {
              window.open("mailto:dinghyv@gmail.com")
            }}
          />
          <Show when={!userCan("write")}>
            <RightIcon
              tips="index_login"
              as={AiOutlineUser}
              onClick={() => {
                window.open("https://cloud.vyhd.xyz/@login", "_blank")
              }}
            />
          </Show>
          <Show when={userCan("write")}>
            <RightIcon
              as={AiOutlineSetting}
              tips="local_settings"
              onClick={() => {
                window.open("https://cloud.vyhd.xyz/@manage", "_blank")
              }}
            />
            <RightIcon
              tips="toggle_checkbox"
              as={TbCheckbox}
              onClick={toggleCheckbox}
            />
          </Show>
        </VStack>
      </VStack>
    </Box>
  )
}