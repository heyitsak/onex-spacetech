import Navbar from '@/components/Navbar';
import CoursesContent from '@/components/CoursesContent';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/content';

export default async function CoursesPage() {
  const content = await getContent();

  return (
    <>
      <Navbar />
      <main>
        <CoursesContent courses={content.courses} certificates={content.certificates} />
      </main>
      <Footer communityName={content.communityName} socialLinks={content.socialLinks} />
    </>
  );
}
