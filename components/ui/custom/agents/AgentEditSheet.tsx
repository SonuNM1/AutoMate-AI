import React, { useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AgentSchedule, CreatedAgentType } from "./CreateAgent";
import { Plus, Shuffle, X } from "lucide-react";
import { Input } from "@base-ui/react";
import { Label } from "../../label";
import { Textarea } from "../../textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tools } from "@/db";
import { toast } from "sonner";
import axios from "axios";

// Props received by this component: the trigger element and the agent being edited

type Props = {
  children: any;
  agentConfig: CreatedAgentType | null;
  setUpdatedAgent: any 
};

// Component responsible for displaying and editing an existing agent

const AgentEditSheet = ({ children, agentConfig, setUpdatedAgent}: Props) => {

  const [draftAgent, setDraftAgent] = useState<CreatedAgentType | null>(
    agentConfig,
  );
  const [skillInput, setSkillInput] = useState("");
  const [tools, setTools] = useState<EditableTool[]>([]) ; 

  const [openSheet, setOpenSheet] = useState(false) ; 

  //   generate a new random agent image and update the draft

  const shuffleImage = () => {
    const randomSeed = crypto.randomUUID();
    const newImage =
      "https://api/dicebear.com/10.x/gaze/svg?tags=animation&seed=" +
      randomSeed;

    setDraftAgent((prev: any) => ({
      ...prev,
      agentImage: newImage,
    }));
  };

  const addSkill = () => {
    if (!draftAgent) return;

    const skill = skillInput.trim();

    if (!skill) return;

    if (draftAgent.skills.includes(skill)) {
      setSkillInput("");
      return;
    }

    setDraftAgent((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        skills: [...prev.skills, skill],
      };
    });

    setSkillInput("");
  };

  const removeSkill = (skillToRemove: string) => {
    setDraftAgent((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        skills: prev.skills.filter((skill) => skill !== skillToRemove),
      };
    });
  };

  // update a specific field inside the draft agent

  const updateDraft = (key: string, value: string) => {
    setDraftAgent((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const connectedToolCount = useMemo(() => {
    return tools.filter((tool) => tool.connected).length;
  }, [tools]);

  const hasSchedule =
    draftAgent?.schedule?.type === "once" ||
    draftAgent?.schedule?.type === "recurring";

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const result = await axios.put('/api/agent/configure', {
        ...draftAgent 
    })

    console.log(result.data) ; 

    setUpdatedAgent(draftAgent);
    toast.add({
        type: "success", 
        title: "Agent updated!",
    })

    setOpenSheet(false) ; 
  };

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>

        {/* form containing all editable agent fields */}

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <SheetHeader className="border-b py-4">
            <div className="flex items-center gap-2.5">
              <div>
                <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
              </div>
              <div>
                <SheetTitle>Edit Agent</SheetTitle>
                <SheetDescription>
                  Update how this agent looks, works and more.
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {/* scrollable area containing the editable agent fields */}

          <ScrollArea className={"p-5"}>
            <section className="flex gap-3 items-center border rounded-2xl bg-gray-50 p-3">
              <div>
                <img
                  src={draftAgent?.agentImage}
                  alt={draftAgent?.name ?? ""}
                  width={88}
                  height={88}
                  className="bg-slate-100 p-2 border rounded-2xl size-20"
                />
              </div>
              <div className="space-y-2">
                <p className="font-medium">Agent Image</p>
                <p className="text-xs text-muted-foreground">
                  Shuffle to generate new look
                </p>
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={shuffleImage}
                >
                  <Shuffle />
                  Shuffle Image
                </Button>
              </div>
            </section>
            <div className="space-y-2 gap mt-2">
              <label>Agent Name</label>
              <Input
                value={draftAgent?.name}
                onChange={(event) => updateDraft("name", event.target.value)}
                placeholder="Give your agent name"
                required
                className="mt-1"
              />
            </div>
            {/* prompt/instructions */}

            <section className="space-y-4 mt-5">
              {/* Agent objective */}
              <div className="space-y-2">
                <Label htmlFor="agent-objective">Objective</Label>

                <Textarea
                  id="agent-objective"
                  value={draftAgent?.objective ?? ""}
                  onChange={(event) =>
                    updateDraft("objective", event.target.value)
                  }
                  placeholder="What should this agent accomplish?"
                  className="min-h-24 resize-y"
                />
              </div>

              {/* Agent instructions */}

              <div className="space-y-2">
                <Label htmlFor="agent-instructions">Instructions</Label>

                <Textarea
                  id="agent-instructions"
                  value={draftAgent?.instructions ?? ""}
                  onChange={(event) =>
                    updateDraft("instructions", event.target.value)
                  }
                  placeholder="Add detailed instructions for your agent..."
                  className="min-h-32 resize-y"
                />
              </div>
            </section>

            {/* Agent schedule configuration */}

            <section className="space-y-4 rounded-xl border p-4 mt-5">
              <div>
                <h3 className="font-medium">Schedule</h3>

                <p className="text-xs text-muted-foreground">
                  Choose when and how often this agent runs.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Run type */}
                <div className="space-y-2">
                  <Label>Run type</Label>

                  <Select
                    value={draftAgent?.schedule?.type ?? "manual"}
                    onValueChange={(value) => {
                      setDraftAgent((prev) => {
                        if (!prev) return prev;

                        return {
                          ...prev,
                          schedule: {
                            ...prev.schedule,
                            type: value as AgentSchedule["type"],
                            ...(value !== "recurring"
                              ? { frequency: undefined }
                              : {}),
                          },
                        };
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select run type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>

                      <SelectItem value="once">Once</SelectItem>

                      <SelectItem value="recurring">Recurring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <Label>Time</Label>

                  <Input
                    type="time"
                    value={draftAgent?.schedule?.time ?? ""}
                    onChange={(event) => {
                      setDraftAgent((prev) => {
                        if (!prev) return prev;

                        return {
                          ...prev,
                          schedule: {
                            ...prev.schedule,
                            time: event.target.value,
                          },
                        };
                      });
                    }}
                  />
                </div>

                {/* Frequency - only show for recurring */}

                {draftAgent?.schedule?.type === "recurring" && (
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Frequency</Label>

                    <Select
                      value={draftAgent?.schedule?.frequency ?? ""}
                      onValueChange={(value) => {
                        setDraftAgent((prev) => {
                          if (!prev) return prev;

                          return {
                            ...prev,
                            schedule: {
                              ...prev.schedule,
                              type: "recurring",
                              frequency: value as AgentSchedule["frequency"],
                            },
                          };
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>

                        <SelectItem value="daily">Daily</SelectItem>

                        <SelectItem value="weekly">Weekly</SelectItem>

                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </section>

            {/* Agent skills */}
            <section className="space-y-4 mt-5">
              <div>
                <h3 className="font-medium">Skills</h3>

                <p className="text-xs text-muted-foreground">
                  Add or remove capabilities this agent should use.
                </p>
              </div>

              {/* Existing skills */}
              <div className="flex flex-wrap gap-2">
                {draftAgent?.skills?.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                  >
                    <span>{skill}</span>

                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add new skill */}

              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(event) => setSkillInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Add a skill"
                  className="flex-1"
                />

                <Button type="button" variant="outline" onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>

              {/* Connected tools */}

              <section className="space-y-4 mt-5">
                <div>
                  <h3 className="font-medium">Connected Tools</h3>

                  <p className="text-xs text-muted-foreground">
                    {Array.isArray(draftAgent?.tools)
                      ? `${draftAgent.tools.length} connected`
                      : "0 connected"}
                  </p>
                </div>

                <div className="space-y-3">
                  {["google_calendar", "notion"].map((tool) => (
                    <div
                      key={tool}
                      className="flex items-center justify-between border rounded-xl p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          🔗
                        </div>

                        <div>
                          <p className="font-medium">{tool}</p>

                          <p className="text-xs text-muted-foreground">
                            {draftAgent?.tools?.includes(tool)
                              ? "Connected"
                              : "Not connected"}
                          </p>
                        </div>
                      </div>

                      <Button type="button" variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Agent output format */}
              <section className="space-y-2 mt-5">
                <Label htmlFor="output-format">Output Format</Label>

                <Textarea
                  id="output-format"
                  value={draftAgent?.outputFormat ?? ""}
                  onChange={(event) =>
                    updateDraft("outputFormat", event.target.value)
                  }
                  placeholder="Describe how the agent should format its output..."
                  className="min-h-28 resize-y"
                />
              </section>
            </section>
          </ScrollArea>
          <SheetFooter className="border-t">
            <div className="flex justify-end gap-2.5">
              <Button type="button" variant={"outline"}>
                Cancel
              </Button>
              <Button className={"bg-purple-700"}>Save Changes</Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AgentEditSheet;
