import Navbar from '@/components/Navbar';
import ContactContent from '@/components/ContactContent';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/content';

export default async function ContactPage() {
  const content = await getContent();

  return (
    <>
      <Navbar />
      <main>
        <ContactContent contactInfo={content.contactInfo} socialLinks={content.socialLinks} />
      </main>
      <Footer communityName={content.communityName} socialLinks={content.socialLinks} />
    </>
  );
}
