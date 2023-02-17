import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Form, InputLabel, InputField, AddButton } from './ContactForm.styled';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = useRef(null);
  const numberInputId = useRef(null);

  useEffect(() => {
    nameInputId.current = nanoid();
    numberInputId.current = nanoid();
  }, []);

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const id = nanoid();

    onSubmit({ id, name, number });

    resetForm();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputLabel htmlFor={nameInputId.current}>Name</InputLabel>
      <InputField
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        id={nameInputId.current}
        placeholder="Contact name"
        required
        autoComplete="off"
        onChange={handleChange}
        value={name}
      />

      <InputLabel htmlFor={numberInputId.current}>Number</InputLabel>
      <InputField
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        id={numberInputId.current}
        placeholder="Phone number"
        required
        autoComplete="off"
        onChange={handleChange}
        value={number}
      />
      <AddButton type="submit">Add contact</AddButton>
    </Form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
