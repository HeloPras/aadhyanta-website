"use client";

import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TermSheetGeneratorForm() {
  const formSchema = z.object({
    "text-input-0": z.string().min(1, { message: "This field is required" }),
    "text-input-1": z.string().min(1, { message: "This field is required" }),
    "text-input-2": z.string().min(1, { message: "This field is required" }),
    "text-input-3": z.string().min(1, { message: "This field is required" }),
     "submit-button-0": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-input-0": "",
      "text-input-1": "",
      "text-input-2": "",
      "text-input-3": "",
    },
  });

  const [generatedTermsheet,setgeneratedTermsheet] = useState(false)

  const [details,Setdetails] = useState({
    company_name:"",
    ceo_name:"",
    lead_investor:"",
    serial_round:"",
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {

      const response = await fetch("/api/tools/term_sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            hello:values["text-input-0"],
            hello1:values["text-input-1"],
            hello2:values["text-input-2"],
            hello3:values["text-input-3"],
          }
        ),
      });
      if(!response.ok){
        console.log('Failed to generate term sheet')
      }
      setgeneratedTermsheet(true)
      console.log("File Generated Successfully")
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "Term_Sheet.docx"
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      
    } catch (error) {
      console.log("reached the api but error",error) 
    }
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  


  return (
    <>
   <form
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={onReset}
      className="space-y-8 @container"
    >
      <div className="grid grid-cols-12 gap-4">
        <Controller
          control={form.control}
          name="text-input-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Company Name *</FieldLabel>

              <Input
                key="text-input-0"
                placeholder=""
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="text-input-1"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Founder/ CEO name *
              </FieldLabel>

              <Input
                key="text-input-1"
                placeholder=""
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="text-input-2"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">
                Lead Investor Name *
              </FieldLabel>

              <Input
                key="text-input-2"
                placeholder=""
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div
          key="text-0"
          id="Series and Valuation"
          className=" col-span-12 col-start-auto"
        >
          Text
        </div>

        <Controller
          control={form.control}
          name="text-input-3"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Serial Round *</FieldLabel>

              <Input
                key="text-input-3"
                placeholder=""
                type="text"
                className=""
                {...field }
              />

              <FieldDescription>
                *Dont include "Series" . Example
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
         <Controller
          control={form.control}
          name="submit-button-0"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">Submit</FieldLabel>

              <Button
                key="submit-button-0"
                id="submit-button-0"
                name="submit-button-0"
                className="w-full"
                type="submit"
                variant="default"
              >
                Submit
              </Button>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        /> 
      </div>
    </form>
    </>
  )
}
