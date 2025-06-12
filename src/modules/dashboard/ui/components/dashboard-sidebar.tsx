"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator
} from '@/components/ui/sidebar'
import { BotIcon, StarIcon, VideoIcon } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation';
import { DashboardUserButton } from './dashboard-user-button';

const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings",
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents",
    }
]
const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade",
    }
];

export const DashboardSidebar = () => {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader className='text-sidebar-accent-foreground'>
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <Image src="/logo.svg" height={36} width={36} alt='logo' />
                    <p className='text-2xl font-semibold'>Meet AI</p>
                </Link>
            </SidebarHeader>
            <div className='px-4 py-2'>
                <SidebarSeparator className='opacity-10 text-[#5d6b68]' />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6d68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50", pathname === item.href && "bg-linear-to-r/oklch border border-[#5d6d68]/10")}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className='h-5 w-5 text-sidebar-accent-foreground' />
                                            <span className='text-sm font-medium tracking-tight'>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className='px-4 py-2'>
                    <SidebarSeparator className='opacity-10 text-[#5d6b68]' />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6d68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50", pathname === item.href && "bg-linear-to-r/oklch border border-[#5d6d68]/10")}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className='h-5 w-5 text-sidebar-accent-foreground' />
                                            <span className='text-sm font-medium tracking-tight'>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className='text-white'>
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}