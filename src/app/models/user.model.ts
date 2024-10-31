export interface UserDetails {
  data: UserDetails;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserDetails[];
  support: {
      url: string;
      text: string;
  };
}