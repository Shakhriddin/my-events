import React, {FC, useCallback, useEffect, useState} from 'react';
import CalendarEvent from '../components/CalendarEvent';
import {Button, Layout, Modal, Row} from 'antd';
import CalendarForm from '../components/CalendarForm';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {IEvent} from '../models/IEvent';
import {useActions} from '../hooks/useActions';

const CalendarPage: FC = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {loadGuests, createEvent, loadEvents} = useActions();
  const {username} = useTypedSelector(state => state.auth.user);

  const {
    guests,
    error,
    events,
  } = useTypedSelector(state => state.event);

  useEffect(() => {
    loadGuests();
    loadEvents(username);
  }, []);

  const addNewEvent = useCallback(
    (event: IEvent) => {
      setModalVisible(false);
      createEvent(event);
    },
    [],
  );
  const handleModalOpen = useCallback(
    () => setModalVisible(true),
    [],
  );
  const handleModalClose = useCallback(
    () => setModalVisible(false),
    [],
  );

  return (
    <Layout className='calendar'>

      <CalendarEvent events={events} />

      <Row
        className='calendar__row'
        justify='center'
      >
        <Button onClick={handleModalOpen}>
          New Event
        </Button>
      </Row>

      {error && <div className='login__error'>{error}</div>}

      <Modal
        title='New event'
        visible={modalVisible}
        footer={null}
        onCancel={handleModalClose}
      >
        <CalendarForm
          guests={guests}
          submit={addNewEvent}
        />
      </Modal>
    </Layout>
  );
};

export default CalendarPage;
