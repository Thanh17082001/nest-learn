
import { RolesService } from 'src/roles/roles.service';
const Role = {
  User: '662cc9f09247505a13a8809b',
  Admin: '66331368768f1a8fb4449468',
  test: '6633139b768f1a8fb444946c',
  Staff: '663313d66146f93d1a23b6a4',
};

// export async function initializeRoles(rolesService: RolesService){
//   const roles = await rolesService.find();
//   roles.forEach((role) => {
//     Role[role.name] = role._id.toString();
//   });
//   console.log(Role);
// }

export default Role;

