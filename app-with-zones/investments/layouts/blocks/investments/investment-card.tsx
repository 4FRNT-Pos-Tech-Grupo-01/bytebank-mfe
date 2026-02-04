'use client'

import dynamic from 'next/dynamic'
import InvestmentCardLayout from './investment-card-layout'
import InvestmentHeader from './investment-header'
import InvestmentRates from './investment-rates'
import { InvestmentProps } from './types'
import { investmentsData } from '@/data/global-data'

import Graphism from '@/assets/images/graphism-dark.svg'

const InvestmentChart = dynamic(() => import('./investment-chart'), { ssr: false })

const InvestmentCard = () => {
  const { sectionTitle } = (investmentsData || {}) as InvestmentProps;

  return (
    <InvestmentCardLayout>
      <Graphism className='absolute bottom-0 right-0 md:right-auto md:left-0 w-[9rem] md:w-[11.25rem] h-auto' />
      <Graphism className='absolute top-0 left-0 md:left-auto md:right-0 w-[9rem] md:w-[11.25rem] h-auto rotate-180' />
      <div className="relative">
        <InvestmentHeader />
        <InvestmentRates />
        <p className="text-black text-xl font-normal mt-10 mb-8">
          {sectionTitle}
        </p>
        <InvestmentChart />
      </div>
    </InvestmentCardLayout>
  )
}

export default InvestmentCard
