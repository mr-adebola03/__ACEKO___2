import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { Modal, Button, Badge, Form } from 'react-bootstrap';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const localizer = momentLocalizer(moment);

const DoctorCalendar = () => {
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [events, setEvents] = useState([]);
        const [loading, setLoading] = useState(true);
        const [showModal, setShowModal] = useState(false);
        const [showAddModal, setShowAddModal] = useState(false);
        const [selectedEvent, setSelectedEvent] = useState(null);
        const [patients, setPatients] = useState([]);
  const [newRendezVous, setNewRendezVous] = useState({
    patient: '',
    date: new Date(),
    heure: '10:00',
    motif: '',
    statut: 'PLANIFIE'
  });

  const formatEvents = (appointments) => {
    return appointments.map(rdv => ({
      id: rdv.id,
      title: `RDV - ${rdv.patient_nom_complet || 'Sans nom'}`,
      start: new Date(rdv.date_rdv),
      end: moment(rdv.date_rdv).add(rdv.duree || 30, 'minutes').toDate(),
      status: rdv.statut,
      rapport: rdv.rapport,
      patient: rdv.patient_nom_complet,
      motif: rdv.motif,
      patient_id: rdv.patient
    }));
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        
        const rdvResponse = await axios.get('https://aceko.onrender.com/doc-patient/rendezvous/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const patientsResponse = await axios.get('https://aceko.onrender.com/doc-patient/patients/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const formattedEvents = formatEvents(rdvResponse.data.results || rdvResponse.data);
        setEvents(formattedEvents);
        setPatients(patientsResponse.data.results || patientsResponse.data);
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddRendezVous = async () => {
        try {
          const token = localStorage.getItem('access_token');
          const [hours, minutes] = newRendezVous.heure.split(':');
          const dateWithTime = new Date(newRendezVous.date);
          dateWithTime.setHours(hours);
          dateWithTime.setMinutes(minutes);
      
          const payload = {
            dossier: newRendezVous.patient,
            date_rdv: dateWithTime.toISOString(),
            motif: newRendezVous.motif,
            statut: newRendezVous.statut,
            duree: 30
          };
      
          const response = await axios.post(
            'https://aceko.onrender.com/doc-patient/rendezvous/',
            payload,
            {
              headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
      
          const newEvent = formatEvents([response.data])[0];
          setEvents([...events, newEvent]);
          
          setShowAddModal(false);
          setNewRendezVous({
            patient: '',
            date: new Date(),
            heure: '10:00',
            motif: '',
            statut: 'PLANIFIE'
          });
      
        } catch (error) {
          console.error("Erreur d'ajout:", error.response?.data || error.message);
          alert("Erreur lors de la création du rendez-vous: " + 
            (error.response?.data?.detail || error.message));
        } finally {
                setIsSubmitting(false);
        }
      };

  const eventStyleGetter = (event) => {
    const backgroundColor = {
      'PLANIFIE': '#3b82f6',
      'CONFIRME': '#10b981',
      'ANNULE': '#ef4444',
      'TERMINE': '#6b7280'
    }[event.status] || '#8b5cf6';

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        color: 'white',
        border: '0px'
      }
    };
  };

  if (loading) {
    return <div className="text-center p-4">Chargement du calendrier...</div>;
  }

  return (
    <div style={{ height: '700px', padding: '20px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          <FaCalendarAlt className="me-2" />
          Calendrier des Rendez-vous
        </h2>
        <Button 
          variant="primary" 
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus className="me-2" />
          Ajouter RDV
        </Button>
      </div>

      {Array.isArray(events) ? (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100% - 50px)' }}
          defaultView="month"
          views={['month', 'week', 'day', 'agenda']}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={event => {
            setSelectedEvent(event);
            setShowModal(true);
          }}
          messages={{
            today: "Aujourd'hui",
            previous: "Précédent",
            next: "Suivant",
            month: "Mois",
            week: "Semaine",
            day: "Jour",
            agenda: "Agenda"
          }}
          selectable
          onSelectSlot={(slotInfo) => {
            setNewRendezVous({
              ...newRendezVous,
              date: slotInfo.start
            });
            setShowAddModal(true);
          }}
        />
      ) : (
        <div className="alert alert-danger">
          Erreur: Les données des événements ne sont pas valides
        </div>
      )}

      {selectedEvent && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Détails du RDV</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Patient:</strong> {selectedEvent.patient}</p>
            <p><strong>Date:</strong> {moment(selectedEvent.start).format('LLL')}</p>
            <p><strong>Fin:</strong> {moment(selectedEvent.end).format('LT')}</p>
            <p>
              <strong>Statut:</strong> {' '}
              <Badge bg={
                selectedEvent.status === 'CONFIRME' ? 'success' :
                selectedEvent.status === 'ANNULE' ? 'danger' :
                selectedEvent.status === 'TERMINE' ? 'secondary' : 'primary'
              }>
                {selectedEvent.status}
              </Badge>
            </p>
            <p><strong>Motif:</strong> {selectedEvent.motif || 'Non spécifié'}</p>
            <p><strong>Notes:</strong> {selectedEvent.rapport || 'Aucune note'}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Fermer
            </Button>
            <Button variant="danger" onClick={() => {
              setSelectedEvent({...selectedEvent, status: 'ANNULE'});
            }}>
              Annuler RDV
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nouveau Rendez-vous</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Patient</Form.Label>
              <Form.Select
                value={newRendezVous.patient}
                onChange={(e) => setNewRendezVous({...newRendezVous, patient: e.target.value})}
              >
                <option value="">Sélectionnez un patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.last_name} {patient.first_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Label>Date</Form.Label>
                <DatePicker
                  selected={newRendezVous.date}
                  onChange={(date) => setNewRendezVous({...newRendezVous, date})}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Heure</Form.Label>
                <Form.Control
                  type="time"
                  value={newRendezVous.heure}
                  onChange={(e) => setNewRendezVous({...newRendezVous, heure: e.target.value})}
                />
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Motif</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newRendezVous.motif}
                onChange={(e) => setNewRendezVous({...newRendezVous, motif: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Statut</Form.Label>
              <Form.Select
                value={newRendezVous.statut}
                onChange={(e) => setNewRendezVous({...newRendezVous, statut: e.target.value})}
              >
                <option value="PLANIFIE">Planifié</option>
                <option value="CONFIRME">Confirmé</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Annuler
          </Button>
          <Button 
                variant="primary" 
                onClick={handleAddRendezVous}
                disabled={isSubmitting}
                >
                {isSubmitting ? 'Création en cours...' : 'Créer le RDV'}
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorCalendar;