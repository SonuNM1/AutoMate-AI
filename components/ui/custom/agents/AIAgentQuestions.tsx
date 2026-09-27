"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ClarificationQuestion } from "./CreateAgent";

type Props = {
  questionList: ClarificationQuestion[];
  onComplete?: any;
};

export default function AIAgentQuestions({
  questionList,
  onComplete,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [customMode, setCustomMode] = useState<Record<string, boolean>>({});

  if (!questionList.length) {
    return null;
  }

  const currentQuestion = questionList[currentIndex];

  const currentAnswer = answers[currentQuestion.id] || "";

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const getMultiSelectAnswers = (): string[] => {
    if (!currentAnswer) {
      return [];
    }

    try {
      const parsed = JSON.parse(currentAnswer);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      return [];
    }

    return [];
  };

  const handleSingleSelect = (option: string) => {
    setCustomMode((prev) => ({
      ...prev,
      [currentQuestion.id]: false,
    }));

    handleAnswer(option);
  };

  const handleMultiSelect = (option: string) => {
    setCustomMode((prev) => ({
      ...prev,
      [currentQuestion.id]: false,
    }));

    const selected = getMultiSelectAnswers();

    const updated = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];

    handleAnswer(JSON.stringify(updated));
  };

  const handleCustomMode = () => {
    setCustomMode((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));

    handleAnswer("");
  };

  const handleNext = () => {
    if (!currentAnswer.trim()) {
      return;
    }

    if (currentIndex < questionList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log("AI Agent Answers:", answers);

      onComplete?.(answers);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isCustomMode = customMode[currentQuestion.id] || false;

  const selectedMultiOptions = getMultiSelectAnswers();

  const isMultiSelect =
    currentQuestion.type === "multi_select";

  const isSingleSelect =
    currentQuestion.type === "single_select";

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress */}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            Question {currentIndex + 1} of {questionList.length}
          </span>

          <span className="text-sm font-medium">
            {Math.round(
              ((currentIndex + 1) / questionList.length) * 100,
            )}
            %
          </span>
        </div>

        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${
                ((currentIndex + 1) / questionList.length) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Question */}

      <div className="min-h-[280px]">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Help me understand your request
          </p>

          <h2 className="text-xl font-semibold leading-7">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Text Question */}

        {currentQuestion.type === "text" && (
          <Input
            autoFocus
            value={currentAnswer}
            placeholder={
              currentQuestion.customPlaceholder ||
              "Type your answer..."
            }
            onChange={(event) =>
              handleAnswer(event.target.value)
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                currentAnswer.trim()
              ) {
                handleNext();
              }
            }}
            className="h-12 mt-3"
          />
        )}

        {/* Number Question */}

        {currentQuestion.type === "number" && (
          <Input
            autoFocus
            type="number"
            value={currentAnswer}
            placeholder={
              currentQuestion.customPlaceholder ||
              "Enter a number..."
            }
            onChange={(event) =>
              handleAnswer(event.target.value)
            }
            className="h-12 mt-3"
          />
        )}

        {/* Date Question */}

        {currentQuestion.type === "date" && (
          <Input
            autoFocus
            type="date"
            value={currentAnswer}
            onChange={(event) =>
              handleAnswer(event.target.value)
            }
            className="h-12 mt-3"
          />
        )}

        {/* Time Question */}

        {currentQuestion.type === "time" && (
          <Input
            autoFocus
            type="time"
            value={currentAnswer}
            onChange={(event) =>
              handleAnswer(event.target.value)
            }
            className="h-12 mt-3"
          />
        )}

        {/* Options */}

        {(isSingleSelect || isMultiSelect) &&
          !isCustomMode && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => {
                const selected = isMultiSelect
                  ? selectedMultiOptions.includes(option)
                  : currentAnswer === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      isMultiSelect
                        ? handleMultiSelect(option)
                        : handleSingleSelect(option)
                    }
                    className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                      selected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <span className="text-sm font-medium">
                      {option}
                    </span>

                    {selected && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

        {/* Other / Custom */}

        {currentQuestion.allowCustom &&
          (isSingleSelect || isMultiSelect) && (
            <div className="mt-3">
              <button
                type="button"
                onClick={handleCustomMode}
                className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                  isCustomMode
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <span className="text-sm font-medium">
                  Other / Custom
                </span>

                {isCustomMode && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </button>

              {isCustomMode && (
                <Input
                  autoFocus
                  value={currentAnswer}
                  placeholder={
                    currentQuestion.customPlaceholder ||
                    "Enter your answer..."
                  }
                  onChange={(event) =>
                    handleAnswer(event.target.value)
                  }
                  className="h-12 mt-3"
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      currentAnswer.trim()
                    ) {
                      handleNext();
                    }
                  }}
                />
              )}
            </div>
          )}
      </div>

      {/* Navigation */}

      <div className="flex items-center justify-between pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button
          type="button"
          onClick={handleNext}
          disabled={!currentAnswer.trim()}
          className="gap-2"
        >
          {currentIndex === questionList.length - 1
            ? "Finish"
            : "Continue"}

          {currentIndex === questionList.length - 1 ? (
            <Check className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}