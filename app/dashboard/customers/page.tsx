import { CustomBreadcrumb } from "./components/CustomBreadcrumb"
import CustomersView from "./components/CustomersView";

export default function page() {
  return (
    <div className='flex flex-col gap-4'>
      <CustomBreadcrumb />
      <CustomersView />
    </div>
  );
}