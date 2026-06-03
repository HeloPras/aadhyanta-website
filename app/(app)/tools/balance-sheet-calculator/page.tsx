import { Navbar } from '@/components/Layout/Navbar'
import BalanceSheetCalculator from '@/components/Pages/Tools/BalanceSheetCalculator'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar variant='nontransparent'></Navbar>
        <BalanceSheetCalculator/>
    </div>
  )
}

export default page