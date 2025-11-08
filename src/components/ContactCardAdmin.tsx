'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import { Contact, Note } from '@/lib/validationSchemas';
import NoteItem from '@/components/NoteItem';

interface Props {
  contact: Contact;
  notes: Note[];
}

const ContactCardAdmin = ({ contact, notes }: Props) => (
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
      <p className="blockquote-footer">
        Owner:
        {contact.owner}
      </p>
    </Card.Body>
    <ListGroup variant="flush">
      {notes && notes.map((note) => <NoteItem key={note.id} note={note} />)}
    </ListGroup>
  </Card>
);

export default ContactCardAdmin;
