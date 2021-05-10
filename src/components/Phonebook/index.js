import { Component, createRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import {
  fetchContacts,
  addContact,
  removeContact,
  filterContacts,
  addMessage,
  clearMessage,
  setLoadingState,
} from '../../redux/actions';
import {
  getContactsList,
  getContactsFilter,
  getMessage,
  getToken,
} from '../../redux/contacts-selectors';
import { BASE_URL } from '../../API/index';
import PhonebookCard from '../PhonebookCard/PhonebookCardStyled';
import Section from '../Section';
import Form from '../Form';
import ContactsList from '../ContactsList';
import Button from '../Button/ButtonStyled';
import Title from '../Title';
import ErrorNote from '../ErrorNote';
import './phonebook.css';

class Phonebook extends Component {
  state = {
    isMessage: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    const duplicate = this.props.contacts.find(
      contact => contact.name === e.target.elements[0].value,
    );

    if (duplicate) {
      return this.addMessage({
        error: `${duplicate.name} is already in contacts`,
      });
    }

    const name = e.target.elements[0].value;
    const number = e.target.elements[1].value;
    const payload = { name, number };
    this.props.addContact(payload, this.props.token);
  };

  addMessage({ error, success }) {
    this.clearMessage();
    this.props.addMessage({
      error: error || false,
      success: success || false,
    });
  }

  clearMessage() {
    this.setState({ isMessage: true });
    setTimeout(() => {
      this.props.clearMessage();
      this.setState({ isMessage: false });
    }, 3000);
  }

  handleChangeFilter = e => {
    this.props.filterContacts(e.target.value);
  };

  handleRemoveContact = e => {
    const id = e.target.dataset.id;
    this.props.removeContact(id, this.props.token);
  };

  componentDidMount() {
    this.setState({
      isIn: true,
    });
    this.props.setLoadingState(true);
    fetch(`${BASE_URL}contacts`, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${this.props.token}`,
      },
    })
      .then(responce => responce.json())
      .then(data => {
        if (data.message) this.addMessage({ error: data.message });
        else this.props.fetchContacts(data);
      })
      .catch(error => {
        this.addMessage({ error: error.message });
      })
      .finally(() => this.props.setLoadingState(false));
  }

  componentDidUpdate() {
    const { error, success } = this.props.message;
    if (error || success) !this.state.isMessage && this.clearMessage();
  }

  render() {
    const { isMessage } = this.state;
    const { contacts, filter, message } = this.props;
    const search = contacts.length > 1;

    const ref = createRef(null);
    const errorRef = createRef(null);
    const { error, success } = message;
    const messageText = error || success;

    return (
      <>
        <CSSTransition
          in={!!messageText}
          nodeRef={errorRef}
          timeout={500}
          classNames="error"
          unmountOnExit
        >
          <div ref={errorRef} className="error-wrapper">
            <ErrorNote>{messageText}</ErrorNote>
          </div>
        </CSSTransition>
        <PhonebookCard>
          <Section title="Phonebook">
            <Form handleSubmit={this.handleSubmit} />
          </Section>
          <Section title="Contacts">
            <CSSTransition
              in={search}
              nodeRef={ref}
              timeout={750}
              classNames="slide"
              unmountOnExit
            >
              <div ref={ref}>
                <Title
                  as="h3"
                  title="Find contacts by name"
                  fontSize="16"
                  textAlign="left"
                />
                <Button
                  as="input"
                  type="text"
                  id="filter"
                  onChange={this.handleChangeFilter}
                  value={filter}
                />
              </div>
            </CSSTransition>
            <ContactsList
              contactsList={contacts}
              filter={filter}
              handleRemoveContact={this.handleRemoveContact}
            />
          </Section>
        </PhonebookCard>
      </>
    );
  }
}

const mapStateToProps = ({ contacts, user }) => ({
  contacts: getContactsList(contacts),
  filter: getContactsFilter(contacts),
  message: getMessage(contacts),
  token: getToken(user),
});

export default connect(mapStateToProps, {
  fetchContacts,
  addContact,
  removeContact,
  filterContacts,
  addMessage,
  clearMessage,
  setLoadingState,
})(Phonebook);
