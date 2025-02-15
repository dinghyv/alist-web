import { createSignal } from "solid-js";
import { ContextMenu } from "./context-menu";

export const FileArea = () => {
  const [menuPosition, setMenuPosition] = createSignal<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    // 记录鼠标右键点击的坐标
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  // 点击其他区域时隐藏右键菜单
  const hideContextMenu = () => {
    setMenuPosition(null);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={hideContextMenu}
      style={{
        width: "100%",
        height: "100%",
        position: "relative"
      }}
    >
      {/* 此处为文件列表或其他内容 */}
      {menuPosition() && (
        <div
          style={{
            position: "absolute",
            top: `${menuPosition()!.y}px`,
            left: `${menuPosition()!.x}px`,
            zIndex: 9999,
          }}
        >
          <ContextMenu />
        </div>
      )}
    </div>
  );
};