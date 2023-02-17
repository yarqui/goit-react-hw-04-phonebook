import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Section from './Section';
import Filter from './Filter';
import { List } from './ContactList/ContactList.styled';

export default class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    try {
      const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

      if (parsedContacts) {
        this.setState({ contacts: parsedContacts });
      }
    } catch (error) {
      console.log('error.name:', error.name);
      console.log('error.message:', error.message);
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  doesContactExist = queue => {
    const { contacts } = this.state;

    return contacts.some(contact => contact.name === queue);
  };

  handleSubmit = ({ id, name, number }) => {
    const alreadyExists = this.doesContactExist(name);

    if (alreadyExists) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, { id, name, number }],
    }));

    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };

  handleFilter = queue => {
    queue ? this.setState({ filter: queue }) : this.setState({ filter: '' });
  };

  showFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );

    return filteredContacts;
  };

  deleteFromContacts = id => {
    this.setState(({ contacts }) => {
      return { contacts: contacts.filter(contact => contact.id !== id) };
    });
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.handleSubmit} />
        </Section>
        <Section title="Contacts">
          <Filter filterQueue={this.handleFilter}></Filter>
          <List>
            <ContactList
              filteredContacts={this.showFilteredContacts()}
              onDeleteContact={this.deleteFromContacts}
            />
          </List>
        </Section>
      </>
    );
  }
}
