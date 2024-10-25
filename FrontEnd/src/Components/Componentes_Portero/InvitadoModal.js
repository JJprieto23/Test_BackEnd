import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'; // Asegúrate de que Modal esté correctamente importado
import axios from 'axios';

const InvitadoModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    numDocumento: '',
    correo: '',
    idParqueaderoFk: '',
    placaVehiculo: '',
    tiempoParqueadero: '',
    idApartamentoFK: '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/insertinvitados', formData);
      if (response.status === 201) {
        setStatus('Invitado registrado correctamente');
        setFormData({
          nombre: '',
          apellido: '',
          telefono: '',
          numDocumento: '',
          correo: '',
          idParqueaderoFk: '',
          placaVehiculo: '',
          tiempoParqueadero: '',
          idApartamentoFK: '',
        });
        onSuccess(); // Llama a la función para recargar los invitados
        onClose(); // Cierra el modal
      }
    } catch (error) {
      console.error('Error al registrar el invitado:', error);
      setStatus('Error al registrar el invitado');
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nuevo Invitado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {status && <div className="alert alert-info">{status}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              name="apellido"
              className="form-control"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Número de Documento</label>
            <input
              type="text"
              name="numDocumento"
              className="form-control"
              value={formData.numDocumento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">ID Parqueadero</label>
            <input
              type="text"
              name="idParqueaderoFk"
              className="form-control"
              value={formData.idParqueaderoFk}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Placa Vehículo</label>
            <input
              type="text"
              name="placaVehiculo"
              className="form-control"
              value={formData.placaVehiculo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tiempo Parqueadero</label>
            <input
              type="text"
              name="tiempoParqueadero"
              className="form-control"
              value={formData.tiempoParqueadero}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">ID Apartamento</label>
            <input
              type="text"
              name="idApartamentoFK"
              className="form-control"
              value={formData.idApartamentoFK}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Registrar Invitado</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancelar</button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default InvitadoModal;
