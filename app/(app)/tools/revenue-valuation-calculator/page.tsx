import { Navbar } from '@/components/Layout/Navbar'
import RevenueValuationCalculator from '@/components/Pages/Tools/RevenueValuationCalculator'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar variant='nontransparent'></Navbar>
        <RevenueValuationCalculator/>
    </div>
  )
}

export default page