export interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  salary: number;
  departmentId: number | null;
  jobTitleId: number | null;
}

export interface IDepartment {
  id: number;
  name: string;
}

export interface IJobTitle {
  id: number;
  title: string;
}

export interface EmployeeFormProps {
  employees: EmployeeData;
  departments: IDepartment[];
  jobTitles: IJobTitle[];
  onSubmit: (formData: EmployeeData) => void;
}
export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  salary: number;
  departmentId: number | null;
  jobTitleId: number | null;
  departmentName: string;
  jobTitleName: string;
}
