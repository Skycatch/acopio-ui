import React, { Component } from 'react';
import './CollectionCenterRegistrationForm.css'

export const CollectionCenterRegistrationForm = _ =>  (
  <div className="registration-form__container">
    <h2>Registra un centro de Acopio</h2>
    <div className="input-container">
        <input className="input-text" type="text" name="nombreCentroDeAcopio" placeholder="Nombre del Centro de Acopio"/>
    </div>
    <div className="input-container">
        <input className="input-text" type="text" name="direccionDentroDeAcopio" placeholder="Dirección"/>
    </div>
    <div className="input-container">
        <input className="input-text" type="text" name="estadoDeAcopio" placeholder="Estado"/>
    </div>
    <div className="input-container">
        <input className="input-submit" type="submit" value="Enviar"/>
    </div>
  </div>
)
