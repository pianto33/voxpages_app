import { redirect } from '@/i18n/routing';

export default async function RefundsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return redirect({ href: '/subscription-policy#refunds', locale });
}
