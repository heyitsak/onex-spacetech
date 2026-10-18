import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default async function AdminPage() {
  if (await isAuthenticated()) {
    redirect('/admin/dashboard');
  }
  redirect('/admin/login');
}
