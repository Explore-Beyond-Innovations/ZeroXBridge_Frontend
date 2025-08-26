'use client';

import React from 'react';
import GovernanceOverview from './components/learn-overview';
import Delegates from './components/delegates';

const Page = () => {
  return (
    <div>
      <GovernanceOverview />
      <Delegates />
    </div>
  );
};

export default Page;
