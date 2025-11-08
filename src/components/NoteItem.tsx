'use client';

import { ListGroup } from 'react-bootstrap';
import { Note } from '@/lib/validationSchemas';

const NoteItem = ({ note }: { note: Note }) => (
  <ListGroup.Item>
    <p className="fw-lighter">{note.createdAt ? new Date(note.createdAt).toLocaleDateString('en-US') : ''}</p>
    <p>{note.note}</p>
  </ListGroup.Item>
);

export default NoteItem;
