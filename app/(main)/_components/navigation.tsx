/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { Item } from "./item";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Navbar } from "./navbar";
import { UserItem } from "./user-item";
import { TrashBox } from "./trash-box";
import { useMutation } from "convex/react";
import { useMediaQuery } from "usehooks-ts";
import { api } from "@/convex/_generated/api";
import { DocumentList } from "./document-list";
import { useSearch } from "@/hooks/use-search";
import { UseSettings } from "@/hooks/use-settings";
import { useParams, usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useLayoutContext } from "@/components/providers/layout-provider";

const Navigation = () => {
  const search = useSearch();
  const params = useParams();
  const pathname = usePathname();
  const settings = UseSettings();
  const isResizingRef = useRef(false);
  const create = useMutation(api.documents.create);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const { isCollapsed, setIsCollapsed } = useLayoutContext();

  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;

    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;

      navbarRef.current.style.setProperty("left", `${newWidth}px`);

      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsResetting(true);
      setIsCollapsed(false);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";

      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );

      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsResetting(true);
      setIsCollapsed(true);

      sidebarRef.current.style.width = "0";

      navbarRef.current.style.setProperty("width", "100%");

      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const onCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      success: "New note created!",
      loading: "Creating a new note...",
      error: "Failed to create a new note.",
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar relative h-full flex flex-col w-60 overflow-y-auto bg-secondary",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && (isCollapsed ? "w-0" : "w-full"),
          isMobile && !isCollapsed && "z-[999999]"
        )}
        role="complementary"
        aria-hidden={isCollapsed}
      >
        <div
          role="button"
          onClick={collapse}
          className={cn(
            "w-8 h-8 flex items-center justify-center absolute top-3 right-2 rounded-sm p-1 text-muted-foreground transition-all hover:bg-neutral-200 dark:hover:bg-neutral-600 opacity-0 group-hover/sidebar:opacity-100",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="size-6" />
        </div>
        <div>
          <UserItem />
          <Item onClick={search.onOpen} label="Search" icon={Search} isSearch />
          <Item onClick={settings.onOpen} label="Settings" icon={Settings} />
          <Item onClick={onCreate} label="New page" icon={PlusCircle} />
        </div>
        <div className="mt-3">
          <DocumentList />
          <Item onClick={onCreate} icon={Plus} label="Add a page" />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? "bottom" : "right"}
              className="p-0 w-72"
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onClick={resetWidth}
          onMouseDown={handleMouseDown}
          className="opacity-0 group-hover/sidebar:opacity-100 transition-all cursor-ew-resize absolute top-0 right-0 h-full w-1 bg-primary/10"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 left-60 z-[99999] w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && (isCollapsed ? "left-0 w-full" : "left-[100%]")
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="w-full px-3 py-2 bg-transparent">
            {isCollapsed && (
              <MenuIcon
                role="button"
                onClick={resetWidth}
                className="size-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
