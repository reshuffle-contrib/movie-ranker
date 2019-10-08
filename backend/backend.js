 import { get, update, remove, Q, find } from '@reshuffle/db';
 

// @expose
export async function saveUser(newUser) {
  try {
    const users = await get('users')
    let userExist = users ? users.filter((user) => user.email === newUser.email ): [];
    if(userExist.length !== 0){
      throw new Error('User Already Exist')
    }
    return update('users', (oldUsers = []) => {
      const allUsers = [...oldUsers];
      allUsers.push(newUser);
      return allUsers;
    });
  } catch (error) {
    return {success:false , error:error.message};
  }
}

// @expose
export async function login(userLogin) {
  try {
    const users = await get('users')
    let userExist = users.filter((user) => user.email === userLogin.email && user.password === userLogin.password);
    if(userExist){
      return userExist[0]
    }else{
      throw new Error('Login Faild')
    }
  } catch (error) {
    return {success:false , error:error.message};
  }
}