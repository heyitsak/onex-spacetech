import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  return <>{children}</>;
}
