import React, { useState } from "react";
import TrainingTable from "./TrainingTable";
import { v4 as uuidv4 } from 'uuid';

export default function Feedback() {
  const clearForm = { date: "", passed: "", edit: false };
  const [form, setForm] = useState(clearForm);
  const [training, setTraining] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (form.date === "" || form.passed === "") {
      return;
    }
    const formatDate = form.date.split(".");
    const date = new Date(formatDate[2], formatDate[1] -1, formatDate[0]);

    const record = training.findIndex(
      (item) => item.date.getTime() === date.getTime()
    );
    if (record !== -1) {
      if (form.edit) {
        training[record].passed = Number(form.passed);
      } else {
        training[record].passed += Number(form.passed);
      }
    } else {
      setTraining((prev) => [
        ...prev,
        { id: uuidv4(), date, passed: Number(form.passed) },
      ]);
    }
    setForm(clearForm);
  };

  const handleChange = ({ target }) => {
    setForm((prevForm) => ({ ...prevForm, [target.name]: target.value }));
  };

  const handleDelete = (id) => {
    return () => {
        setTraining(training.filter((item) => item.id !== id));
    }
  }

  const handleEdit = (id) => {
    return () => {
      const record = training.find((item) => item.id === id);
      setForm({ date: record.date.toLocaleDateString(), passed: record.passed, edit: true });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="Feedback">
        <div className="date">
          <label htmlFor="date">Дата(ДД.ММ.ГГ)</label>
          <input
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>
        <div className="passed">
          <label htmlFor="passed">Пройдено км</label>
          <input
            id="passed"
            name="passed"
            value={form.passed}
            onChange={handleChange}
          />
        </div>
        <button className="btn" type="submit">
          Ок
        </button>
      </form>
      <TrainingTable training={training} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}
