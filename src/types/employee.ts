
export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Employee {
    id: number;
    code: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    status: 'Đang làm việc' | 'Đã nghỉ việc';
    skills?: Skill[];
}