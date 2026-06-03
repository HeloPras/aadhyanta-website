import { Navbar } from '@/components/Layout/Navbar'
import StartupIncomeStatementCalculator from '@/components/Pages/Tools/IncomeStatement'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar variant='nontransparent'/>
        <StartupIncomeStatementCalculator/>
    </div>
  )
}

export default page