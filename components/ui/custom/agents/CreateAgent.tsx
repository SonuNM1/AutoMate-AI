"use client" 

import { ArrowUp, BriefcaseBusiness, CalendarDays, Globe, Mail, MessageSquare, Plus } from 'lucide-react'
import React, { useState } from 'react'
import {Button} from "@/components/ui/button"

const quickSuggestions = [
  {
    label: "Find AI Jobs",
    prompt: "Find the latest AI and software developer jobs posted this week and summarize the best matches",
  },
  {
    label: "Inbox Summary",
    prompt: "Check my inbox and summarize the most important emails that need my attention",
  },
  {
    label: "Research Topic",
    prompt: "Research a topic across the web and give me a concise summary with key findings and sources",
  },
  {
    label: "Plan My Day",
    prompt: "Check my calendar and tasks, then create a prioritized plan for my day",
  },
  {
    label: "Reddit Trends",
    prompt: "Find trending Reddit discussions about AI tools and summarize the most useful insights",
  },
  {
    label: "Daily News",
    prompt: "Find the most important technology and AI news from today and summarize it",
  },
];

const templates = [
  {
    title: "Find Latest Jobs",
    description: "Search the web for the latest jobs matching my skills and experience",
    icon: BriefcaseBusiness,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    border: "hover:border-orange-300",
    glow: "hover:shadow-orange-100",
  },
  {
    title: "Daily Inbox Summary",
    description: "Summarize important emails and highlight what needs my attention",
    icon: Mail,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    border: "hover:border-blue-300",
    glow: "hover:shadow-blue-100",
  },
  {
    title: "Research a Topic",
    description: "Search the web and create a useful research summary with sources",
    icon: Globe,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    border: "hover:border-purple-300",
    glow: "hover:shadow-purple-100",
  },
];

const CreateAgent = () => {

  const [prompt, setPrompt] = useState('') ; 

  return (
    <div className='mt-5'>

      <div>
        <h2 className='text-2xl font-semibold tracking-tight'>Create New Agent</h2>
        <p className='mt-1 text-sm text-muted-foreground'>Ask what type of agent you want to create. Type your goal, task, or workflow</p>
      </div>

      {/* Prompt box */}

      <div className='w-full border rounded-2xl bg-background p-3 mt-3 shadow-lg shadow-purple-100 hover:shadow-purple-200' >
        <textarea     placeholder='Describe the agent you want to create...'
        className='min-h-[90px] w-full resize-none bg-transparent px-2 py-2 text-sm outline-none'
        value={prompt} 
        onChange={(event) => setPrompt(event.target.value)}
        />
        <div className='flex justify-between items-center'>
          <div>
            <Button variant={"ghost"} size={'icon'} >
              <Plus/>
            </Button>
          </div>
          <Button size={'icon'} className="h-9 w-9 rounded-full bg-purple-400" >
            <ArrowUp/>
          </Button>
        </div>
      </div>

      {/* suggestion list */}

      <div className='mt-2 flex gap-2' >
        {
          quickSuggestions.map((suggestion, index) => (
            <Button
            key={index} 
            variant={'outline'} 
            onClick={() => setPrompt(suggestion.prompt)}
            className='hover:text-purple-700 hover:bg-purple-200 hover:border-purple-700 cursor-pointer' >
              {suggestion.label}
            </Button>
          ))
        }
      </div>

      {/* Templates */}

      <div className='mt-10'>
        <h2 className='flex text-xl justify-between items-center font-semibold'>Get Started <span className='text-sm font-medium'>View All</span> </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-3'>
          {
            templates.map((template, index) => (
              <div className={`border rounded-2xl p-5 hover:cursor-pointer hover:shadow-lg ${template.border} ${template.glow}`}>
                <template.icon className={`h-12 w-12 p-2 ${template.iconBg} ${template.iconColor} rounded-xl`}/>
                <div className='mt-6'>
                  <h2 className='font-semibold text-foreground'>{template.title}</h2>
                  <p className='text-sm mt-2 leading-5 text-muted-foreground'>{template.description}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default CreateAgent
