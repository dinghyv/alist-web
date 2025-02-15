import { Menu, Item, Submenu } from "solid-contextmenu";
import { createSignal, onMount } from "solid-js";
import { useCopyLink, useDownload, useLink, useT } from "~/hooks";
import "solid-contextmenu/dist/style.css";
import { HStack, Icon, Text, useColorMode, Image } from "@hope-ui/solid";
import { operations } from "../toolbar/operations";
import { For, Show } from "solid-js";
import { usePath } from "~/hooks";
import { bus, convertURL, notify } from "~/utils";
import { ObjType, UserMethods, UserPermissions } from "~/types";
import {
  getSettingBool,
  haveSelected,
  me,
  oneChecked,
  selectedObjs,
} from "~/store";
import { players } from "../previews/video_box";
import { BsPlayCircleFill } from "solid-icons/bs";
import { isArchive } from "~/store/archive";
import { RiSystemAddBoxLine } from "solid-icons/ri";

const ItemContent = (props: { name: string }) => {
  const t = useT();
  return (
    <HStack spacing="$2">
      <Icon
        p={operations[props.name].p ? "$1" : undefined}
        as={operations[props.name].icon}
        boxSize="$7"
        color={operations[props.name].color}
      />
      <Text>{t(`home.toolbar.${props.name}`)}</Text>
    </HStack>
  );
};

interface ContextMenuProps {
  isBlank?: boolean; // 当 isBlank 为 true，则说明右键区域为文件列表外部
}

export const ContextMenu = (props: ContextMenuProps) => {
  // 如果外部没有传入 isBlank，则内部尝试通过最近一次右键事件判断
  const [internalIsBlank, setInternalIsBlank] = createSignal<boolean>(true);
  onMount(() => {
    // 监听全局右键事件
    document.addEventListener("contextmenu", (e) => {
      // 假设文件列表元素具有 .file-list 类名
      const isFileArea = (e.target as HTMLElement).closest(".file-list") !== null;
      setInternalIsBlank(!isFileArea);
    });
  });

  const isBlank = props.isBlank !== undefined ? props.isBlank : internalIsBlank();
  const { refresh } = usePath();
  const t = useT();
  const { colorMode } = useColorMode();
  const { copySelectedRawLink, copySelectedPreviewPage } = useCopyLink();
  const { batchDownloadSelected, sendToAria2, playlistDownloadSelected } = useDownload();
  const canPackageDownload = () => {
    return UserMethods.is_admin(me()) || getSettingBool("package_download");
  };
  const { rawLink } = useLink();

  return (
    <Menu
      id={1}
      animation="scale"
      theme={colorMode() !== "dark" ? "light" : "dark"}
      style="z-index: var(--hope-zIndices-popover)"
    >
      {/* 仅在空白区域（即文件列表外）显示刷新和新建相关菜单 */}
      <Show when={isBlank}>
        <Item
          hidden={() => {
            const index = UserPermissions.findIndex((item) => item === "rename");
            return !UserMethods.can(me(), index);
          }}
          onClick={() => {
            refresh(undefined, true);
          }}
        >
          <ItemContent name="refresh" />
        </Item>
        <Submenu
          hidden={() => {
            const index = UserPermissions.findIndex((item) => item === "rename");
            return !UserMethods.can(me(), index);
          }}
          label={
            <HStack spacing="$2">
              <Icon as={RiSystemAddBoxLine} boxSize="$7" p="$0_5" color="$info9" />
              <Text>{t("home.toolbar.new")}</Text>
            </HStack>
          }
        >
          <Item
            onClick={() => {
              bus.emit("tool", "new_file");
            }}
          >
            <ItemContent name="new_file" />
          </Item>
          <Item
            onClick={() => {
              bus.emit("tool", "mkdir");
            }}
          >
            <ItemContent name="mkdir" />
          </Item>
        </Submenu>
      </Show>

      {/* 以下为文件或目录上右键时显示 */}
      <For each={["rename", "move", "copy", "delete"]}>
        {(name) => (
          <Item
            hidden={() => {
              const index = UserPermissions.findIndex((item) => item === name);
              return !UserMethods.can(me(), index);
            }}
            onClick={() => {
              bus.emit("tool", name);
            }}
          >
            <ItemContent name={name} />
          </Item>
        )}
      </For>
      <Show when={oneChecked()}>
        <Item
          hidden={() => {
            const index = UserPermissions.findIndex((item) => item === "decompress");
            return (
              !UserMethods.can(me(), index) ||
              selectedObjs()[0].is_dir ||
              !isArchive(selectedObjs()[0].name)
            );
          }}
          onClick={() => {
            bus.emit("tool", "decompress");
          }}
        >
          <ItemContent name="decompress" />
        </Item>
      </Show>
      <Show when={oneChecked()}>
        <Item
          onClick={({ props }) => {
            if (props.is_dir) {
              copySelectedPreviewPage();
            } else {
              copySelectedRawLink(true);
            }
          }}
        >
          <ItemContent name="copy_link" />
        </Item>
        <Item
          hidden={() => {
            const index = UserPermissions.findIndex((item) => item === "rename");
            return !UserMethods.can(me(), index);
          }}
          onClick={() => {
            bus.emit("tool", "upload");
          }}
        >
          <ItemContent name="upload" />
        </Item>
        <Item
          hidden={() => {
            const index = UserPermissions.findIndex((item) => item === "rename");
            return !UserMethods.can(me(), index);
          }}
          onClick={({ props }) => {
            if (props.is_dir) {
              if (!canPackageDownload()) {
                notify.warning(t("home.toolbar.package_download_disabled"));
                return;
              }
              bus.emit("tool", "package_download");
            } else {
              batchDownloadSelected();
            }
          }}
        >
          <ItemContent name="download" />
        </Item>
        <Submenu
          hidden={({ props }) => props.type !== ObjType.VIDEO}
          label={
            <HStack spacing="$2">
              <Icon as={BsPlayCircleFill} boxSize="$7" p="$0_5" color="$info9" />
              <Text>{t("home.preview.play_with")}</Text>
            </HStack>
          }
        >
          <For each={players}>
            {(player) => (
              <Item
                onClick={({ props }) => {
                  const href = convertURL(player.scheme, {
                    raw_url: "",
                    name: props.name,
                    d_url: rawLink(props, true),
                  });
                  window.open(href, "_self");
                }}
              >
                <HStack spacing="$2">
                  <Image
                    m="0 auto"
                    boxSize="$7"
                    src={`${window.__dynamic_base__}/images/${player.icon}.webp`}
                  />
                  <Text>{player.name}</Text>
                </HStack>
              </Item>
            )}
          </For>
        </Submenu>
      </Show>
      <Show when={!oneChecked() && haveSelected()}>
        <Submenu label={<ItemContent name="copy_link" />}>
          <Item onClick={copySelectedPreviewPage}>
            {t("home.toolbar.preview_page")}
          </Item>
          <Item onClick={() => copySelectedRawLink()}>
            {t("home.toolbar.down_link")}
          </Item>
          <Item onClick={() => copySelectedRawLink(true)}>
            {t("home.toolbar.encode_down_link")}
          </Item>
        </Submenu>
        <Submenu label={<ItemContent name="download" />}>
          <Item onClick={batchDownloadSelected}>
            {t("home.toolbar.batch_download")}
          </Item>
          <Show when={UserMethods.is_admin(me()) || getSettingBool("package_download")}>
            <Item onClick={() => bus.emit("tool", "package_download")}>
              {t("home.toolbar.package_download")}
            </Item>
            <Item onClick={playlistDownloadSelected}>
              {t("home.toolbar.playlist_download")}
            </Item>
          </Show>
          <Item onClick={sendToAria2}>{t("home.toolbar.send_aria2")}</Item>
        </Submenu>
      </Show>
    </Menu>
  );
};