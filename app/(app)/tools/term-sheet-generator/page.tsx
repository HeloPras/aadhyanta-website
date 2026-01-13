import React from "react"
import TermSheetGeneratorForm from "@/components/Pages/Tools/Term-Sheet-Generator-Form"

const page = () => {
  return (
    <div>
      <section>
        <div className="max-w-7xl mx-auto pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight  ">
            Term Sheet Generator
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
            Draft Professional Term Sheets in Minutes. Sub-headline: Skip the
            complex legal jargon. Use our intuitive generator to create
            customized, investor-ready term sheets for your next funding round.
          </p>

          <div className="max-w-2xl mx-auto">
            <TermSheetGeneratorForm />
          </div>
        </div>
      </section>
    </div>
  )
}

export default page
