import { RolesService } from "src/roles/roles.service";


export const Role = {
  user: '',
  admin: '',
  test: '',
  staff: '',
};

export const getAllRoles = async (rolesService:RolesService)=>{
  const result = await rolesService.find()
  result.forEach((role) => {
    Role[role.name.toLowerCase()] = role._id.toString()
  })
}



