export interface UpdateStaffType {
  name: string;
  phone: string;
  active: boolean;
  roles: [{ id: number; name: string }];
  loginId: string;
}
