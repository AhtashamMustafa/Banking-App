import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const Home = async () => {
  const loggedIn = await getLoggedInUser()

  
  return (
    <section className='home'>
      <div className='home-content'>
      <header className='home-header'>
        <HeaderBox
        type="greeting"
        title="Welcome"
        user={loggedIn?.name||"Guest"}
        subtext = "Access and manage your accounts, transactions, and more efficiently"
        />
        <TotalBalanceBox
        accounts={[]}
        totalBanks={1}
        totalCurrentBalance = {1250.35}
        />
      </header>

      RECENT TRANSACTIONS
      </div>
      <RightSidebar 
      user={loggedIn}
      transactions={[]}
      banks={[{currentBalance: 1250.35},{currentBalance: 1250.35}]}
      />
    
    </section>
  )
}

export default Home
