"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, FormikHelpers, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "izitoast/dist/css/iziToast.min.css";
import css from "./RentForm.module.css";

const STORAGE_KEY = "rent-form-data";

interface FormValues {
  name: string;
  email: string;
  bookingDate: Date | null;
  comment: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  bookingDate: null,
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

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.bookingDate)
          parsed.bookingDate = new Date(parsed.bookingDate);
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
    localStorage.removeItem(STORAGE_KEY);

    const iziToast = (await import("izitoast")).default;

    resetForm({ values: initialValues });
    setFormData(initialValues);

    iziToast.success({
      title: "Success",
      message: "Your booking request has been sent!",
      position: "topRight",
      backgroundColor: "#ffffff",
      titleColor: "#101828",
      messageColor: "#8d929a",
      iconColor: "#3470ff",
      progressBarColor: "#3470ff",
    });
  };

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
          <Form className={css.form}>
            <FormAutoSaver />
            <Field
              name="name"
              placeholder="Name*"
              className={css.input}
              required
            />
            <Field
              name="email"
              type="email"
              placeholder="Email*"
              className={css.input}
              required
            />

            <div className={css.datePickerWrapper}>
              <DatePicker
                selected={values.bookingDate}
                onChange={(date: Date | null) =>
                  setFieldValue("bookingDate", date)
                }
                placeholderText="Booking date"
                wrapperClassName={css.datePickerFullWidth}
                className={css.input}
                dateFormat="dd/MM/yyyy"
                calendarClassName={css.customCalendar}
                minDate={new Date()}
                onKeyDown={(e) => e.preventDefault()}
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
            <button type="submit" className={css.sendBtn}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
