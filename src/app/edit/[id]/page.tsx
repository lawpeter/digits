import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Stuff, Contact as ContactModel } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditStuffForm from '@/components/EditStuffForm';
import dynamic from 'next/dynamic';

const EditContactForm = dynamic(() => import('@/components/EditContactForm'), { ssr: false });

export default async function EditStuffPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  // Try to load a Contact first. If we find one, render the contact edit form.
  const contact: ContactModel | null = await prisma.contact.findUnique({ where: { id } });
  if (contact) {
    return (
      <main>
        <EditContactForm contact={contact} />
      </main>
    );
  }

  // Otherwise fall back to Stuff (old behavior)
  const stuff: Stuff | null = await prisma.stuff.findUnique({ where: { id } });
  if (stuff) {
    return (
      <main>
        <EditStuffForm stuff={stuff} />
      </main>
    );
  }

  return notFound();
}
