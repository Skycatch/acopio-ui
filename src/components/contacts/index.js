import React, {Component} from 'react'
import {TextField, RaisedButton, SelectField, MenuItem} from 'material-ui'
import './styles.css'
import api from '../../api'

import ContactSingle from './ContactSingle'

class ContactContainer extends Component {
  state = {
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

  handleChangeFields = (e) => this.handleChange(e.target.name, e.target.value)

  handleSelectChange = (e, i, value) => this.handleChange('acopioId', value)

  optionalFields () {
    const { name, email, twitter, facebook, telefono } = this.state.fields
    const validate = !!name || !!email || !!twitter || !!facebook || !!telefono
    return validate
  }

  disabledBtn () {
    const { acopioId } = this.state.fields
    const _optionalFields = this.optionalFields()
    const validate = _optionalFields && acopioId
    return validate
  }

  resetFields () {
    this.setState({
      fields: {
        name: '',
        email: '',
        twitter: '',
        facebook: '',
        telefono: '',
        acopioId: ''
      }
    })
  }

  onSave = (e) => {
    e.preventDefault()
    api.saveContacto(this.state.fields)
    this.resetFields()
  }

  render () {
    return (
      <div className='contactWrapper'>
        <ContactSingle
          handleChangeFields={this.handleChangeFields}
          handleSelectChange={this.handleSelectChange}
          state={this.state}
          optionalFields={!this.optionalFields()}
          disabledBtn={!this.disabledBtn()}
          onSave={this.onSave}
        />
      </div>
    )
  }
}

export default ContactContainer
