import { RolesService } from "src/roles/roles.service";


const Role = {
  user: '',
  admin: '',
  test: '',
  staff: '',
};

export const getAllRoles = async (rolesService:RolesService)=>{
  const result = await rolesService.find()
  result.forEach((role) => {
    Role[role.name]=role._id.toString()
  })
}


export default Role;

