import { HStack, VStack, Text } from "@hope-ui/solid"
import { batch, createEffect, createSignal, For, Show } from "solid-js"
import { useT } from "~/hooks"
import {
  allChecked,
  checkboxOpen,
  isIndeterminate,
  objStore,
  selectAll,
  sortObjs,
} from "~/store"
import { OrderBy } from "~/store"
import { Col, cols, ListItem } from "./ListItem"
import { ItemCheckbox, useSelectWithMouse } from "./helper"

const ListLayout = () => {
  const t = useT()
  const [orderBy, setOrderBy] = createSignal<OrderBy>()
  const [reverse, setReverse] = createSignal(false)
  createEffect(() => {
    if (orderBy()) {
      sortObjs(orderBy()!, reverse())
    }
  })
  const itemProps = (col: Col) => {
    return {
      fontWeight: "bold",
      fontSize: "$sm",
      color: "$neutral11",
      textAlign: col.textAlign as any,
      cursor: "pointer",
      onClick: () => {
        if (col.name === orderBy()) {
          setReverse(!reverse())
        } else {
          batch(() => {
            setOrderBy(col.name as OrderBy)
            setReverse(false)
          })
        }
      },
    }
  }
  const { isMouseSupported, registerSelectContainer, captureContentMenu } =
    useSelectWithMouse()
  registerSelectContainer()
  return (
    <VStack
      oncapture:contextmenu={captureContentMenu}
      classList={{ "viselect-container": isMouseSupported() }}
      class="list"
      w="$full"
      spacing="$1"
    >

      <For each={objStore.objs}>
        {(obj, i) => {
          return <ListItem obj={obj} index={i()} />
        }}
      </For>
    </VStack>
  )
}

export default ListLayout
