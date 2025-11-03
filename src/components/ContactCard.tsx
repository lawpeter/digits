'use client';

import { Card, Image } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';

interface Props {
  contact: Contact;
}

const ContactCard = ({ contact }: Props) => (
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
  </Card>
);

export default ContactCard;
