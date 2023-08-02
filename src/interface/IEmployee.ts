export interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  salary: number;
  departmentId: number | null;
  jobTitleId: number | null;
}

export interface DepartmentData {
  id: number;
  name: string;
}

export interface JobTitleData {
  id: number;
  title: string;
}

export interface EmployeeFormProps {
  employees: EmployeeData;
  departments: DepartmentData[];
  jobTitles: JobTitleData[];
  onSubmit: (formData: EmployeeData) => void;
}
export interface Employee {
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
