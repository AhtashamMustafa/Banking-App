import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = {firstName:"Ahtasham",lastName:"Mustafa", email:"ahtasham@example.com",$id:"1"}
  return (
    <section className='home'>
      <div className='home-content'>
      <header className='home-header'>
        <HeaderBox
        type="greeting"
        title="Welcome"
        user={loggedIn?.firstName||"Guest"}
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
