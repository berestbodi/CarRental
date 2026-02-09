"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, FormikHelpers, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "izitoast/dist/css/iziToast.min.css";
import css from "./RentForm.module.css";
import Button from "../Button/Button";

const STORAGE_KEY = "rent-form-data";

interface FormValues {
  name: string;
  email: string;
  bookingDates: [Date | null, Date | null];
  comment: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  bookingDates: [null, null],
  comment: "",
};

const FormAutoSaver = () => {
  const { values } = useFormikContext<FormValues>();
  useEffect(() => {
    const isDefault = JSON.stringify(values) === JSON.stringify(initialValues);
    if (!isDefault) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    }
  }, [values]);
  return null;
};

export default function RentForm() {
  const [formData, setFormData] = useState<FormValues>(initialValues);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.bookingDates) {
          parsed.bookingDates = parsed.bookingDates.map((d: string | null) =>
            d ? new Date(d) : null,
          );
        }
        setFormData(parsed);
      } catch {
        setFormData(initialValues);
      }
    }
  }, []);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    const iziToast = (await import("izitoast")).default;
    const [start, end] = values.bookingDates;

    if (!values.name || !values.email || !start || !end) {
      iziToast.error({
        title: "Error",
        message: "Please fill in all required fields and select a date range.",
        position: "topRight",
      });
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
    resetForm({ values: initialValues });
    setFormData(initialValues);

    iziToast.success({
      title: "Success",
      message: "Your booking request for the period has been sent!",
      position: "topRight",
    });
  };

  if (!isMounted) return null;

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Book your car now</h2>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={formData}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className={css.form} noValidate>
            <FormAutoSaver />
            <Field name="name" placeholder="Name*" className={css.input} />
            <Field
              name="email"
              type="email"
              placeholder="Email*"
              className={css.input}
            />

            <div className={css.datePickerWrapper}>
              <DatePicker
                selectsRange={true}
                startDate={values.bookingDates[0]}
                endDate={values.bookingDates[1]}
                onChange={(update: [Date | null, Date | null]) => {
                  setFieldValue("bookingDates", update);
                }}
                isClearable={true}
                placeholderText="Booking date"
                wrapperClassName={css.datePickerFullWidth}
                className={css.input}
                dateFormat="dd/MM/yyyy"
                calendarClassName={css.customCalendar}
                minDate={new Date()}
                onKeyDown={(e) => {
                  if (e.key !== "Backspace" && e.key !== "Delete") {
                    e.preventDefault();
                  }
                }}
                formatWeekDay={(nameOfDay) =>
                  nameOfDay.substring(0, 3).toUpperCase()
                }
              />
            </div>

            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={css.textarea}
            />
            <Button type="submit" className={css.sendBtn}>
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
