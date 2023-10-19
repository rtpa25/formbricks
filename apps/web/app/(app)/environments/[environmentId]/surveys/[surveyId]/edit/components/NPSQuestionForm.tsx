"use client";

import { TSurvey, TSurveyNPSQuestion } from "@formbricks/types/v1/surveys";
import { Button } from "@formbricks/ui/Button";
import FileInput from "@formbricks/ui/FileInput";
import { Input } from "@formbricks/ui/Input";
import { Label } from "@formbricks/ui/Label";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ImagePlusIcon } from "lucide-react";
import { useState } from "react";

interface NPSQuestionFormProps {
  localSurvey: TSurvey;
  question: TSurveyNPSQuestion;
  questionIdx: number;
  updateQuestion: (questionIdx: number, updatedAttributes: any) => void;
  lastQuestion: boolean;
  isInValid: boolean;
}

export default function NPSQuestionForm({
  question,
  questionIdx,
  updateQuestion,
  lastQuestion,
  isInValid,
  localSurvey,
}: NPSQuestionFormProps): JSX.Element {
  const [showImageUploader, setShowImageUploader] = useState(!!question.imageUrl);
  const [showSubheader, setShowSubheader] = useState(!!question.subheader);
  const environmentId = localSurvey.environmentId;

  return (
    <form>
      <div className="mt-3">
        <Label htmlFor="headline">Question</Label>
        <div className="mt-2 flex flex-col gap-6">
          {showImageUploader && (
            <FileInput
              allowedFileExtensions={["png", "jpeg", "jpg"]}
              environmentId={environmentId}
              onFileUpload={(url: string) => {
                updateQuestion(questionIdx, { imageUrl: url });
              }}
              fileUrl={question.imageUrl || ""}
            />
          )}
          <div className="flex items-center space-x-2">
            <Input
              autoFocus
              id="headline"
              name="headline"
              value={question.headline}
              onChange={(e) => updateQuestion(questionIdx, { headline: e.target.value })}
              isInvalid={isInValid && question.headline.trim() === ""}
            />
            <ImagePlusIcon
              className="ml-2 h-4 w-4 cursor-pointer text-slate-400 hover:text-slate-500"
              onClick={() => setShowImageUploader((prev) => !prev)}
            />
          </div>
        </div>
      </div>

      <div className="mt-3">
        {showSubheader && (
          <>
            <Label htmlFor="subheader">Description</Label>
            <div className="mt-2 inline-flex w-full items-center">
              <Input
                id="subheader"
                name="subheader"
                value={question.subheader}
                onChange={(e) => updateQuestion(questionIdx, { subheader: e.target.value })}
              />
              <TrashIcon
                className="ml-2 h-4 w-4 cursor-pointer text-slate-400 hover:text-slate-500"
                onClick={() => {
                  setShowSubheader(false);
                  updateQuestion(questionIdx, { subheader: "" });
                }}
              />
            </div>
          </>
        )}
        {!showSubheader && (
          <Button size="sm" variant="minimal" type="button" onClick={() => setShowSubheader(true)}>
            <PlusIcon className="mr-1 h-4 w-4" />
            Add Description
          </Button>
        )}
      </div>

      <div className="mt-3 flex justify-between">
        <div>
          <Label htmlFor="subheader">Lower label</Label>
          <div className="mt-2">
            <Input
              id="subheader"
              name="subheader"
              value={question.lowerLabel}
              onChange={(e) => updateQuestion(questionIdx, { lowerLabel: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="subheader">Upper label</Label>
          <div className="mt-2">
            <Input
              id="subheader"
              name="subheader"
              value={question.upperLabel}
              onChange={(e) => updateQuestion(questionIdx, { upperLabel: e.target.value })}
            />
          </div>
        </div>
      </div>

      {!question.required && (
        <div className="mt-3">
          <Label htmlFor="buttonLabel">Button Label</Label>
          <div className="mt-2">
            <Input
              id="buttonLabel"
              name="buttonLabel"
              value={question.buttonLabel}
              placeholder={lastQuestion ? "Finish" : "Next"}
              onChange={(e) => updateQuestion(questionIdx, { buttonLabel: e.target.value })}
            />
          </div>
        </div>
      )}
    </form>
  );
}
