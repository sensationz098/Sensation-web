export interface CourseType {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  status: boolean;
  country: string;
  currency: string;
  price: number;
  gst: number;
  recommended: boolean;
  days: string[];
  teacher_name: string[];
}
