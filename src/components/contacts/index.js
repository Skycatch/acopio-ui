import React, {Component} from 'react'
import './styles.css'
import api from '../../api'

import ContactSingle from './ContactSingle'

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

  disabledBtn () {
    const { acopioId } = this.state.fields
    return this.optionalFields() && acopioId
  }

  resetFields () {
    this.setState({
      fields: this.fieldsBaseState
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
        />
      </div>
    )
  }
}

export default ContactContainer
