import React from 'react'
import { DashboardLayout } from '../components/dashboard-layout';

const Options = () => {
  return (
    <div>Options</div>
  )
}

Options.getLayout = (page:any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default Options
