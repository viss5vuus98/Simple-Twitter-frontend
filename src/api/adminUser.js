import axios from 'axios';
const baseUrl = 'https://still-cove-80123.herokuapp.com/api';

export const getAdminUser = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/admin/users`,
      {
        // headers: {
        //   Authorization:
        //     `Bearer ` + `token`,
        // },
      },
    );
     return response.data;
  } catch (error) {
    console.error('[Admin Get All Users failed]: ', error);
  }
};
