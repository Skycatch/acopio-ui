import React, {Component} from 'react'
import api from '../../api'
import DocumentTitle from 'react-document-title'
import validateEmail from '../../utils/validateEmail'

import ContactSingle from './ContactSingle'
import './styles.css'

class ContactContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fields: {
        name: '',
        email: '',
        twitter: '',
        facebook: '',
        telefono: '',
        acopioId: ''
      },
      acopios: []
    }
    this.fieldsBaseState = this.state.fields
  }

  componentWillMount () {
    api.getAcopios()
      .then(response => this.setState({acopios: response.data}))
  }

  handleChange (section, value) {
    this.setState({
      fields: {
        ...this.state.fields,
        [section]: value
      }
    })
  }

  optionalFields () {
    const { name, email, twitter, facebook, telefono } = this.state.fields
    return !!name || !!email || !!twitter || !!facebook || !!telefono
  }

  isEmail () {
    const {email} = this.state.fields
    return !email
      ? true
      : validateEmail(email) ? true : false
  }

  disabledBtn () {
    const { acopioId } = this.state.fields
    return this.optionalFields() && acopioId && this.isEmail()
  }

  resetFields () {
    this.setState({
      fields: this.fieldsBaseState
    })
  }

  onSave = (e) => {
    e.preventDefault()
    api.saveContacto(
      this.state.fields
    ).then(res =>
      this.resetFields()
    )
  }

  render () {
    const title = `Contactos · ${process.env.REACT_APP_NAME}`
    return (
      <DocumentTitle title={title}>
        <div className='contactWrapper'>
          <ContactSingle
            handleChangeFields={(e) =>
              this.handleChange(e.target.name, e.target.value)
            }
            handleSelectChange={(e, i, value) =>
              this.handleChange('acopioId', value)
            }
            state={this.state}
            optionalFields={!this.optionalFields()}
            disabledBtn={!this.disabledBtn()}
            onSave={this.onSave}
            emailErrorTxt={
              this.isEmail() ? '' : '*Formato de email invalido'
            }
          />
        </div>
      </DocumentTitle>
    )
  }
}

export default ContactContainer
