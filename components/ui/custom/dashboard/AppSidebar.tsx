"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { UserDetailContext } from "@/context/UserDetailContext";
import { UserButton } from "@clerk/nextjs";
import {
  AppWindow,
  Blocks,
  Bot,
  LayersIcon,
  PlayIcon,
  Settings,
  User2,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();

  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();

  return (
    <Sidebar className="border-r">
      {/* Header */}

      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 rounded-lg p-2">
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
          </div>

          <h2 className="font-semibold text-lg">AutoMate AI</h2>
        </div>
      </SidebarHeader>

      {/* Content */}

      <SidebarContent>
        {/* Workspace */}

        <SidebarGroup className="px-3 py-2">
          <SidebarGroupLabel className="px-2 mb-2 text-sm">
            Workspace
          </SidebarGroupLabel>

          {/* Dashboard */}

          <SidebarMenuButton
            className={`h-11 gap-3 rounded-xl px-2.5 hover:bg-slate-100 ${
              path == "/dashboard" ? "bg-slate-100" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 bg-blue-100 items-center justify-center rounded-lg">
              <AppWindow className="h-[18px] w-[18px] text-blue-900" />
            </div>

            <span>Dashboard</span>
          </SidebarMenuButton>

          {/* Agents */}

          <SidebarMenuButton
            onClick={() => router.push("/dashboard/agents")}
            className={`h-11 gap-3 rounded-xl px-2.5 hover:bg-slate-100 ${
              path.includes("/dashboard/agents") ? "bg-slate-100" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 bg-green-100 items-center justify-center rounded-lg">
              <Bot className="h-[18px] w-[18px] text-green-900" />
            </div>

            <span>Agents</span>
          </SidebarMenuButton>

          {/* Runs */}

          <SidebarMenuButton
          onClick={() => router.push("/dashboard/play")}
            className={`h-11 gap-3 rounded-xl px-2.5 hover:bg-slate-100 ${
              path == "/dashboard/play" ? "bg-slate-100" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 bg-red-100 items-center justify-center rounded-lg">
              <PlayIcon className="h-[18px] w-[18px] text-red-900" />
            </div>

            <span>Runs</span>
          </SidebarMenuButton>

          {/* Integrations */}

          <SidebarMenuButton
            onClick={() => router.push("/dashboard/integrations")}
            className={`h-11 gap-3 rounded-xl px-2.5 hover:bg-slate-100 ${
              path == "/dashboard/integrations" ? "bg-slate-100" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 bg-purple-100 items-center justify-center rounded-lg">
              <Blocks className="h-[18px] w-[18px] text-purple-900" />
            </div>

            <span>Integrations</span>
          </SidebarMenuButton>

          {/* Templates */}

          <SidebarMenuButton
          onClick={() => router.push("/dashboard/templates")}
            className={`h-11 gap-3 rounded-xl px-2.5 hover:bg-slate-100 ${
              path.includes("/dashboard/templates") ? "bg-slate-100" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 bg-orange-100 items-center justify-center rounded-lg">
              <LayersIcon className="h-[18px] w-[18px] text-orange-900" />
            </div>

            <span>Templates</span>
          </SidebarMenuButton>
        </SidebarGroup>
        <SidebarGroup className="px-3 py-2">
          <SidebarGroupLabel className="px-2 mb-1 text-sm">
            User
          </SidebarGroupLabel>

          <SidebarMenuButton
            className={`h-10 gap-3 rounded-xl px-2.5 hover:bg-slate-100 ${
              path.includes("/dashboard/settings") ? "bg-slate-100" : ""
            }`}
          >
            <div className="flex h-8 w-8 shrink-0 bg-yellow-100 items-center justify-center rounded-lg">
              <Settings className="h-[17px] w-[17px] text-yellow-900" />
            </div>

            <span>Settings</span>
          </SidebarMenuButton>

          <SidebarMenuButton
            className={`h-10 gap-3 rounded-xl px-2.5 hover:bg-slate-100 ${
              path.includes("/dashboard/profile") ? "bg-slate-100" : ""
            }`}
          >
            <div className="flex h-8 w-8 shrink-0 bg-green-100 items-center justify-center rounded-lg">
              <User2 className="h-[17px] w-[17px] text-green-900" />
            </div>

            <span>Profile</span>
          </SidebarMenuButton>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="p-2 border rounded-xl flex flex-col gap-1">
          <h2 className="flex justify-between text-sm">
            <span>Agents</span>
            <span>{userDetail?.agentCredits ?? 0}/5</span>
          </h2>

          <h2 className="flex justify-between text-sm">
            <span>Credits</span>
            <span>{userDetail?.usageCredits ?? 0}</span>
          </h2>

          <Progress value={66} className="h-1.5 mt-1" />
        </div>

        <div className="flex items-center p-1 mt-1 gap-2.5">
          <UserButton />
          <span>{userDetail?.name}</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
