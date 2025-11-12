import { notFound } from 'next/navigation';
import PortfolioClient from '@/components/portofolio/PortfolioClient';

export default async function PortfolioPage({ params }) {
  const { profileId } = await params;

  if (!profileId) {
    notFound();
  }

  return <PortfolioClient profileId={profileId} />;
}
