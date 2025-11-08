import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
// import { prisma } from '@/lib/prisma';
// import StuffItem from '@/components/StuffItem';
import ContactCard from '@/components/ContactCard';
import { prisma } from '@/lib/prisma';
// import { Contact } from '@/lib/validationSchemas';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

/** Render a list of stuff for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  const contacts = await prisma.contact.findMany({
    where: {
      owner,
    },
  });
  const notes = await prisma.note.findMany({ where: { owner } });
  // console.log(contacts);

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h2>List Contacts</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
                <Col key={`Contact-${contact.firstName}`}>
                  <ContactCard contact={contact} notes={notes.filter((n) => n.contactId === contact.id)} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
