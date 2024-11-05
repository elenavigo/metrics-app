import * as yup from 'yup';
import { MetricFormProperties } from '../interfaces/metric';
import { FC, useState } from 'react';

interface Props {
  onSubmit: (properties: MetricFormProperties) => void;
}

const validationSchema = yup.object().shape({
  value: yup.number().required().min(1),
  date: yup.date().required(),
});

const defaultValues = {
  value: 0,
  date: new Date().toISOString().substring(0, 10),
};

export const MetricForm: FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState(defaultValues);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      console.log(error);
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
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="value"
          >
            Value
          </label>
        </div>
        <div className="md:w-2/3">
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
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="date"
          >
            Date
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            type="date"
            className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-300"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            type="submit"
          >
            Add metric
          </button>
        </div>
      </div>
    </form>
  );
};
