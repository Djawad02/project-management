import React from "react";
import { Button } from "@chakra-ui/react";
import InputFields from "../../components/InputFields";
import { Deadline } from "../../interfaces/Deadline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DeadlineFormProps {
  deadline: Deadline;
  onChange: (deadline: Deadline) => void;
  onSave: () => void;
}

const DeadlineForm = ({ deadline, onChange, onSave }: DeadlineFormProps) => {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      onChange({ ...deadline, deadlineDate: date.toISOString().split("T")[0] });
    }
  };

  return (
    <>
      <InputFields
        fields={[
          {
            id: "deadline-date",
            label: "Deadline Date",
            placeholder: "Select deadline date",
            value: deadline.deadlineDate,
            onChange: () => {}, // No-op for DatePicker
            component: (
              <DatePicker
                selected={
                  deadline.deadlineDate ? new Date(deadline.deadlineDate) : null
                }
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
                className="chakra-input" // Chakra UI styling
              />
            ),
          },
          {
            id: "deadline-description",
            label: "Description",
            placeholder: "Enter description",
            value: deadline.description,
            onChange: (e) =>
              onChange({ ...deadline, description: e.target.value }),
          },
        ]}
      />
      <Button mt={2} colorScheme="green" onClick={onSave}>
        Save Deadline
      </Button>
    </>
  );
};

export default DeadlineForm;
