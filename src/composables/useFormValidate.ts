import { useForm } from 'vee-validate';

export const useFormValidate = () => {
  const { validate: veeValidate, values, setTouched } = useForm();

  const prepareValuesKeys = () => {
    return Object.keys(values).reduce(
      (acc: { [key: string]: boolean }, value) => {
        acc[value] = true;
        return acc;
      },
      {}
    );
  };

  const validate = async () => {
    setTouched(prepareValuesKeys());
    return await veeValidate();
  };

  return { validate };
};
