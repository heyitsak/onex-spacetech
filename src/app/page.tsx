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
import { getContent } from '@/lib/content';

export default async function HomePage() {
  const content = await getContent();

  return (
    <>
      <Navbar />
      <main>
        <Hero communityName={content.communityName} tagline={content.tagline} inspirational={content.inspirational} />
        {content.partners.length > 0 && <Partners partners={content.partners} />}
        <Stats stats={content.stats} />
        <ProjectValue projectInfo={content.projectInfo} />
        {content.topMembers.length > 0 && <TopMembers members={content.topMembers} />}
        {content.services.length > 0 && <Services services={content.services} />}
        {content.gallery.length > 0 && <Gallery images={content.gallery} />}
        <CallToAction />
      </main>
      <Footer communityName={content.communityName} socialLinks={content.socialLinks} />
    </>
  );
}
