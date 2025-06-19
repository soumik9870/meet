"use client";

import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";

export const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar();

    const [commandOpen, setCommandOpen] = useState(false);
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => {
            document.removeEventListener("keydown", down);
        }
    },[])
    return (
        <>
        <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
            <nav className="flex px-4 gap-y-2 items-center py-3 bprder-b bg-background">
                <Button className="size-9 cursor-pointer" variant="outline" onClick={toggleSidebar} aria-label="Toggle sidebar">
                    {(state === "collapsed" || isMobile) ? <PanelLeftIcon className="size-4 cursor-pointer" /> : <PanelLeftCloseIcon className="size-4 cursor-pointer" />}
                </Button>
                <Button className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground cursor-pointer" variant="outline" size="sm" onClick={() => setCommandOpen((open) => !open)}>
                    <SearchIcon />
                    Search
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-90">
                        <span className="text-xs">&#8984;</span>
                    </kbd>
                </Button>
            </nav>
        </>
    )
}