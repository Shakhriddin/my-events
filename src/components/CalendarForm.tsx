import React, {ChangeEvent, FC, useState} from 'react';
import {Button, Form, Input, Row, Select} from 'antd';
import {rules} from '../utils/rules';
import {DatePicker} from 'antd/es';
import {IUser} from '../models/IUser';
import {IEvent} from '../models/IEvent';
import {Moment} from 'moment/moment';
import {formatDate} from '../utils/date';
import {useTypedSelector} from '../hooks/useTypedSelector';

interface CalendarFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const CalendarForm: FC<CalendarFormProps> = ({guests, submit}): JSX.Element => {
  const [event, setEvent] = useState<IEvent>({
    author: '',
    date: '',
    guest: '',
    description: '',
  } as IEvent);

  const {username} = useTypedSelector(state => state.auth.user);

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({
        ...event,
        date: formatDate(date?.toDate()),
      });
    }
  };

  const handleSubmit = () => {
    submit({...event, author: username});
  };

  return (
    <Form
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      autoComplete='off'
      onFinish={handleSubmit}
    >
      <Form.Item
        label='Event date'
        name='date'
        rules={[rules.required(), rules.isDateAfter('You cannot add events in the past')]}
      >
        <DatePicker
          onChange={(date) => selectDate(date)}
        />
      </Form.Item>

      <Form.Item
        label='Description'
        name='description'
        rules={[rules.required()]}
      >
        <Input
          value={event.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEvent({
            ...event,
            description: e.target.value,
          })}
        />
      </Form.Item>

      <Form.Item
        label='Guest'
        name='guest'
        rules={[rules.required()]}
      >
        <Select
          onChange={(guest: string) => setEvent({...event, guest})}
        >
          {
            guests.map(({username}) => (
              <Select.Option
                key={username}
                value={username}
              >
                {username}
              </Select.Option>
            ))
          }
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Row justify='end'>
          <Button
            type='primary'
            htmlType='submit'
          >
            Add
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default CalendarForm;
