import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ProjectValue from '@/components/ProjectValue';
import TopMembers from '@/components/TopMembers';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import Partners from '@/components/Partners';
import Gallery from '@/components/Gallery';
import Services from '@/components/Services';
import type { SiteContent } from '@/types/content';

interface SitePreviewProps {
  content: Partial<SiteContent>;
}

export default function SitePreview({ content }: SitePreviewProps) {
  return (
    <div>
      <Navbar />
      <main>
        <Hero communityName={content.communityName || ''} tagline={content.tagline || ''} inspirational={content.inspirational} />
        {content.partners && content.partners.length > 0 && <Partners partners={content.partners} />}
        {content.stats && <Stats stats={content.stats} />}
        {content.projectInfo && <ProjectValue projectInfo={content.projectInfo} />}
        {content.topMembers && content.topMembers.length > 0 && <TopMembers members={content.topMembers} />}
        {content.services && content.services.length > 0 && <Services services={content.services} />}
        {content.gallery && content.gallery.length > 0 && <Gallery images={content.gallery} />}
        <CallToAction />
      </main>
      <Footer communityName={content.communityName || ''} socialLinks={content.socialLinks || { discord: '', youtube: '', github: '', twitter: '' }} />
    </div>
  );
}
