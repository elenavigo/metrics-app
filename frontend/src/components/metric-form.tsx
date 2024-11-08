import * as yup from 'yup';
import { MetricFormProperties } from '../interfaces/metric';
import { FC, useState } from 'react';

interface Props {
  onSubmit: (properties: MetricFormProperties) => void;
}

const validationSchema = yup.object().shape({
  value: yup.number().required().min(1),
  date: yup.number().required().typeError('Date must be a valid timestamp'),
});

const defaultValues = {
  value: 0,
  date: new Date().getTime(),
};

const formatDateTimeLocal = (timestamp: number) => {
  const date = new Date(timestamp);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().substring(0, 16);
};

export const MetricForm: FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState(defaultValues);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'date' ? new Date(value).getTime() : Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      setFormData(defaultValues);
      onSubmit({ ...formData, date: new Date(formData.date) });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h2 className="text-md font-bold mb-4">Add a value here:</h2>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label
            className="block text-gray-500 md:text-left mb-1 md:mb-0 pr-4"
            htmlFor="value"
          >
            Value
          </label>
        </div>
        <div className="md:w-3/4">
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-300"
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
          />
          {errors.value && (
            <p className="text-red-600 text-sm">{errors.value}</p>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label
            className="block text-gray-500 md:text-left mb-1 md:mb-0 pr-4"
            htmlFor="date"
          >
            Date & Time
          </label>
        </div>
        <div className="md:w-3/4">
          <input
            type="datetime-local"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-300"
            name="date"
            value={formatDateTimeLocal(formData.date)}
            onChange={handleChange}
          />
          {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
        </div>
      </div>
      <div className="md:flex md:items-center">
        <button
          className="ms-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          type="submit"
        >
          Add metric
        </button>
      </div>
    </form>
  );
};
