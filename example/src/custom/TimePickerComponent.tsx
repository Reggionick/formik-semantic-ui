import React, { Component, CSSProperties } from "react";
import { Form } from "semantic-ui-react";
import { Field, FieldProps } from "formik";
import moment from "moment";
import TimePicker from "rc-time-picker";

import "rc-time-picker/assets/index.css";

let fieldCounter = 0;

interface TimePickerProps {
  name: string;
  label: string;
  inputProps?: {
    prefixCls?: string;
    clearText?: string;
    disabled?: boolean;
    allowEmpty?: boolean;
    open?: boolean;
    defaultValue?: moment.Moment;
    defaultOpenValue?: moment.Moment;
    value?: moment.Moment;
    placeholder?: string;
    className?: string;
    id?: string;
    popupClassName?: string;
    showHour?: boolean;
    showMinute?: boolean;
    showSecond?: boolean;
    format?: string;
    disabledHours?: () => number[];
    disabledMinutes?: (hour?: number) => number[];
    disabledSeconds?: (hour?: number, minute?: number) => number[];
    use12Hours?: boolean;
    hideDisabledOptions?: boolean;
    onChange?: (value?: moment.Moment) => void;
    addon?: (timepicker?: TimePicker) => JSX.Element;
    placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
    transitionName?: string;
    onOpen?: (state?: { open?: boolean }) => void;
    onClose?: (state?: { open?: boolean }) => void;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    focusOnOpen?: boolean;
    inputReadOnly?: boolean;
    inputIcon?: React.ReactNode;
    clearIcon?: React.ReactNode;
    style?: CSSProperties;
  };
  fieldProps?: any;
}
export class TimePickerComponent extends Component<TimePickerProps> {
  state = {
    focused: false
  };

  id: string = null;

  constructor(props: any) {
    super(props);
    this.id = props.id || `field_timepicker_alt_${fieldCounter++}`;
  }

  render() {
    const { name, label, inputProps = {}, fieldProps = {} } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }: FieldProps) => {
          const error = form.touched[name] && form.errors[name];
          return (
            <Form.Field error={!!error} {...fieldProps}>
              {!!label && <label htmlFor={this.id}>{label}</label>}
              <TimePicker
                style={{ width: 100 }}
                defaultValue={moment()}
                {...inputProps}
                onChange={time => {
                  form.setFieldValue(name, time, true);
                }}
              />
              {form.errors[name] && form.touched[name] && (
                <span
                  style={{
                    display: "block",
                    margin: ".28571429rem 0",
                    color: "rgb(159, 58, 56)",
                    fontSize: ".92857143em"
                  }}
                >
                  {form.errors[name]}
                </span>
              )}
            </Form.Field>
          );
        }}
      />
    );
  }
}
