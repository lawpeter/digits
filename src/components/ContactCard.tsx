'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import { Contact, Note } from '@/lib/validationSchemas';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from '@/components/AddNoteForm';

interface Props {
  contact: Contact;
  notes: Note[];
}

const ContactCard = ({ contact, notes }: Props) => (
  <Card className="h-100">
    <Card.Header className="text-center">
      <Image
        src={contact.image}
        width={75}
        roundedCircle
        alt={`${contact.firstName} ${contact.lastName}`}
      />
    </Card.Header>
    <Card.Body>
      <Card.Title>
        {contact.firstName}
        {' '}
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>
    <ListGroup variant="flush">
      {notes && notes.map((note) => <NoteItem key={note.id} note={note} />)}
    </ListGroup>
    {contact.id ? (
      <>
        <Card.Footer>
          <Link href={`/edit/${contact.id}`}>Edit</Link>
        </Card.Footer>
        <Card.Body>
          <AddNoteForm contactId={contact.id} />
        </Card.Body>
      </>
    ) : null}
  </Card>
);

export default ContactCard;
