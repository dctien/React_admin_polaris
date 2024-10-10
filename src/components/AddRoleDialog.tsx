import { FormLayout, Modal, TextField, Button } from '@shopify/polaris';
import { DeleteIcon, PlusIcon } from '@shopify/polaris-icons';
import { useEffect, useState } from 'react';
import { IRole } from '../utils/type';

interface IProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  infoProduct: IRole[];
  setInfoProduct: React.Dispatch<React.SetStateAction<IRole[]>>;
}

export const AddRoleDialog = (props: IProps) => {
  const { active, setActive, infoProduct, setInfoProduct } = props;
  const [formSections, setFormSections] = useState<number[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleClose = () => {
    setActive(false);
  };

  const handleAddSection = () => {
    setFormSections((prevSections) => [
      ...prevSections,
      prevSections.length + 1,
    ]);
    setInfoProduct((prevProducts) => [
      ...prevProducts,
      {
        title: '',
        start_date: '',
        end_date: '',
        buy_from: 0,
        buy_to: 0,
        discount: 0,
      },
    ]);
  };

  const validateFields = (): boolean => {
    let newErrors: { [key: string]: string } = {};
    formSections.forEach((_, index) => {
      if (!infoProduct[index]?.title) {
        newErrors[`title_${index}`] = 'Title campaign cannot be empty.';
      }
      if (!infoProduct[index]?.start_date) {
        newErrors[`start_date_${index}`] = 'Start date cannot be empty.';
      }
      if (!infoProduct[index]?.end_date) {
        newErrors[`end_date_${index}`] = 'End date cannot be empty.';
      }
      if (
        new Date(infoProduct[index]?.end_date) <=
        new Date(infoProduct[index]?.start_date)
      ) {
        newErrors[`end_date_${index}`] =
          'End date must be greater than start date.';
      }
      if (
        parseFloat(infoProduct[index]?.buy_from.toString()) >=
        parseFloat(infoProduct[index]?.buy_to.toString())
      ) {
        newErrors[`buy_${index}`] =
          'Buy to must be greater than or equal to buy form.';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRemoveSection = (index: number) => {
    setFormSections((prevSections) =>
      prevSections.filter((_, i) => i !== index)
    );
    setInfoProduct((prevProducts) =>
      prevProducts.filter((_, i) => i !== index)
    );
  };

  const handleChange =
    (index: number, field: keyof IRole) => (value: string | number) => {
      setInfoProduct((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = {
          ...updatedProducts[index],
          [field]: value,
        };
        return updatedProducts;
      });
    };

  const handleSubmit = () => {
    if (validateFields()) {
      console.log('Form submit:', infoProduct);
      setActive(false);
      setInfoProduct([]);
    }
  };

  useEffect(() => {
    setFormSections(
      Array.from({ length: infoProduct.length }, (_, index) => index + 1)
    );
  }, [infoProduct.length]);

  return (
    <Modal
      open={active}
      onClose={handleClose}
      title="Add role"
      primaryAction={{
        content: 'Save',
        disabled: false,
        onAction: handleSubmit,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: handleClose,
        },
      ]}
    >
      <Modal.Section>
        <FormLayout>
          {formSections.map((_, index) => (
            <div key={index}>
              <FormLayout.Group condensed>
                <TextField
                  type="text"
                  label="Title campaign"
                  value={infoProduct[index]?.title || ''}
                  onChange={handleChange(index, 'title')}
                  autoComplete="off"
                  error={errors[`title_${index}`]}
                />
                <div className="textField-date">
                  <TextField
                    type="date"
                    label="Start date"
                    value={
                      infoProduct[index]?.start_date
                        ? infoProduct[index].start_date.split('T')[0]
                        : ''
                    }
                    onChange={handleChange(index, 'start_date')}
                    autoComplete="off"
                    error={errors[`start_date_${index}`]}
                  />
                </div>
                <div className="textField-date">
                  <TextField
                    type="date"
                    label="End date"
                    value={
                      infoProduct[index]?.end_date
                        ? infoProduct[index].end_date.split('T')[0]
                        : ''
                    }
                    onChange={handleChange(index, 'end_date')}
                    autoComplete="off"
                    error={errors[`end_date_${index}`]}
                  />
                </div>
              </FormLayout.Group>

              <FormLayout.Group condensed>
                <TextField
                  type="number"
                  label="Buy from"
                  value={infoProduct[index]?.buy_from.toString() || ''}
                  onChange={handleChange(index, 'buy_from')}
                  autoComplete="off"
                />
                <TextField
                  type="number"
                  label="Buy to"
                  value={infoProduct[index]?.buy_to.toString() || ''}
                  onChange={handleChange(index, 'buy_to')}
                  autoComplete="off"
                  error={errors[`buy_${index}`]}
                />
                <TextField
                  type="number"
                  label="Discount per item(%)"
                  value={infoProduct[index]?.discount.toString() || ''}
                  onChange={handleChange(index, 'discount')}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <div className="mt-2">
                <Button
                  onClick={() => handleRemoveSection(index)}
                  icon={DeleteIcon}
                  accessibilityLabel="Remove"
                ></Button>
              </div>
            </div>
          ))}
          <Button onClick={handleAddSection} icon={PlusIcon}>
            Add
          </Button>
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
};
