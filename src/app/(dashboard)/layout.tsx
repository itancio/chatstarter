'use client'

import { 
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarProvider,
    SidebarMenuButton,
    SidebarGroupLabel,
    SidebarGroupAction,
    SidebarFooter,
 } from '@/components/ui/sidebar';
import { RedirectToSignIn } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from 'convex/react'; 
import { PlusIcon, User2Icon } from 'lucide-react';
import Link from 'next/link';
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
        <Authenticated>
            <SidebarProvider>
                <DashboardSidebar />
                {children} 
            </SidebarProvider> 
        </Authenticated>
        <Unauthenticated>
            <RedirectToSignIn />
        </Unauthenticated>
        </>
    )
}

function DashboardSidebar() {
    return (
        <>
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href='/friends'>
                                        <User2Icon />
                                        Friends
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                    <SidebarGroup>
                        <SidebarGroupLabel> Direct Messages</SidebarGroupLabel>
                        <SidebarGroupAction>
                            <PlusIcon />
                            <span className='sr-only'></span>
                        </SidebarGroupAction>
                    </SidebarGroup>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroup>
                    
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
        </>
    )
}