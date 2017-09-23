import React, { Component } from 'react';
import './CollectionCenterRegistrationForm.css'

export const CollectionCenterRegistrationForm = _ =>  (
    <form action="">        
        <div className="registration-form__container">
            <h2>Registra un centro de Acopio</h2>
            <div className="input-container">
                <input className="input-text" type="text" name="nombreCentroDeAcopio" placeholder="Nombre del Centro de Acopio"/>
            </div>
            <div className="input-container">
                <input className="input-text" type="text" name="direccionDentroDeAcopio" placeholder="Dirección"/>
            </div>
            <div className="input-container">
                <p className="input-radio-group-title">Estado del Centro:</p>
                <label className="input-label" for="center-is-active">
                    Activo
                    <input className="input-radio" id="center-is-active" name="estadoDeAcopio" type="radio" value="true" checked="true"/>
                </label>
                <label className="input-label" for="center-is-not-active">
                    Inactivo
                    <input className="input-radio" id="center-is-not-active" name="estadoDeAcopio" type="radio" value="false"/>
                </label>
            </div>
            <div className="input-container">
                <input className="input-submit" type="submit" value="Enviar"/>
            </div>
        </div>
    </form>
)
