"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { CreatedAgentType } from "./CreateAgent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CalendarClockIcon,
  Ellipsis,
  Pause,
  Pencil,
  Play,
  PlayIcon,
  Trash,
} from "lucide-react";
import { Separator } from "react-resizable-panels";
import AgentEditSheet from "./AgentEditSheet";

const MyAgents = () => {

  const [myAgents, setMyAgents] = useState<CreatedAgentType[] | null>();
  const [openEditAgentSheet, setOpenEditAgentSheet] = useState(false);
  const [selectedEditAgent, setSelectedEditAgent] = useState<CreatedAgentType | null>(null)

  useEffect(() => {
    AllUsersAgent();
  }, []);

  const AllUsersAgent = async () => {
    const result = await axios.get("/api/agent/configure");

    console.log(result);
    setMyAgents(result.data);
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">My Agents</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Run, Manage and Update all the agents you've created.
      </p>

      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
        {myAgents?.map((agent, index) => (
          <div className="p-3 border rounded-2xl">
            <div className="flex justify-between items-center">
              <img
                src={agent?.agentImage}
                alt={agent.name}
                width={30}
                height={30}
                className="p-2 border size-16 rounded-xl bg-slate-100"
              />

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant={"ghost"} size={"icon"}>
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <PlayIcon /> Run Now
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pause /> Pause Agent
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOpenEditAgentSheet(true)}; 
                        setSelectedEditAgent(agent)
                      >
                        <Pencil />
                        Edit Agent
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                      <DropdownMenuItem variant="destructive">
                        <Trash /> Delete Agent
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="my-2">
                <h2 className="font-bold flex gap-2">
                  {agent.name}{" "}
                  <span className="font-normal text-green-700 bg-green-100 px-2 py-0.5 rounded-2 xl">
                    {agent.status}
                  </span>
                </h2>
                <p className="line-clamp-1 mt-1">{agent?.description}</p>
                <div className="flex gap-1 items-center mt-4">
                  <CalendarClockIcon className="h-4 w-4 text-purple-700" />
                  <p className="text-xs text-muted-foreground">
                    {agent?.schedule?.frequency}
                    {agent.schedule.type === "recurring" && (
                      <span>&nbsp; at {agent?.schedule?.time}</span>
                    )}
                  </p>
                </div>
                <Separator className={"my-3"} />
                <Button className={"bg-purple-700 w-ful mt-2 cursor-pointer"}>
                  <Play /> Run Agent
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      { openEditAgentSheet && <AgentEditSheet
                agentConfig={selectedEditAgent}
                setUpdatedAgent={() => AllUsersAgent()}
                openSheet_={openEditAgentSheet}
                closeSheet={(v:boolean) => setOpenEditAgentSheet(v)}
              />}
    </div>
  );
};

export default MyAgents;
