"use client"

import BalanceSheetCalculator from "@/components/Pages/Tools/BalanceSheetCalculator"
import StartupIncomeStatementCalculator from "@/components/Pages/Tools/IncomeStatement"
import RevenueValuationCalculator from "@/components/Pages/Tools/RevenueValuationCalculator"
import TestForm from "@/components/Pages/Tools/TestForm"
import { useState } from "react"

const page = () => {
  const [file, setFile] = useState<File | null>(null)

  const onsubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    if (file) {
      formData.append("attachment", file)
    }

    try {
      await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })
    } catch (error) {}
  }

  return (
    // <div className={`${cormorant.variable}`}>
    <>
      <div className="bg-white h-screen text-black flex center  ">
        <div className="w-full h-full text-center place-content-center ">
          <form onSubmit={onsubmit}>
            <input
              type="file"
              className="cursor-pointer  "
              onChange={(e) => {
                if (!e.target.files) return
                setFile(e.target.files[0])
              }}
            />
            <button
              type="submit"
              className="inline-block h-screen bg-stone-400 w-1/2 text-center"
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default page
